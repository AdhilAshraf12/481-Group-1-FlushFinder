<script>
	import { userInfo } from '$lib/userInfoStore';
	import map from '$lib/assets/mapsimage.png';

	$effect(() => {
		if (userInfo.getEmail() == '') {
			location.href = '/';
		}
	});
</script>

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
		<button type="submit">
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

<div class="nearby locations">
		
</div>

<style>
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

	.filterbuttons{
		display:flex;
		justify-content: center;
	}

	.div-search {
		border: 2px solid red;
		display: flex;
		background-color: #ECE6F0;
		align-items: center;
		justify-content: center;
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
		border: 2px solid green;
		display: flex;
		justify-content: top;
		flex-direction: column;
		background-image: url('$lib/assets/mapsimage.png');
		height: 350px;
		width: 100%;
	}
</style>
