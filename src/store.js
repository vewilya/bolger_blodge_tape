import { writable } from 'svelte/store'

export const isIntro = writable(true);

export const isStartingCTX = writable(false);
export const isPlaying = writable(0);
export const isEffectOn = writable(0); 

export const pluginParams = writable({
    saturation : 0.0,
    filter: 0.0,
    tapeWobble: .0,
    noise: 0.0
})

export const file = writable({
    length: 1.0,
})

export const normalRate = writable(0.000000472411187);

export const currentParam = writable(0);

export const data = writable([]);
export const wobbleData = writable([]);
export const noiseData = writable([]);

export const windowWidth = writable(1000);