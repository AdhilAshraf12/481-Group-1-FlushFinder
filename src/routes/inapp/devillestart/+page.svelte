<script>
	import { goto } from '$app/navigation';
    import start from '$lib/assets/devillestart.png';
    import devillemap from '$lib/assets/devillemap.png';
</script>

<div class="wrapper">
    <img src={start}/>
    <button class="back" onclick={() => goto('/inapp/deville')}> &lt; </button>
</div>

<style>
    .wrapper{
        position: relative;
        height:100%;
        width: 100%;
        /* border: 2px solid green; */
        overflow:hidden;
    }

    img{
        height: 100%;
        width: 100%;
        object-fit: contain;
        /* border: 2px solid green; */
    }
    .back{
        position: absolute;
        top: 10px;
        left: 5px;
        border-radius: 100%;
        border: none;
        color: black;
        font-size: 35px;
        background-color: transparent;
    }
</style>