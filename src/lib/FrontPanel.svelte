<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import Button from './Button.svelte'
    import TapeMachine from './TapeMachine.svelte'
    import { isEffectOn, isPlaying, pluginParams, currentParam } from '../store.js'

    import AntiqueKnob from './AntiqueKnob.svelte';
    import SVGButton from './SVGButton.svelte';
    
    let trigger = false;

    const turnOn = (event) => {
        if (event.detail == 1)
        {
            $pluginParams.tapeWobble = .2 * Math.random();
            $pluginParams.saturation = .5 * Math.random();
            $pluginParams.noise = .7 * Math.random();
        }
        else 
        {
            $pluginParams.tapeWobble = 0;
            $pluginParams.saturation = 0;
            $pluginParams.noise = 0;
        }

        $isEffectOn = event.detail;
        trigger = event.detail;

        dispatch('fx', event.detail);
        currentParam.set(0);
    }

    const startAudio = (event) => {
        $isPlaying = event.detail;
        dispatch('start', event.detail);
        $isPlaying == 1 ? currentParam.set(0) : "";
        
    }

    const changeSaturation = () => {
        dispatch('saturate', $pluginParams.saturation);
        currentParam.set(0);
    }

    const changeWobble = () => {
        dispatch('wobble', $pluginParams.tapeWobble);
        currentParam.set(1);
    }

    const changeNoise = () => {
        dispatch('noise', $pluginParams.noise);
        currentParam.set(2);
    }

</script>

<div class="case">
    <!-- <h1>{$isEffectOn}</h1>
    <h1>{$isPlaying}</h1> -->
    <div class="buttonContainer">
        <Button onState="ON" offState="OFF" size="55" on:toggle={turnOn}></Button> 
        <SVGButton size=55 on:click={startAudio}></SVGButton>
    </div>
    
    <div class="tapeContainer">
        <TapeMachine trigger={trigger}/>
    </div> 
    <div class="knobContainer">
        <AntiqueKnob param="Saturation" col={ {
            red: "241",
            green: "187",
            blue: "61"
        }
       }
       bind:value={$pluginParams.saturation}  on:change={changeSaturation}/>
        <AntiqueKnob param="Tape Wobble" col={ {
            red: "241",
            green: "187",
            blue: "61"
        }
       }
        bind:value={$pluginParams.tapeWobble} on:change={changeWobble}/>

        <AntiqueKnob param="Noise" col={ {
            red: "241",
            green: "187",
            blue: "61"
        }
       }
        bind:value={$pluginParams.noise} on:change={changeNoise}/>
    </div>
</div>


<style>

    .case {
        position: fixed;
        display: flex;
        width: 80vw;
        height: 60vh;
        max-width: 600px;
        
        background: transparent;
        top: 23.5vh;
        left: 10vw;
        /* margin: 3rem 3rem; */
        border-radius: 25px;
        background-color: rgba(255, 255, 255, 0.074);
        border: 3px solid rgba(255, 255, 255, 0.222);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        border-radius: .7rem;
        z-index: 20;
        
    }

    .case:hover {
        box-shadow: 0px 0px 20px 1px #ffbb763f;
        border: 3px solid rgba(255, 255, 255, 0.454);
    }

    .knobContainer {
        position: absolute;
        bottom: 7%;
        width: 100%;
        height: 25%;
        padding: .5rem .1rem;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content:space-evenly;
        /* background: blue; */
    }

    .tapeContainer {
        position: absolute;
        top: 21%;
        width: 100%;
        height: 40%;
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
        /* background: red; */
    }

    .buttonContainer {
        top: 5px;
        left: 5px;
        width: 100%;
        height: 14%;
        padding: 2vw;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content:space-between;
    }
</style>