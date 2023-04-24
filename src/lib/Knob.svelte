<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let area; 

    export let value;
    $: angle = value * 270;

    let isInteracting = false;

    function onMouseMove(event){
       
        
        if (isInteracting == true)
        {
            const rect = area.getBoundingClientRect();
            
            function getCursorPosition(event) {
                const x = event.x - rect.left;
                const y = event.y - rect.top;
                let mousePos = {
                    x: event.x - rect.left,
                    y: event.y - rect.top,
                };
                return mousePos;
            }

            let pos = getCursorPosition(event);
            let valX =  Math.min(Math.max((pos.x/rect.width), 0.0), 1.0) * 1.3;
            let valY =  1 - Math.min(Math.max((pos.y/rect.height), 0.0), 1.0) * 2;

            value = Math.min(Math.max(valX * valY, .0), 1.0);

            dispatch('change', value);
        }
       
       
   }

   function onMouseDown(event){
        isInteracting = true;
   }

   function onMouseUp(){
        isInteracting = false;
   }

</script>

<div class="container" bind:this={area} on:mousedown={onMouseDown} on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:dblclick={() => value = 0} on:mouseleave={() => { isInteracting = false }}> 
    <div class="knob" style="--angle: {angle}deg;">
        <div class="dot"></div>
    </div>
</div>

<style>
    .container {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;

        /* background: orange; */

        width: 100%;
        height: 40%;
      
    }
    h3 {
        position: absolute;
        font-size: 15px;
        color: #71581f;
        
    }

    .knob {
        position: absolute;
        margin: 4rem;
        width: 40px;
        height: 40px;
        color: #7e97b8;
        background-color: rgba(171, 171, 171, 0.833);
        border-style: solid;
        border-width: 2px 2px 2px 2px;
        border-color: rgba(255, 255, 255, 0.333);
        border-radius: 50%;
        padding: .2rem .2rem;
        transform: translate(0px, 0px);
        transform: rotate(var(--angle));
    }

    .dot {
        position: absolute;
        top: 30%;
        left: -20%;
        width: 6px;
        height: 6px;
        color: #7e97b8;
        background-color: #4e4f50;
        border-style: solid;
        border-width: 1px 1px 1px 1px;
        border-color: rgba(255, 255, 255, 0.333);
        border-radius: 50%;
        /* padding: .2rem .2rem; */
        transform: translate(0px, 0px);
        /* transition: 0.2s; */
        /* box-shadow: -4px -2px 16px .1px #ffffffa0, 4px 2px 16px 0.1px rgb(95 157 231 / 28%); */
        margin: 1rem;

    }
</style>