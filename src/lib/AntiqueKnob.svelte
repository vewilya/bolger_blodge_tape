<script>
	import { onMount, onDestroy } from 'svelte';
     import { createEventDispatcher } from "svelte";
     import { get } from 'svelte/store';

     const dispatch = createEventDispatcher();
     export let col;

     let innerWidth = window.innerWidth;
     let innerHeight = window.innerHeight;

	let canvas;
     let reset = false;
     
     export let value = 0.0;
     export let value2 = 0.0;

     $: displayVal = (value * 100).toFixed(0) +' %';
     export let param;

     function setDefault(e) {
          value = 0.0;
     
          reset != reset;

          setTimeout(() => {
               reset = false;
          }, 100)
     }


     let isDragging = false;

     function handleMouseLeave() {
          isDragging = false;
     }

     function handleMouseDown() {
          isDragging = true;
     }

     function handleMouseUp() {
          isDragging = false;
     }

     function onMouseMove(e) {
          const rect = canvas.getBoundingClientRect();

          function getCursorPosition(event) {
               const x = event.x - rect.left;
               const y = event.y - rect.top;

               let mousePos = {
                    x: event.x - rect.left,
                    y: event.y - rect.top,
               };

               return mousePos;
          }

          let pos = getCursorPosition(e);

          if (isDragging) {
               let vx = Math.max(Math.min((pos.x / canvas.width * 2) * 1.2, 1), 0);
               let vy = Math.max(Math.min((pos.y / canvas.height * 2) * 1.2, 1), 0);

               value = Math.max(Math.min(Math.pow(vx,3) + Math.pow((1-vy),3), 1), 0) ; 
               // $pluginParams.delayFeedback = value;

               dispatch("change", { value });
          }

     }

     let frame;

     onDestroy(() => {
          cancelAnimationFrame(frame);
     });

	onMount(() => {
		const ctx = canvas.getContext('2d');
		frame = requestAnimationFrame(loop);
          let time = 0;
         
          const scale = window.devicePixelRatio; 

          let width = window.innerWidth * .2;
          let height = window.innerHeight * .2;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          // Change to 1 on retina screens to see blurry canvas.
          canvas.width = Math.floor(width * scale);
          canvas.height = Math.floor(height * scale);

          ctx.scale(scale, scale);
          canvas.style.background = "transparent";

          function drawKnob(value, inCol, outCol){ 
               const gradient = ctx.createLinearGradient(20, 0, 220, 0);
               
               // Add three color stops
               gradient.addColorStop(0, 'rgba('+col.red+','+col.green+','+col.blue+', .3)');
               gradient.addColorStop(0.5, 'rgba('+col.blue+','+col.red+','+col.green+', .2)');
               gradient.addColorStop(1, 'rgba('+col.green+','+col.blue+','+col.red+', .3)');
              
               const gradient2 = ctx.createLinearGradient(20, 0, 220, 0);
               // Add three color stops
               gradient2.addColorStop(0, 'rgba('+col.red+','+col.green+','+col.blue+', '+value+')');
               gradient2.addColorStop(1, 'rgba('+col.blue+','+col.red+','+col.green+', '+value+')');
               // gradient2.addColorStop(1, 'rgba('+col.green+','+col.blue+','+col.red+', 1)');

               let hW = width/2;
               let hH = height/2;
               let size = 50;

               for(let i = 0; i < 10; i++){
                    ctx.beginPath();
                    ctx.arc( hW, hH, size* (i*.1)*1.0, 0, Math.PI * 2);
                    ctx.fillRect(hW - size* (i*.1)*1.0 * .5, hH- size* (i*.1)*1.0 * .5, size* (i*.1)*1.0, size* (i*.1)*value2);
                    ctx.fillStyle = gradient //'rgba('+col.red+','+col.green+','+col.blue+', '+1.0+')' //'rgba('+col.red+','+col.green+','+col.blue+', .7)';
                    ctx.fill();
                    ctx.closePath();       
               }

               ctx.beginPath();
               ctx.lineCap = "round";
               ctx.lineWidth = 9;
               ctx.arc( hW, hH, size, Math.PI * .75, Math.PI * .75 + (Math.PI * 1.5 * value));
               
               ctx.strokeStyle = gradient2 // 'rgba('+col.red+','+col.green+','+col.blue+', 1)';
               ctx.stroke();
               ctx.closePath();

               ctx.beginPath();
               ctx.lineCap = "round";
               ctx.lineWidth = 9;
               ctx.arc( hW, hH, size, Math.PI * .75, Math.PI * .75 + (Math.PI * 1.5 * .001));
               ctx.strokeStyle = 'rgba('+col.red+','+col.green+','+col.blue+', '+1.0+')' // 'rgba('+col.red+','+col.green+','+col.blue+', 1)';
               ctx.stroke();
               ctx.closePath();

               ctx.beginPath();
               ctx.lineCap = "round";
               ctx.lineWidth = 9;
               ctx.arc( hW, hH, size, Math.PI * .749 + (Math.PI * 1.5 * value), Math.PI * .75 + (Math.PI * 1.5 * value));
               ctx.strokeStyle = gradient
               ctx.stroke();
               ctx.closePath();
          }

		function loop(t) {
               requestAnimationFrame(loop);
               ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

               drawKnob(value);
             
               time = t;

			return () => {	
				cancelAnimationFrame(frame);
			}
		}
	});
</script>

<div class="container">

     <canvas 
          bind:this={canvas}   
          on:dblclick={setDefault}
          on:mousedown={handleMouseDown}
          on:mouseup={handleMouseUp}
          on:mouseleave={handleMouseLeave}
          on:mousemove={onMouseMove}
          
     ></canvas>     
     
     <h3>{param}</h3>
     
     <h4>{ displayVal }</h4>
</div>

<style>


     h3 {
          position: absolute; 
          font-size: 11px;
          text-align: center;
          z-index: 2;
          top: 40%;
          pointer-events: none;
     }

     h4 {
          position: absolute;    
          font-size: 11px;
          font-weight: lighter;
          text-align: center;
          top: 47%;
          z-index: 2;
          pointer-events: none;
     }

     .container {
          position: relative;
          display: flex;
          justify-content: center;
          flex-direction: coloumn;
          width: 20vw;
          height: 18vh;
          z-index: 1;    
          /* background-color: aliceblue; */
     }

	canvas { 
          width: 20vw;
          height: 20vw;
          z-index: 2;
	}
	
</style>