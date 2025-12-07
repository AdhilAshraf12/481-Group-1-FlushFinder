<script>
	import { page } from '$app/stores';
	import { userInfo } from '$lib/userInfoStore';
	import Icon from '$lib/assets/Icon.png';

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
		><img src={Icon} alt="Review Icon" class="revicon"/><span>Review</span></a
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
		padding: 6px;
		border-radius: 20%;
		object-fit: contain;
	}

	.revicon {
    width: 50px;
	border-radius: 5%;
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
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		background-color: #BBBFEF;
		border-top-left-radius: 4svb;
		border-top-right-radius: 4svb;
		padding: 1svb;
		justify-content: space-evenly;
		align-items: center;
		box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.12);
		z-index: 20;
	}

	.selected {
		background-color: white;
	}

	:global(body) {
		padding-bottom: 96px;
	}
</style>
