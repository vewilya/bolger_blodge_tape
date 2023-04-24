import {el} from '@elemaudio/core';

export function saturate(x, drive){
    let sat = el.select(el.le(x, 0), el.tanh(el.mul(drive, x)), el.sin(el.mul(drive, x)));
    let gainComp = el.div(el.add(1, el.mul(drive, .1)), drive);
    
    return el.mul(gainComp, sat)
}

export function cubic (x, drive) {
    let inputGain = el.mul(drive, x);
    let cubic = el.sub(x, el.mul(1/3, el.pow((inputGain), 3)));
    return cubic
}

export function cubic2 (x, drive) {
    let cubic = el.sub(x, el.mul(1/3, el.pow(el.mul(drive, x), 5)));
    let sec = el.pow(el.mul(2, x), 3);

    let add = el.add(cubic, sec);
    let out = el. sub(add, x);

    return out
}