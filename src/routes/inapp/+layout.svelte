<!-- src/routes/inapp/+layout.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userInfo } from '$lib/userInfoStore';
	import Icon from '$lib/assets/Icon.png';
	import { onMount } from 'svelte';

	let profilePicture = 'https://picsum.photos/100/100';

	onMount(() => {
		const p = userInfo.getProfilePicture();
		if (p) profilePicture = p;
	});

	$: pagePath = $page.url.pathname;
</script>

<!-- Main content area -->
<div class="pb-20">
	<slot />
</div>

<!-- Fixed bottom navigation -->
<nav class="fixed bottom-0 left-0 right-0 bg-purple-100 shadow-lg z-50">
	<div class="flex items-center justify-around px-6 py-4 max-w-md mx-auto">
		<a
			href="/inapp/find"
			class={'flex flex-col items-center gap-1 px-8 py-2 rounded-full transition-all ' +
				(pagePath === '/inapp/find' ? 'bg-white text-purple-700 shadow' : 'text-gray-600')}
		>
			<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
				<circle cx="12" cy="10" r="3"></circle>
			</svg>
			<span class="text-xs">Find</span>
		</a>

		<a
			href="/inapp/review"
			class={'flex flex-col items-center gap-1 px-8 py-2 rounded-full transition-all ' +
				(pagePath === '/inapp/review' ? 'bg-white text-purple-700 shadow' : 'text-gray-600')}
		>
			<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
				<polyline points="14 2 14 8 20 8"></polyline>
				<line x1="16" y1="13" x2="8" y2="13"></line>
				<line x1="16" y1="17" x2="8" y2="17"></line>
				<polyline points="10 9 9 9 8 9"></polyline>
			</svg>
			<span class="text-xs">Review</span>
		</a>

		<a
			href="/inapp/profile"
			class={'flex flex-col items-center gap-1 px-8 py-2 rounded-full transition-all ' +
				(pagePath === '/inapp/profile' ? 'bg-white text-purple-700 shadow' : 'text-gray-600')}
		>
			<img src={profilePicture} alt="Profile" class="w-6 h-6 rounded-full" />
			<span class="text-xs">Profile</span>
		</a>
	</div>
</nav>

<style>
	* {
		font-family: 'Ubuntu', sans-serif;
	}

	:global(html) {
		/* Reserve vertical scrollbar space to prevent layout shift when overlays appear */
		overflow-y: scroll;
	}

	nav > div {
		max-width: 480px; /* keep nav inner width consistent */
	}
</style>
