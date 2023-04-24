<script>
     import { onMount } from "svelte";
     import { data, wobbleData, noiseData, windowWidth, currentParam } from '../store.js'
 
     let canvas;
    
     windowWidth.set(window.innerWidth);

     function resizeCanvas(){
          canvas.width={$windowWidth}
          canvas.height = 200;
     }

     function drawNoise (ctx, width, height, lw) {
        for(let i = 0; i < $noiseData.length; i++){
            const grd = ctx.createLinearGradient(0, 0, width, height);
            grd.addColorStop(0, "#fdba2b" )
            grd.addColorStop(.7, "#22c1c3");
            grd.addColorStop(1, "#226f71");

            ctx.lineCap = "round";
            ctx.lineWidth = lw;
            ctx.strokeStyle = grd;
            

            let mh = height * 0.5;
            ctx.clearRect(i, height, 1, 1);
            ctx.beginPath();
            ctx.arc(i, mh + ($noiseData[i]), lw, 0, Math.PI * 2, true);
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(i, mh + ($noiseData[i]));
            ctx.lineTo(i+1, mh + ($noiseData[i+1]));
            ctx.stroke();

          }    
     }

     function drawWobble (ctx, width, height, lw) {
        for(let i = 0; i < $wobbleData.length; i++){
            const grd = ctx.createLinearGradient(0, 0, width, height);
            grd.addColorStop(0, "#fdba2b" )
            grd.addColorStop(.7, "#22c1c3");
            grd.addColorStop(1, "#226f71");

            let mh = height * 0.5;
            ctx.clearRect(i, height, 1, 1);

            ctx.beginPath();
            ctx.arc(i, mh + ($wobbleData[i]*-10), 2, 0, Math.PI * 2, true);
            ctx.lineWidth = lw;
            ctx.strokeStyle = grd;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(i, mh + ($wobbleData[i]*-10), 2, 0, Math.PI * 2, true);
            ctx.moveTo(i, mh + ($wobbleData[i]*-10));
            ctx.lineTo(i+1, mh + ($wobbleData[i+1]*-10));
            ctx.lineCap = "round";
            ctx.lineWidth = lw;
            
            ctx.strokeStyle = grd;
        
            ctx.stroke();
          }    
     }

     function drawWaveform (ctx, width, height) {
        for(let i = 0; i < $data.length; i++){
            const grd = ctx.createLinearGradient(0, 0, width, height);
            grd.addColorStop(0, "#fdba2b" )
            grd.addColorStop(.7, "#22c1c3");
            grd.addColorStop(1, "#226f71");

            let mh = height * 0.5;
            ctx.clearRect(i, height, 1, 1);

            ctx.beginPath();
            ctx.moveTo(i, mh + $data[i]* mh);
            ctx.lineTo(i+1, mh);
            
            ctx.lineCap = "round";
            ctx.lineWidth = 3 + 4*Math.abs($data[i])
            ctx.strokeStyle = grd;
            ctx.stroke();
            ctx.closePath();
          }    
     }
 
    onMount(() => {
         const ctx = canvas.getContext("2d");
         let frame;
         
         let height = canvas.height;
         let width = canvas.width;

     (function loop(t) {
          ctx.clearRect(0,0, width, height);
          frame = requestAnimationFrame(loop);
          
          if ($currentParam == 0){
              drawWaveform(ctx, width, height);
          }
          else if ($currentParam == 1){
              drawWobble(ctx, width, height, 2);
          }
          else if ($currentParam == 2){
              drawNoise (ctx, width, height, 1.5); 
          }
         })();
 
         return () => {
             cancelAnimationFrame(frame);
         };
     });
 </script>
 
 <div class="canvasContainer">
 
     <canvas
         bind:this={canvas}
         width={window.innerWidth}
         on:resize={resizeCanvas}
         height={400}
     />
 </div>
 
 <style>
    
     canvas {
        position: absolute; 

        width: 100%;
        height: 22%;
        top: 7.5vh;
        left: 0;
        z-index: 10;
        filter: contrast(2) drop-shadow(4px 4px 10px #1c2d2093);
     }
 </style>
 