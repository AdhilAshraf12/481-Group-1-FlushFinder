<script>
    import { goto } from '$app/navigation';
	import heart from '$lib/assets/Heart.png';
    import heart2 from '$lib/assets/Heart2.png';
    import { userInfo } from '$lib/userInfoStore.js';
	import { stopPropagation } from 'svelte/legacy';

    let show = false;
    let like=false;

    // Check if the user is logged in first
    function toggleheart(){
        if (userInfo.getEmail() == 'test@mail.com') {
			like=false;
            show=true;
		}else{
            like=!like;
        }
    }

    function toreviewpage(){
        goto('review');
    }

</script>

{#if show}
        <div class="popup-bg">
            <div class="popup">Sign up First!
                <button class="close" onclick={() => show=false}>Close</button>
            </div>
        </div>
{/if}

<div>
    <div class="headdiv">
        <!-- <h1>{userInfo}</h1> -->
        <button class="back" onclick={() => goto('/inapp/find')}>&lt;</button>
        <div class="heading">
            <div class="dc">
                <h1>Deville Coffee</h1>
                <button onclick={toggleheart} class="btn-heart"><img src={like ? heart2 : heart} class="heart"/></button>
            </div>
            <div class="dc">
                <h4>227 11 Ave SW <br> 🚻    ♿    <br> ⭐️⭐️⭐️⭐️⭐️</h4>
                <div class="dr">
                    <button class="open">Open</button>
                    <button class="review-btn" onclick={toreviewpage}>Leave a Review</button>
                </div>      
            </div>
        </div>
        <!-------------------------------->
    </div>
    <div class="revwrapper">
        <h2 class="latestrev">Latest Reviews</h2>
        <div class="rev">
            <h3>⭐️⭐️⭐️⭐️⭐️</h3>
            <div><h2>New Favourite place yall!</h2><p>Guysss, its so cleaannn!!!</p></div>
            <h5>BathroomLover234</h5>
        </div>
    </div>
</div>

<style>
    .popup{
        background: white;
        opacity: 100%;
        border-radius: 12px;
        display:flex;
        flex-direction: column;
        height: 120px;
        width: 220px;
        justify-content: center;
        align-items: center;
        justify-content: space-around;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
    }

   .popup-bg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
   }
    .close{
        background-color: #4F378B;
		height: 29px;
		width: 68px;
		color: white;
		border-radius: 100px;
        border:none;
    }
    .revwrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* border:2px solid purple; */
    }
    .rev{
        height: 200px;
        width: 330px;
        border: 1px solid #D9D9D9;
        /* border:2px solid purple; */
        border-radius: 8px;
        padding-left: 10px;
        margin-bottom: 10px;
    }

    .headdiv{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-left: 18px;
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
    .review-btn{
        background-color: #4F378A;
        color: white;
        width: 128px;
        height: 35px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
    }
    .open{
        background-color: #009951;
        color: white;
        width: 128px;
        height: 25px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
    }
    .latestrev{
        font-family: 'Roboto', sans-serif;
        font-size: 29px;
    }

    h1{
        font-family: 'Roboto', sans-serif;
        font-size: 36px;
    }

    h2{
        font-family: 'Roboto', sans-serif;
    }

    h4,h5{
        color: #757575;
        font-family: 'Roboto', sans-serif;
    }

    .dc{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }

    .dr{
        display:flex;
        flex-direction: column;
        gap: 10px;
        justify-content: right;
        align-items: center;
    }
    .btn-heart{
        height: 46px;
        width: 50px;
        padding: 2px;
        border: none;
    }

    /* div{
        border: 2px solid green;
    } */
    .heading{
        /* border: 2px solid green; */
        background-color: #F5F5F5;
        border-radius: 26px;
        width: 85%;
        padding: 7px;
    }

</style>