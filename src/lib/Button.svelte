<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let button;
    let active = false;

    export let size;
    export let onState;
    export let offState;

    let text = offState;

    const toggle = () => {
        active = !active;
        active ? text = onState : text = offState;    
        dispatch('toggle', active);
   }
   
</script>

<button class:active id="switch" style="--size: {size}px;" on:click={toggle}>{text}</button>
<style>
     #switch {
        position: relative;
        width: var(--size);
        height: var(--size);
        min-width: 30px;
        font-size: 2vw;
        padding: .1vw .1vw;

        outline: none;
        text-align: center;
        color: #7e97b8;
        background-color: #cee2f4;
        border-style: solid;
        border-width: 2px 2px 2px 2px;
        border-color: rgba(255, 255, 255, 0.333);
        border-radius: 50%;
        transition: background-color 1s;
        /* padding: .2rem .2rem; */
        box-shadow: -4px -2px 16px .1px #ffffffa0, 4px 2px 16px 0.1px rgb(95 157 231 / 28%);
    }

    #switch:hover {
        color: #516d91;
        background-color: #E5EDF5;
        box-shadow: -2px -1px 8px 0px #ffffff, 2px 1px 8px 0px rgb(95 157 231 / 48%);
    }

    #switch.active {
        outline: none;
        box-shadow: none;
        background-color: #F1BB3D;
        color: #ad452e;
    }
</style>