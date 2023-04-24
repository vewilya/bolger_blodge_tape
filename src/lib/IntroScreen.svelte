<script>
     import { createEventDispatcher } from 'svelte';
     import { fade } from 'svelte/transition';
     import { isIntro, isStartingCTX } from "../store.js";
     const dispatch = createEventDispatcher();

     function enterRealm() {
          $isIntro = false;
          $isStartingCTX = true;
     }
</script>


<div class="screen" out:fade={{duration: 2500}}>
     <button on:click={enterRealm} out:fade={{duration: 1500}}>ENTER BOLGER BLØDGE</button>
</div>


<style>
     .screen {
          position: fixed;
          display: flex;
          justify-content: center;
          flex-direction: column;
          
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh; 
          background-color: rgb(0, 0, 0,.9);
          z-index: 102;
     }


     button {
          position: fixed;
          width: 14vw;
          height: 7vw;
          left: 43vw;
          font-size: 2vw;

          outline: none;
          text-align: center;
          color: #7e97b8;
          background-color: #cee2f4;
          border-style: solid;
          border-width: 2px 2px 2px 2px;
          border-color: rgba(255, 255, 255, 0.333);
          padding: .2rem .2rem;
          transition: background-color .2s;
          box-shadow: -4px -2px 20px .5px #ffffffa0, 4px 2px 20px 0.5px rgb(95 157 231 / 28%);
          transition: box-shadow 1s;
     }

    button:active {
        outline: none;
        box-shadow: none;
        background-color: #F1BB3D;
        color: #ad452e;
        transition: 0s;
    }

    button:hover {
          outline: none;
          box-shadow: none;
          /* background-color: #F1BB3D;
          color: #ad452e; */
          border: 1px solid;
          border-color: rgba(255, 255, 255, 0.333);
          transition: box-shadow 1s;
    }
</style>