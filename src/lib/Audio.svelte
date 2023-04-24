<script>
    import {el} from '@elemaudio/core';
    import WebRenderer from '@elemaudio/web-renderer';
    import SfmS from '../assets/audio/SfmS.wav'
    import  { saturate, cubic, cubic2 } from '../dsp/saturation.js'
    import { noise, crackleNoise } from '../dsp/tapeNoise.js'
    import { isStartingCTX, isEffectOn, isPlaying, pluginParams, file, data, wobbleData, noiseData, windowWidth } from '../store.js'
    import { get } from 'svelte/store'
    import FrontPanel from './FrontPanel.svelte'
    import Waveform from './Waveform.svelte';

    const ctx = new AudioContext();
    const core = new WebRenderer();
    const sampleRate = ctx.sampleRate;

    const DRAWING_SPEED  = 10;

    $: if($isStartingCTX) {
            startAudio();
            console.log('starting the audio context');
        }

    let regularTapeSpeed = 1.0;

    const startAudio = async () => {
        if (ctx.state === "suspended") {
            await ctx.resume(); 
        }
    }

    const toggleTrack = () => {
        get(isPlaying) == 1 ? isPlaying.set(1) : isPlaying.set(0);;
        process();
    }

    let train = Math.random();
    let input = Math.random();

    const toggleFX = () => {
        get(isEffectOn) == 1 ? isEffectOn.set(1) : isEffectOn.set(0); 

        train = Math.random();
        input = Math.random();
        
        process();
    }



    const process = () => {
        let play = el.const({ key: 'play', value: $isPlaying ? 1.0 : 0.0 });
        let fx = el.const({ key: 'fx', value: $isEffectOn ? 1.0 : 0.0 });
        let tapeSpeed = el.const({ key:'tapeSpeed', value: regularTapeSpeed });

        let noiser = el.const({ key: 'noise', value: $pluginParams.noise });
        let wobbler = el.const( {key: 'wobble', value: $pluginParams.tapeWobble * 0.03 });
        let playingSpeed = el.add(tapeSpeed, el.mul(wobbler, fx, el.latch(el.train(.4), el.noise()), el.square(.1), el.cycle(.31), el.cycle(.012)));
        let saturation = el.const( { key: 'saturation', value: 1 + $pluginParams.saturation * 5});
    
        let trackL = el.sample({path: 'SfmS.wav:0', mode: 'loop'}, play, el.snapshot({name: "wd"}, el.train(DRAWING_SPEED), playingSpeed) );
        let trackR = el.sample({path: 'SfmS.wav:1', mode: 'loop'}, play, playingSpeed );

        let satL = $isEffectOn ? saturate(trackL, saturation) : trackL;
        let satR = $isEffectOn ? saturate(trackR, saturation) : trackR;

        let [crackleL, crackleR ] = crackleNoise(train, input);

        let noiseL = el.add(el.mul(noise, fx, noiser), el.mul( el.mul(el.add(crackleL, crackleR), 0.5), fx, noiser));
        let noiseR = el.snapshot({name: "nd"}, el.train(DRAWING_SPEED), el.add(el.mul(noise, fx, noiser), el.mul( el.mul(el.add(crackleL, crackleR), 0.5), fx, noiser)));

        let [ leftOut, rightOut ] = [ el.add(satL, cubic(noiseL, 1.0)),  el.add(satR, cubic(noiseR, 1.0)) ];

        leftOut = el.mul(leftOut, .6);
        rightOut = el.mul(rightOut, .6);

        core.render(el.snapshot({name: "ss"}, el.train(DRAWING_SPEED), leftOut), rightOut);
    }

    core.on('snapshot', function(e) {
        if ($isStartingCTX){

            if (e.source == "ss"){
                $data.push(e.data);
                $data.length > $windowWidth ? $data.splice(0, 1) : "";
            }
    
            if(e.source == "wd"){
                let calc = ((e.data - 1) * 100);
                $wobbleData.push(calc);
                $wobbleData.length > $windowWidth ? $wobbleData.splice(0, 1) : "";
            }

            if(e.source == "nd"){
                let calc = (e.data * 100);
                $noiseData.push(calc);
                $noiseData.length > $windowWidth ? $noiseData.splice(0, 1) : "";
            }
        }
    });


    core.on('load', function() {
        process();        
    });

    (async function main() {
        let res = await fetch(SfmS);
        let sampleBuffer = await ctx.decodeAudioData(await res.arrayBuffer());
        
        $file.length = await(sampleBuffer.length);

        let node = await core.initialize(ctx, {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [2],
            processorOptions: {
                virtualFileSystem: {
                    "SfmS.wav:0": sampleBuffer.getChannelData(0),
                    "SfmS.wav:1": sampleBuffer.getChannelData(1),
                }
            }
    });

    node.connect(ctx.destination);
    })();

</script>


<FrontPanel on:fx={toggleFX} on:start={toggleTrack} on:noise={process} on:saturate={process} on:wobble={process}/>


<style>

</style>