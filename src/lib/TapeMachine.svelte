<script>
    import Tape from '../assets/images/Tape_Machine.svg';
    import Reel1 from '../assets/images/Reel1.svg';
    import Reel2 from '../assets/images/Reel2.svg';
    import Loop from '../assets/images/Loop.svg';
    import { isEffectOn } from '../store.js';

    export let trigger;

    let tapeSpeedLeft = 0;
    let tapeSpeedRight = 0;

    let acceleration = 0;
    let ACCELERATION_TIME = .05 + 0.04 * Math.random();  

    const handleAcceleration = () => {
      if ($isEffectOn) {
          acceleration = acceleration + ACCELERATION_TIME;
          if (acceleration >= .4 + Math.random() * 0.1) acceleration = .5;
      }
      else {
          acceleration = acceleration - (ACCELERATION_TIME * 2);
          if (acceleration <= 0) acceleration = 0;
      }
    }

    const runTape = () => {
      tapeSpeedLeft = (tapeSpeedLeft + acceleration) % 359.5;
      tapeSpeedRight = (tapeSpeedRight + acceleration) % 359.5;
    }

    let timerOne = setInterval(handleAcceleration, 100);
    let timerTwo = setInterval(runTape, 1);
  
    $: if (trigger == true) {
      clearInterval(timerOne);
      clearInterval(timerTwo);

      timerOne = setInterval(handleAcceleration, 100);
      timerTwo = setInterval(runTape, 1);

      console.log('reset');
    }

   

</script>


<div class="tape">

    <img src={Tape} class="tapeMachine" alt="Tape Machine" />
    <img src={Loop} class="LoopSVG" alt="Loop"/>
    <img src={Reel1} class="Reel1" alt="Reel One" style="--frame: {tapeSpeedLeft}deg;"/>
    <img src={Reel2} class="Reel2" alt="Reel Two" style="--frame: {tapeSpeedRight}deg;"/>

</div>

<style>

  .tape {
    
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;

    width: 100%;
    height: 100%;
    background: transparent;
  }

  .tapeMachine {
    width: 70%;
    object-fit: contain;
    position: absolute;
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  }

  
  .Reel1 {
    width: 70%;
    position: absolute;
    transform-origin: 19.8% 39.4%;
    rotate: var(--frame);
    filter: drop-shadow(3px 5px 13px rgb(0 0 0 / 0.4));
  }

   .Reel2 {
    width: 70%;
    position: absolute;
    transform-origin: 81.36% 39.7%;
    rotate: var(--frame);
    filter: drop-shadow(3px 5px 13px rgb(0 0 0 / 0.4));
  }

  .LoopSVG {
    position: absolute;
    width: 70%;
  }
</style>