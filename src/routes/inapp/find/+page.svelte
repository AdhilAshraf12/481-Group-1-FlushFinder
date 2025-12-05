<script>
	import { userInfo } from '$lib/userInfoStore';
	import { goto } from '$app/navigation';
	import map from '$lib/assets/mapsimage.png';

	$effect(() => {
		if (userInfo.getEmail() == '') {
			location.href = '/';
		}
	});

</script>
<div class="fullpage">
<form class="searchbar-full"
	onsubmit={(e) => {
		e.preventDefault();
		console.log('Hello');
	}}
>
	<div class = "div-search">
		<button type="menu"
			><img src="https://www.svgrepo.com/show/524617/hamburger-menu.svg" alt="Hamburger" /></button
		>
		<input type="text" placeholder="Search for bathrooms" class= "search-bar"/>
		<button type="submit" class="searchicon">
			<img src="https://www.svgrepo.com/show/532552/search-alt-2.svg" alt="Search Icon" />
		</button>
	</div>

</form>
<div class="filterbuttons">
	<span>
		<button class="FSbutton">Filter</button>
		<button class="FSbutton">See All</button>
	</span>
	
</div>
<div class="nearbylocations">
	<div class="buttonrow">
		<button class="locationbut" onclick={() => goto('/inapp/reviewsummary')}>
			Deville Coffee Washroom
			<small class="small">230 m&nbsp;&nbsp;&nbsp;&nbsp;3 min  🚻    ♿</small>
		</button>
		<div class="gocol">
			<div>⭐️⭐️⭐️⭐️⭐️</div>
			<button class="FSbutton" onclick={() => goto('/inapp/deville')}>
				GO
			</button>
		</div>
	</div>		
	<div class="buttonrow">
		<button class="locationbut">
			BVC Main floor Washroom
			<small class="small">300 m&nbsp;&nbsp;&nbsp;&nbsp;6 min&nbsp; ⚧    ♿</small>
		</button>
		<div class="gocol">
			<div>⭐️⭐️⭐️⭐️</div>
			<button class="FSbutton">
				GO
			</button>
		</div>
	</div>	
	<div class="buttonrow">
		<button class="locationbut">
			Superstore Washroom
			<small class="small">350 m&nbsp;&nbsp;&nbsp;&nbsp;8 min  🚻    ♿</small>
		</button>
		<div class="gocol">
			<div>⭐️⭐️⭐️</div>
			<button class="FSbutton">
				GO
			</button>
		</div>
	</div>	
</div>
</div>
<style>
	.gocol{
		display:flex;
		flex-direction: column;
		align-items: center;
		width: 90px;
	}

	.small{
		color: #757575;
	}

	.buttonrow{
		display:flex;
		flex-direction: row;
		padding-right: 5px;
	}
	.locationbut{
		background-color: white;
		/* border: 1px solid purple; */
		margin: 10px;
		color: 1E1E1E;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 10px;
		height: auto;
		width: 235px;
		text-align: left;
		align-items: flex-start;
	}

	.nearbylocations{
		border: 1px solid #D9D9D9;
		box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.25);
		border-radius: 8px;
		height: 220px;
		width: 360px;
		display: flex;
		flex-direction: column;
		margin-left: auto;
  		margin-right: auto;
		justify-content: space-evenly;
	}

	.searchicon{
		margin-left: auto;
		border-radius: 15px;
	}

	img {
		width: 30px;
		aspect-ratio: 1;
	}
	
	.FSbutton{
		background-color: #4F378B;
		height: 29px;
		width: 68px;
		color: white;
		border-radius: 100px;
	}

	.filterbuttons span{
		display:flex;
		justify-content: space-between;
		
	}

	.div-search {
		/* border: 2px solid red; */
		display: flex;
		background-color: #ECE6F0;
		align-items: center;
		justify-content: left;
		height: 56px;
		width: 360px;
		border-radius: 40px;
		padding-left: 10px;
	}

	.search-bar{
		background-color: #ECE6F0;
		height: 28px;
		width: 360;
		border: none;
		outline: none;
	}

	button{
		background-color: #ECE6F0;
		border: none;
	}
	.searchbar-full{
		/* border: 2px solid green; */
		display: flex;
		justify-content: top;
		flex-direction: column;
		background-image: url('$lib/assets/mapsimage.png');
		height: 350px;
		width: 100%;
	}
</style>
