<script>
	import { userInfo } from '$lib/userInfoStore';
	import { goto } from '$app/navigation';
	import mapImage from '$lib/assets/mapsimage.png';

	const locations = [
		{
			name: 'Deville Coffee Washroom',
			distance: '100 m',
			time: '2 min',
			availability: 'Open now',
			condition: 'Clean',
			accessibility: ['Wheelchair', 'Gender neutral'],
			coords: { x: 30, y: 42 },
			link: '/inapp/deville'
		},
		{
			name: 'BVC Main Floor Washroom',
			distance: '300 m',
			time: '6 min',
			availability: 'Busy but open',
			condition: 'Usable',
			accessibility: ['Family friendly'],
			coords: { x: 58, y: 38 },
			link: '/inapp/find'
		},
		{
			name: 'Superstore Washroom',
			distance: '350 m',
			time: '8 min',
			availability: 'Closed for cleaning',
			condition: 'Needs attention',
			accessibility: ['Wheelchair'],
			coords: { x: 48, y: 68 },
			link: '/inapp/find'
		}
	];

	let query = $state('');
	let activeFilter = $state('All');
	const filters = ['All', 'Open now', 'Wheelchair', 'Gender neutral', 'Family friendly'];
	let selectedId = $state(locations[0]?.name || '');
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);

	$effect(() => {
		if (userInfo.getEmail() === '') {
			location.href = '/';
		}
	});

	function matchesFilter(location) {
		if (activeFilter === 'All') return true;
		if (activeFilter === 'Open now') return location.availability === 'Open now';
		return location.accessibility.includes(activeFilter);
	}

	function filteredLocations() {
		return locations.filter(
			(loc) =>
				matchesFilter(loc) &&
				loc.name.toLowerCase().includes(query.trim().toLowerCase())
		);
	}

	function selectLocation(loc) {
		selectedId = loc.name;
	}

	function nudge(dx, dy) {
		panX += dx;
		panY += dy;
	}

	function resetView() {
		panX = 0;
		panY = 0;
		zoom = 1;
	}
</script>

<section class="page">
	<header class="hero">
		<div>
			<p class="eyebrow">Find bathrooms nearby</p>
			<h1>Pick a spot and go</h1>
			<p class="lede">Search, filter, and jump to the closest clean and open washrooms.</p>
		</div>
	</header>

	<section class="map-panel">
		<header class="map-head">
			<div>
				<h2>Map preview</h2>
				<p class="hint">Fake map you can pan, zoom, and select pins.</p>
			</div>
			<div class="map-controls">
				<label>
					<span>Zoom</span>
					<input type="range" min="0.85" max="1.35" step="0.05" bind:value={zoom} />
				</label>
				<div class="pan-controls" aria-label="Pan controls">
					<button type="button" aria-label="Pan up" on:click={() => nudge(0, -12)}>^</button>
					<div>
						<button type="button" aria-label="Pan left" on:click={() => nudge(-12, 0)}>&lt;</button>
						<button type="button" aria-label="Pan right" on:click={() => nudge(12, 0)}>&gt;</button>
					</div>
					<button type="button" aria-label="Pan down" on:click={() => nudge(0, 12)}>v</button>
				</div>
				<button type="button" class="ghost" on:click={resetView}>Reset view</button>
			</div>
		</header>
		<div
			class="map-shell"
			style={`background-image: linear-gradient(135deg, rgba(247, 247, 251, 0.85) 25%, rgba(234, 234, 245, 0.85) 25%, rgba(234, 234, 245, 0.85) 50%, rgba(247, 247, 251, 0.85) 50%, rgba(247, 247, 251, 0.85) 75%, rgba(234, 234, 245, 0.85) 75%, rgba(234, 234, 245, 0.85) 100%), url(${mapImage});`}
		>
			<div
				class="map-content"
				style={`transform: translate(${panX}px, ${panY}px) scale(${zoom});`}
			>
				<div class="map-grid"></div>
				{#each locations as loc}
					<button
						type="button"
						class:selected={selectedId === loc.name}
						style={`left: ${loc.coords.x}%; top: ${loc.coords.y}%;`}
						on:click={() => selectLocation(loc)}
						aria-label={`Select ${loc.name}`}
					>
						<span class="dot"></span>
						<span class="label">{loc.distance}</span>
					</button>
				{/each}
			</div>
		</div>
		<p class="map-hint">Click a pin or a card to focus; use arrows to pan and the slider to zoom.</p>
	</section>

	<form
		class="search"
		on:submit|preventDefault={() => {
			// filtering happens on input binding
		}}
	>
		<div class="search-box">
			<img src="https://www.svgrepo.com/show/532552/search-alt-2.svg" alt="" />
			<input
				placeholder="Search for bathrooms or places"
				bind:value={query}
				aria-label="Search bathrooms"
			/>
		</div>
		<div class="filters" aria-label="Filters">
			{#each filters as filter}
				<button
					type="button"
					class:selected={activeFilter === filter}
					on:click={() => (activeFilter = filter)}
				>
					{filter}
				</button>
			{/each}
		</div>
	</form>

	<section class="list">
		{#if filteredLocations().length === 0}
			<p class="empty">No results. Try clearing filters.</p>
		{:else}
			{#each filteredLocations() as loc}
				<article class={`card ${selectedId === loc.name ? 'active' : ''}`} on:click={() => selectLocation(loc)}>
					<header>
						<div>
							<h2>{loc.name}</h2>
							<p class="meta">{loc.distance} / {loc.time}</p>
						</div>
						<button class="go" type="button" on:click={() => goto(loc.link)}>Go</button>
					</header>
					<div class="tags">
						<span class="pill">{loc.availability}</span>
						<span class="pill neutral">{loc.condition}</span>
						{#each loc.accessibility as tag}
							<span class="pill ghost">{tag}</span>
						{/each}
					</div>
				</article>
			{/each}
		{/if}
	</section>
</section>

<style>
	:global(body) {
		font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		background: #f6f7fb;
		color: #1e1e1e;
	}

	.page {
		max-width: 1000px;
		margin: 0 auto;
		padding: 24px 18px 72px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.hero {
		background: linear-gradient(135deg, #4f378b, #7c66c2);
		color: white;
		padding: 18px 20px;
		border-radius: 16px;
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 11px;
		margin: 0 0 6px 0;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
	}

	h1 {
		margin: 0;
		font-size: 26px;
	}

	.lede {
		margin: 6px 0 0;
		color: rgba(255, 255, 255, 0.8);
	}

	.map-panel {
		background: white;
		border-radius: 14px;
		padding: 14px;
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid #ececf4;
	}

	.map-head {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	.map-head h2 {
		margin: 0 0 2px 0;
	}

	.hint {
		margin: 0;
		color: #5f5f6b;
	}

	.map-controls {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.map-controls label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
	}

	.map-controls input[type='range'] {
		accent-color: #4f378b;
	}

	.map-controls .ghost {
		background: transparent;
		border: 1px solid #d6d6de;
		color: #4f378b;
		padding: 8px 10px;
		border-radius: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	.pan-controls {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4px;
		align-items: center;
	}

	.pan-controls > div {
		display: flex;
		gap: 4px;
		justify-content: center;
	}

	.pan-controls button {
		background: #f4f4f6;
		border: 1px solid #d6d6de;
		border-radius: 8px;
		padding: 6px 10px;
		cursor: pointer;
		font-weight: 700;
		font-size: 16px;
	}

	.map-shell {
		position: relative;
		height: 280px;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid #ececf4;
		background-size: 32px 32px, cover;
	}

	.map-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: transform 0.15s ease;
	}

	.map-grid {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 20%, rgba(79, 55, 139, 0.1) 0, rgba(79, 55, 139, 0.1) 3px, transparent 5px),
			radial-gradient(circle at 70% 65%, rgba(255, 148, 102, 0.16) 0, rgba(255, 148, 102, 0.16) 6px, transparent 10px);
	}

	.map-content button {
		position: absolute;
		transform: translate(-50%, -50%);
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: center;
	}

	.map-content .dot {
		width: 16px;
		height: 16px;
		background: #ff7f5f;
		border: 2px solid white;
		border-radius: 50%;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		display: inline-block;
	}

	.map-content .label {
		display: block;
		margin-top: 4px;
		background: white;
		color: #1e1e1e;
		padding: 4px 8px;
		border-radius: 8px;
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
		font-weight: 700;
		border: 1px solid #ececf4;
	}

	.map-content button.selected .dot {
		background: #4f378b;
	}

	.map-content button.selected .label {
		border-color: #4f378b;
	}

	.map-hint {
		margin: 0;
		color: #5f5f6b;
		font-size: 14px;
	}

	.search {
		background: white;
		border-radius: 12px;
		padding: 14px;
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.search-box {
		display: flex;
		align-items: center;
		gap: 10px;
		border: 1px solid #d6d6de;
		border-radius: 12px;
		padding: 10px 12px;
		background: #fafbff;
	}

	.search-box img {
		width: 22px;
		height: 22px;
	}

	.search-box input {
		border: none;
		outline: none;
		font-size: 16px;
		width: 100%;
		background: transparent;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.filters button {
		border: 1px solid #d6d6de;
		background: #f2f2f7;
		padding: 8px 12px;
		border-radius: 10px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.filters button.selected {
		background: #4f378b;
		color: white;
		border-color: #4f378b;
		box-shadow: 0 6px 14px rgba(79, 55, 139, 0.25);
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 14px;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
		border: 1px solid #ececf4;
		display: flex;
		flex-direction: column;
		gap: 10px;
		cursor: pointer;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.card.active {
		border-color: #4f378b;
		box-shadow: 0 10px 20px rgba(79, 55, 139, 0.2);
	}

	.card header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.card h2 {
		margin: 0;
		font-size: 18px;
	}

	.meta {
		margin: 2px 0 0;
		color: #5f5f6b;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.pill {
		background: #eef6ff;
		color: #1f4788;
		padding: 6px 10px;
		border-radius: 999px;
		font-weight: 700;
		font-size: 13px;
		border: 1px solid #d1e3ff;
	}

	.pill.neutral {
		background: #f9f9fb;
		color: #3c3c49;
		border-color: #e1e1ec;
	}

	.pill.ghost {
		background: #f4f4f6;
		color: #2c2c35;
		border-color: #e1e1e9;
	}

	.go {
		background: linear-gradient(135deg, #4f378b, #654cb5);
		color: white;
		border: none;
		border-radius: 10px;
		padding: 10px 14px;
		font-weight: 700;
		cursor: pointer;
		box-shadow: 0 8px 16px rgba(79, 55, 139, 0.28);
		transition: transform 0.1s ease, box-shadow 0.15s ease;
	}

	.go:hover {
		transform: translateY(-1px);
		box-shadow: 0 10px 18px rgba(79, 55, 139, 0.32);
	}

	.empty {
		color: #5f5f6b;
		text-align: center;
		padding: 12px;
	}

	@media (max-width: 640px) {
		.card header {
			flex-direction: column;
			align-items: flex-start;
		}

		.go {
			width: 100%;
		}
	}
</style>
