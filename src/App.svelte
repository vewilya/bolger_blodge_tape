<script>
  import Title from './lib/Title.svelte'
  import Audio from './lib/Audio.svelte'
  import NoiseBG from './lib/NoiseBG.svelte'
  import Footer from './lib/Footer.svelte'
  import Waveform from './lib/Waveform.svelte';
  import IntroScreen from './lib/IntroScreen.svelte';
  import { isIntro } from './store';

</script>


<main>

  {#if $isIntro}
    <IntroScreen />
  {/if}
  <Waveform />
  <Footer />
  <NoiseBG />
  <Title />
  <Audio />
</main>

<style>
  :root {
    font-family:  'Antonio', sans-serif;
    outline: none;

    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */    
    cursor: default;
  }
    
  :global(body) {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 500px;
    /* max-width: 800px; */
    min-height: 500px;

    width: 100vw;
    height: 100vh;
    padding: 0;
    background: rgb(34,193,195);
    background: linear-gradient(58deg, #22c1c3 0%, #fdba2b 100%);
  }
  
</style>
