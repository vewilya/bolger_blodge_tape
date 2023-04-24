import {el} from '@elemaudio/core';

const generateRandomTrain = () => {
   return Math.round(125 * Math.random())
};

let t1 = el.train(el.accum(.00001, el.train(generateRandomTrain())));
let t2 = el.train(el.accum(.0001, el.train(generateRandomTrain())));

let t3 = el.mul(t1, t2);

let adsr = el.adsr(.0001, .0001*Math.random(), .0, .0, t3)
const BUZZER = Math.random() * 10 + 25;
const BUZZ_FREQ = Math.random() * 20 + 17; 

function noiseFloor(){
   const FREQ = .1;
   const AMP = 0.009;
   const BASE = .067;
   
   const noises = [];
   const buzzers = [];

   for (let i = 0; i < 7; i++) {
      noises[i] = el.mul( el.add(BASE, el.mul(AMP, el.cycle(FREQ))), el.bandpass(el.sub(1000, el.mul(100, el.cycle(.01))), .3, el.noise()));
      buzzers[i] = el.sin(el.tanh(el.mul(el.sub(.6, el.mul(.3, el.cycle(.05))), BUZZER, el.triangle(BUZZ_FREQ))));
   }

   let noisePack = el.add(...noises);
   let buzzPack = el.add(...buzzers);

   const out = el.add( el.mul( .003, buzzPack), el.mul(.012, noisePack));
   

   return out
}

let combNoise =  el.add(noiseFloor(), el.mul(adsr, 1.0, el.highpass( 15000, 1.2, el.noise())));

export const noise  = el.tanh(combNoise);

//////// ---------- \\\\\\\\\\

const TRIGGERS = [Math.random() * .2, Math.random() * .2];
const MIN_FREQ = 10000;
const MAX_FREQ = 10000 + 10000 * Math.random();

const CUTOFF = 1000 + 1000 * Math.random() + 100;
const T1 = Math.random() * 100;

export function crackleNoise(tempo, input) {
   let newVal = el.latch(el.train(.1), el.noise());

   let NT = el.const({ key: 'nt', value: tempo * input * 10 * Math.random() });

   let noiseAmount = el.mul(1, el.latch( el.train(T1), el.abs(el.noise())) );
   let noiseSignal = el.mul(el.cycle(el.cycle(newVal)),  el.latch( el.train(10), el.noise()) );

   let env = el.adsr(el.tau2pole(.1), el.tau2pole(.1), .0, .0, el.train(NT));
   let crackle = el.mul(0.7, env, el.allpass( el.add(MIN_FREQ, el.mul(MAX_FREQ-MIN_FREQ, el.latch(el.train(NT), el.abs(el.noise())))), noiseAmount, noiseSignal));

   let filtered = el.highpass( el.add(CUTOFF, el.latch(el.train(NT), 2)), 1.6, crackle);

   let cycles = [el.cycle(.005), el.cycle(.005)];

   let left = el.mul(el.train(TRIGGERS[0]), cycles[0], filtered);
   let right = el.mul(el.train(TRIGGERS[1]), cycles[1], filtered);

   return [left, right]
}

