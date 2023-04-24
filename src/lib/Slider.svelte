<script>

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let value;
    export let min, max, step;

    

    $: {
        dispatch("input", { value });
        console.log(value);
    }

</script>

<h4>Frequency</h4>
<h5>{Math.pow(20,value*3+1)}</h5>
<input bind:value={value} type="range" min={min} max={max} step={step} class="slider" id="myRange">

<style>
    /* .slidecontainer {
        width: 100%;
    } */

    .slider {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        height: 2vh;
        border-radius: 20px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: 1s;
        transition: opacity 1s;
    }

    .slider:hover {
    opacity: 1;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 3vw;
        height: 3vw;
        border-radius: 20px;
        background: #004251;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background:  #004251;
        cursor: pointer;
    }
</style>