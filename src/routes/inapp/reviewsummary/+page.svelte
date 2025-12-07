<script>
    import { goto } from '$app/navigation';
	import heart from '$lib/assets/Heart.png';
    import heart2 from '$lib/assets/Heart2.png';
    import { userInfo, isGuest } from '$lib/userInfoStore.js';
	import { stopPropagation } from 'svelte/legacy';
    import { sharedReviews } from '$lib';
    import { rating } from '$lib';
    import { currentcondition } from '$lib';
    const STAR_FILLED = '\u2605';
	const STAR_EMPTY = '\u2606';

    let show = false;
    let like=false;

    // Check if the user is logged in first
    function toggleheart(){
        if (isGuest()) {
            like=false;
            show=true;
        } else {
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
                <h4>227 11 Ave SW <br> 🚻    ♿    <br> <span class="stars-inline">{STAR_FILLED.repeat(Math.round($rating))}</span></h4>
                <div class="dr">
                    <button class="open">{$currentcondition}</button>
                    <button class="review-btn" onclick={toreviewpage}>Leave a Review</button>
                </div>      
            </div>
        </div>
        <!-------------------------------->
    </div><div class="revwrapper">
    {#each $sharedReviews as item}
	<div class="rev">
        <!-- <h3>{item.rating}</h3> -->
         <div class="score">
            <span class="stars-inline">
                {STAR_FILLED.repeat(item.rating)}{STAR_EMPTY.repeat(5 - item.rating)}
            </span>
            <span class="rating-number">{item.rating}/5</span>
        </div>
		<h3>{item.title}</h3>
		<p>{item.body}</p>
		<p>{item.author}</p>
	</div>
{/each}
</div>
</div>

<style>
    .rating-number {
		color: #414157;
		font-weight: 700;
	}
    .stars-inline {
		color: #f7b500;
		font-size: 16px;
		letter-spacing: 1px;
	}
    .score {
		display: flex;
		align-items: center;
		gap: 8px;
	}
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