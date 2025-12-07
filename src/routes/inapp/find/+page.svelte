<script>
	import { userInfo } from '$lib/userInfoStore';
	import { goto } from '$app/navigation';
	import mapImage from '$lib/assets/mapsimage.png';

	const locations = [
		{
			name: 'Deville Coffee Washroom',
			distance: 0.1, // km
			time: '2 min',
			availability: 'Open now',
			condition: 'Clean',
			accessibility: ['Wheelchair', 'Gender neutral', 'Changing Table'],
			rating: 5,
			gender: 'neutral',
			coords: { x: 30, y: 42 },
			link: '/inapp/deville'
		},
		{
			name: 'BVC Main Floor Washroom',
			distance: 0.3, // km
			time: '6 min',
			availability: 'Busy but open',
			condition: 'Usable',
			accessibility: ['Family friendly', 'Paid Accessibility'],
			rating: 3,
			gender: 'female',
			coords: { x: 58, y: 38 },
			link: '/inapp/find'
		},
		{
			name: 'Superstore Washroom',
			distance: 1.5, // km
			time: '8 min',
			availability: 'Closed for cleaning',
			condition: 'Needs attention',
			accessibility: ['Wheelchair'],
			rating: 1,
			gender: 'male',
			coords: { x: 48, y: 68 },
			link: '/inapp/find'
		},
		{
			name: 'Library Washroom',
			distance: 3.6, // km
			time: '15 min',
			availability: 'Open now',
			condition: 'Clean',
			accessibility: ['Wheelchair', 'Paid Accessibility'],
			rating: 4,
			gender: 'female',
			coords: { x: 70, y: 50 },
			link: '/inapp/library'
		},
		{
			name: 'Mall Washroom',
			distance: 5, // km
			time: '30 min',
			availability: 'Open now',
			condition: 'Clean',
			accessibility: ['Wheelchair', 'Changing Table', 'Paid Accessibility'],
			rating: 5,
			gender: 'neutral',
			coords: { x: 20, y: 75 },
			link: '/inapp/mall'
		}
	];

	let query = $state('');
	let activeFilter = $state('All');
	let selectedId = $state(locations[0]?.name || '');
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);

	export function isGuest() {
		return userInfo.getEmail() === '';
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

	// ------------------------------
	// Filter popup variables
	let showFilter = $state(false);
	let distance = $state(5); // km maximum distance
	let rating = $state(0);
	let gender = $state('');
	let accessibilityFilters = $state([]); // array to hold selected accessibility options

	// Filter popup functions
	function toggleFilter() {
		showFilter = !showFilter;
	}

	function closeFilter() {
		showFilter = false;
		// Reset filters
		distance = 5;
		rating = 0;
		gender = '';
		accessibilityFilters = [];
		activeFilter = 'All';
	}

	function handleDistanceChange(event) {
		distance = parseFloat(event.target.value);
	}

	function saveRating(value) {
		if (rating === value && value === 1) {
			rating = 0;
		} else {
			rating = value;
		}
	}

	function selectGender(value) {
		if (gender === value) {
			gender = '';
		} else {
			gender = value;
		}
	}

	function toggleAccessibility(value) {
		if (accessibilityFilters.includes(value)) {
			accessibilityFilters = accessibilityFilters.filter((v) => v !== value);
		} else {
			accessibilityFilters = [...accessibilityFilters, value];
		}
	}

	// Filtered locations based on popup and search
	function filteredLocations() {
		return locations.filter((loc) => {
			const matchesSearch = loc.name.toLowerCase().includes(query.trim().toLowerCase());
			const matchesRating = rating === 0 || loc.rating >= rating;
			const matchesGender = gender === '' || loc.gender === gender;
			const matchesAccessibility =
				accessibilityFilters.length === 0 ||
				accessibilityFilters.every((f) => loc.accessibility.includes(f));
			const matchesDistance = loc.distance <= distance; // use km directly
			const matchesActiveFilter =
				activeFilter === 'All' ||
				(activeFilter === 'Open now' && loc.availability === 'Open now') ||
				loc.accessibility.includes(activeFilter);

			return matchesSearch && matchesRating && matchesGender && matchesAccessibility && matchesDistance && matchesActiveFilter;
		});
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
					<button type="button" aria-label="Pan up" onclick={() => nudge(0, -12)}>^</button>
					<div>
						<button type="button" aria-label="Pan left" onclick={() => nudge(-12, 0)}>&lt;</button>
						<button type="button" aria-label="Pan right" onclick={() => nudge(12, 0)}>&gt;</button>
					</div>
					<button type="button" aria-label="Pan down" onclick={() => nudge(0, 12)}>v</button>
				</div>
				<button type="button" class="ghost" onclick={resetView}>Reset view</button>
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
						onclick={() => selectLocation(loc)}
						aria-label={`Select ${loc.name}`}
					>
						<span class="dot"></span>
						<span class="label">{loc.distance} km</span>
					</button>
				{/each}
			</div>
		</div>
		<p class="map-hint">Click a pin or a card to focus; use arrows to pan and the slider to zoom.</p>
	</section>

	<form
		class="search"
		onsubmit={(e) => e.preventDefault()}
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
			<button
				type="button"
				class:selected={activeFilter === 'All'}
				onclick={closeFilter}
			>
				See All
			</button>

			<button type="button" class="FSbutton" onclick={toggleFilter}>Filters</button>
		</div>
	</form>

	{#if showFilter}
		<div class="filter-popup-overlay">
			<div class="filter-popup">
				<form>
					<button class="close-btn" type="button" onclick={closeFilter}>✕</button>

					<label for="distance">Maximum Distance</label>
					<input
						id="distance"
						type="range"
						min="0"
						max="5"
						step="0.1"
						bind:value={distance}
						oninput={handleDistanceChange}
					/>
					<div class='DistanceValue'>{distance} km</div>

					<br />
					<label>
						Minimum Rating
						<br />
						<div style="display: flex; gap: 5px; cursor: pointer;">
							{#each [1,2,3,4,5] as star}
								<button class="star-button"
									type="button"
									onclick={() => saveRating(star)}
									style="
										font-size: 30px;
										color: {star <= rating ? 'gold' : 'transparent'};
										-webkit-text-stroke: 1px gold;
									"
								>★</button>
							{/each}
						</div>
					</label>

					<br />
					<label>
						Gender
						<div style="display: flex; gap: 10px; margin-top: 8px;">
							<button id='male-button' type="button" onclick={() => selectGender('male')} class:selected={gender === 'male'}>
								<span class="gender-symbol">♂</span>
								<span class="gender-text">Male</span>
							</button>

							<button id='female-button' type="button" onclick={() => selectGender('female')} class:selected={gender === 'female'}>
								<span class="gender-symbol">♀</span>
								<span class="gender-text">Female</span>
							</button>

							<button id='neutral-button' type="button" onclick={() => selectGender('neutral')} class:selected={gender === 'neutral'}>
								<span class="gender-symbol">⚥</span>
								<span class="gender-text">Neutral</span>
							</button>
						</div>
					</label>

					<br />
					<label>
						Accessibility
						<br />
						<label><input type="checkbox" checked={accessibilityFilters.includes('Wheelchair')} onchange={() => toggleAccessibility('Wheelchair')} /> Wheelchair</label>
						<label><input type="checkbox" checked={accessibilityFilters.includes('Changing Table')} onchange={() => toggleAccessibility('Changing Table')} /> Changing Table</label>
						<label><input type="checkbox" checked={accessibilityFilters.includes('Paid Accessibility')} onchange={() => toggleAccessibility('Paid Accessibility')} /> Paid Accessibility</label>
					</label>

					<br />
					<button type="button" class="Save-button" onclick={toggleFilter}>Save</button>
				</form>
			</div>
		</div>
	{/if}

	<section class="list">
		{#if filteredLocations().length === 0}
			<p class="empty">No results. Try clearing filters.</p>
		{:else}
			{#each filteredLocations() as loc}
				<article class={`card ${selectedId === loc.name ? 'active' : ''}`}>
					<div
						class="card-link"
						role="button"
						tabindex="0"
						aria-label={`Select ${loc.name} — single click highlights, double-click opens reviews`}
						onclick={() => selectLocation(loc)}
						ondblclick={() => goto(`/inapp/review?name=${encodeURIComponent(loc.name)}&link=${encodeURIComponent(loc.link)}`)}
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								if (e.shiftKey) {
									goto(`/inapp/review?name=${encodeURIComponent(loc.name)}&link=${encodeURIComponent(loc.link)}`);
								} else {
									selectLocation(loc);
								}
							}
						}}
					>
						<header>
							<div>
								<h2>{loc.name}</h2>
								<p class="meta">{loc.distance} km / {loc.time}</p>
							</div>
						</header>
						<div class="tags">
							<span class="pill">{loc.availability}</span>
							<span class="pill neutral">{loc.condition}</span>
							{#each loc.accessibility as tag}
								<span class="pill ghost">{tag}</span>
							{/each}
						</div>
					</div>
					<div class="card-actions">
						<a class="reviews-link" href={`/inapp/review?name=${encodeURIComponent(loc.name)}&link=${encodeURIComponent(loc.link)}`} onclick={(e) => e.stopPropagation()}>Reviews</a>
						<a class="go" href={loc.link} onclick={(e) => e.stopPropagation()}>Go</a>
					</div>
				</article>
			{/each}
		{/if}
	</section>
</section>



<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* =================== Hero / Page =================== */
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

/* =================== Map Panel =================== */
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

/* =================== Search =================== */
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



.filters button.selected {
	background: #4f378b;
	color: white;
	border-color: #4f378b;
	border-radius: 10px;
	width: 100px;
}

.FSbutton{
	background-color: #4F378B;
	height: 29px;
	width: 100px;
	color: white;
	border-radius: 10px;
	cursor: pointer;
	border: none;
}

/* =================== List / Cards =================== */
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

.card-actions {
	display: flex;
	gap: 8px;
	align-items: center;
}

.reviews-link {
	background: transparent;
	border: 1px solid #d6d6de;
	padding: 8px 12px;
	border-radius: 10px;
	font-weight: 700;
	text-decoration: none;
	color: #4f378b;
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

/* =================== Filter Popup =================== */
.filter-popup-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.filter-popup {
	background-color: white;
	padding: 20px;
	border-radius: 12px;
	width: 300px;
	box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

label {
	display: block;
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	margin-bottom: 10px;
}

.DistanceValue {
	font-family: 'Inter', sans-serif;
	font-size: 14px;
}

#distance {
	width: 100%;
	height: 20px;
	border-radius: 8px;
	background: #E8DEF8;
	accent-color: #6750A4;
	outline: none;
	margin-top: 8px;
	margin-bottom: 8px;
}

.star-button {
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	margin: 0;
}

#male-button,
#female-button,
#neutral-button {
	padding: 8px 16px;
	border-radius: 8px;
	border: 1px solid #ccc;
	background-color: white;
	cursor: pointer;
	font-size: 14px;
	transition: all 0.2s;
}

#male-button.selected,
#female-button.selected,
#neutral-button.selected {
	background-color: #E8DEF8;
	border-color: #6750A4;
}

.gender-text {
	font-family: 'Inter', sans-serif;
	font-size: 14px;
	font-weight: 500;
	color: #4F378B;
}

.close-btn {
	font-size: 18px;
	color: #757575;
	cursor: pointer;
	background-color: white;
	border: none;
	margin-left: 90%;
}

.Save-button {
	background-color: #4F378B;
	height: 29px;
	width: 68px;
	color: white;
	border-radius: 100px;
	cursor: pointer;
	margin-top: 10px;
	margin-left: 40%;
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
