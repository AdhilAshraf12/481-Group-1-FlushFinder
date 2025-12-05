<script>
	import { goto } from '$app/navigation';
    import devilledirections from '$lib/assets/devilledirections.png';
    import devillemap from '$lib/assets/devillemap.png';
</script>
<div class="pagecontent">
    <div>
        <img src={devillemap} class="devillemap"/>
        <button class="back" onclick={() => goto('/inapp/find')}> &lt; </button>
    </div>
    <div class="godirwrapper">
        <img src={devilledirections} class="devilledirections"/>
        <button class="FSbutton" onclick={() => goto('/inapp/devillestart')}>
            GO
        </button>
    </div>
</div>

<style>
    .back{
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 100%;
        border: none;
        color: black;
        font-size: 35px;
        background-color: transparent;
    }
    .pagecontent{
        height: 100%;
        width: 100%;
        /* border: 2px solid green; */
    }

    .devillemap{
        height: 70%;
        width: 100%;
    }

    .devilledirections{
        height: 30%;
        width: 80%;
    }
    .godirwrapper{
        display:flex;
        align-content: space-between;
        align-items: center;
        /* border: 2px solid green; */
    }

    .FSbutton{
		background-color: #4F378B;
		height: 29px;
		width: 68px;
		color: white;
		border-radius: 100px;
        border: none;
        /* border: 2px solid green; */
	}


</style>