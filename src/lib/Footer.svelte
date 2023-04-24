<script>
    import SfmS from "../assets/images/Sfms.png";
</script>

<div class="container">
    <a href="https://soundcloud.com/urs-bollhalder/sets/soundscapes-for-modern-superheroes?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing">
        <div class="cover"></div>
        <h5>Music by Urs Bollhalder - Soundscapes for Modern Superheroes: Strolling'n Patrolling </h5>
    </a>
</div>

<style>
    .container {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        /* vertical-align: middle; */
        width: 80vw;
        height: 15vh;
        max-width: 600px;
        /* background: green; */
        bottom: .5vh; 
        left: 10vw;
        z-index: 21;


    }

    .cover {
        position: absolute;
        background-image: url("../assets/images/SfmS.png");
        background-size: contain;

        width: 8vw;
        height: 8vw;
        max-width: 60px;
        max-height: 60px; 
        top: 30%;
        left: 5%;
        margin: auto;
        border: 2px solid rgb(50, 36, 110);
        border-radius: 10px;
        z-index: 21;
        /* background-color: blue; */
    }

    h5 {
        display: inline-block;
        align-content: center;
        vertical-align: middle;
        position: relative;
        color: white;
        font-weight: lighter;
        font-size: 1.71vw;
        text-align: center;
        max-width: 450px;
        z-index: 21;
        width: 100%;
        height: 40%;
        top: 10%;
        left: 7%;
        margin: auto auto;
        padding: .3rem;
        /* background-color: aqua; */
    }
</style>
