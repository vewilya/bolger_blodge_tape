<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let button;
    let active = false;

    export let size;
    
    const toggle = () => {
        active = !active;
        dispatch('click', active);
   }
   
</script>

<button class:active id="switch" style="--size: {size}px;" bind:this={button} on:click|preventDefault={toggle}>
    
    {#if active}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clip-rule="evenodd" />
        </svg>      
    {/if}
   
   
</button>

<style>
     #switch {
        position: relative;
        width: var(--size);
        height: var(--size);
        min-width: 30px;
        font-size: 1.8vw;
        padding: .7rem .7rem;
    
        outline: none;
        text-align: center;
        color: #7e97b8;
        background-color: #cee2f4;
        border-style: solid;
        border-width: 2px 2px 2px 2px;
        border-color: rgba(255, 255, 255, 0.333);
        border-radius: 50%;

        transition: background-color 1s;
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

    /* svg {
        width: 20px;
        height: 20px;
    } */
</style>