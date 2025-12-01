<script>
	import { page } from '$app/stores';
	import { userInfo } from '$lib/userInfoStore';

	let { children } = $props();
</script>

{@render children?.()}
<nav>
	<a href="/inapp/find" class:selected={$page.url.pathname === '/inapp/find'}
		><img src="https://www.svgrepo.com/show/529715/map-point-wave.svg" alt="Pin Icon" /><span
			>Find</span
		></a
	>

	<a href="/inapp/review" class:selected={$page.url.pathname === '/inapp/review'}
		><img src="" alt="Review Icon" /><span>Review</span></a
	>
	<a href="/inapp/profile" class:selected={$page.url.pathname === '/inapp/profile'}
		><img src={userInfo.getProfilePicture()} alt="Profile Icon" /><span>Profile</span></a
	>
</nav>

<style>
	span {
		display: block;
	}
	img {
		width: 50px;
		aspect-ratio: 1;
		padding: 1svb 6svw;
		border-radius: 50%;
		object-fit: cover;
	}

	a {
		display: flex;
		flex-direction: column;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		justify-content: center;
		border-radius: 1rem;
	}

	nav {
		display: flex;
		background-color: lightblue;
		border-top-left-radius: 4svb;
		border-top-right-radius: 4svb;
		padding: 1svb;
		justify-content: center;
		justify-content: space-evenly;
	}

	.selected {
		background-color: white;
	}
</style>
