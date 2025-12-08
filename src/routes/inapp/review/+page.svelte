<script>
	import { userInfo } from '$lib/userInfoStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { profileStore } from '$lib/profileStore.js';

	const availabilityOptions = ['Open now', 'Busy but open', 'Closed for cleaning'];
	const conditionOptions = ['Sparkling clean', 'Usable', 'Needs attention'];
	const accessibilityOptions = ['Wheelchair accessible', 'Gender neutral', 'Family friendly'];
	const STAR_FILLED = '\u2605';
	const STAR_EMPTY = '\u2606';

	const seedReviews = [
		{
			id: 1,
			title: 'Clean and bright',
			body: 'Easy to find and spotless. Soap and paper towels were stocked.',
			rating: 5,
			author: 'jess.m',
			time: '2h ago',
			status: {
				availability: 'Open now',
				condition: 'Sparkling clean',
				accessibility: 'Wheelchair accessible'
			}
		},
		{
			id: 2,
			title: 'Lineup at lunch',
			body: 'Only two stalls so it backs up around noon, but still usable.',
			rating: 3,
			author: 'kai.lee',
			time: '5h ago',
			status: {
				availability: 'Busy but open',
				condition: 'Usable',
				accessibility: 'Gender neutral'
			}
		},
		{
			id: 3,
			title: 'Closed earlier',
			body: 'Cleaning sign was up around 8pm. Come back later.',
			rating: 2,
			author: 'rohan',
			time: 'Yesterday',
			status: {
				availability: 'Closed for cleaning',
				condition: 'Needs attention',
				accessibility: 'Family friendly'
			}
		}
	];

	// Reviews stored per-location keyed by location name. Seed the example location.
	let reviewsByLocation = $state({ 'Deville Coffee Washroom': seedReviews });
	// load persisted reviews if available
	if (browser) {
		try {
			const raw = sessionStorage.getItem('reviewsByLocation');
			if (raw) reviewsByLocation = JSON.parse(raw);
		} catch (e) {
			// ignore parse errors
		}
	}
	let currentReviews = $state([]);
	let rating = $state(0);
	let title = $state('');
	let review = $state('');
	let availability = $state(availabilityOptions[0]);
	let condition = $state(conditionOptions[0]);
	let accessibility = $state([]);
	let helperMessage = $state('');
	let currentAuthor = $derived(userInfo?.getUsername ? userInfo.getUsername() : 'You');
	let editingId = $state(null);

	let locationName = $state('Selected location');
	let locationLink = $state('/inapp/find');
	let isFavorited = $state(false);

	$effect(() => {
		const favs = $profileStore?.favorites ?? [];
		isFavorited = favs.some((f) => f.name === locationName);
	});

	$effect(() => {
		const n = $page.url.searchParams.get('name');
		const l = $page.url.searchParams.get('link');
		locationName = n ?? 'Selected location';
		locationLink = l ?? '/inapp/find';
	});

	
	$effect(() => {
		currentReviews = reviewsByLocation[locationName] ?? [];
	});

	
	$effect(() => {
		if (!browser) return;
		try {
			sessionStorage.setItem('reviewsByLocation', JSON.stringify(reviewsByLocation));
		} catch (e) {
			
		}
	});

function scrollToReviews() {
    if (!browser) return;
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function isGuest() {
	const e = userInfo.getEmail();
	return !e || e === 'test@mail.com';
}

	

	function toggleAccess(option) {
		if (accessibility.includes(option)) {
			// If it's already selected, remove it
			accessibility = accessibility.filter((item) => item !== option);
		} else {
			// If it's not selected, add it
			accessibility = [...accessibility, option];
		}
		helperMessage = '';
	}

	function submitReview() {
		if (userInfo.getEmail() === 'test@mail.com') {
			helperMessage = 'Please log in to leave a review';
			return;
		}

		if (!title.trim() || !review.trim() || rating === 0) {
			helperMessage = 'Add a title, rating, and a short note before submitting.';
			return;
		}

		// Ensure an array exists for this location
		const list = reviewsByLocation[locationName] ?? [];

		if (editingId) {
			reviewsByLocation[locationName] = list.map((item) =>
				item.id === editingId
					? {
							...item,
							title: title.trim(),
							body: review.trim(),
							rating,
							status: { availability, condition, accessibility }
						}
					: item
			);
			helperMessage = 'Your review was updated.';
		} else {
			const newReview = {
				id: Date.now(), // Simple unique ID
				title: title.trim(),
				body: review.trim(),
				rating,
				author: userInfo.getUsername() || 'You',
				time: 'Just now',
				status: { availability, condition, accessibility }
			};

			reviewsByLocation[locationName] = [newReview, ...list].slice(0, 20);
			helperMessage = 'Thanks for sharing. Your review is live.';
		}

		editingId = null;
		title = '';
		review = '';
		rating = 0;
		availability = availabilityOptions[0];
		condition = conditionOptions[0];
		accessibility = [];
	}

	function deleteReview(id) {
		const list = reviewsByLocation[locationName] ?? [];
		reviewsByLocation[locationName] = list.filter((review) => review.id !== id);
		helperMessage = 'Your review was deleted.';
	}

	function isOwnReview(item) {
		return item.author === currentAuthor;
	}

	function startEdit(item) {
		editingId = item.id;
		title = item.title;
		review = item.body;
		rating = item.rating;
		availability = item.status.availability;
		condition = item.status.condition;
		accessibility = Array.isArray(item.status.accessibility)
			? [...item.status.accessibility]
			: [item.status.accessibility];
		helperMessage = 'Editing your review...';
	}

	function cancelEdit() {
		editingId = null;
		helperMessage = 'Edit cancelled.';
		title = '';
		review = '';
		rating = 0;
		availability = availabilityOptions[0];
		condition = conditionOptions[0];
		accessibility = [];
	}

	function toggleFavoriteLocation() {
		if (isFavorited) {
			const fav = ($profileStore?.favorites || []).find((f) => f.name === locationName);
			if (fav) profileStore.removeFavorite(fav.id);
		} else {
			profileStore.addFavorite({ name: locationName, address: locationLink, rating: 0 });
		}
	}
</script>

<section class="page">
	<header class="hero">
		<div>
			<p class="eyebrow">Share your experience</p>
			<h1>Rate this bathroom</h1>
			<p class="lede">Leave a fast status check, pick a rating, and add a short headline.</p>
		</div>
		<div class="location-row">
				<h2 class="location-name">{locationName}</h2>
				<button
					class="favorite"
					type="button"
					aria-pressed={isFavorited}
					onclick={toggleFavoriteLocation}
					aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
				>
					{isFavorited ? '♥' : '♡'}
				</button>
				<button class="go" type="button" onclick={() => goto(locationLink)}>GO</button>
		</div>
		<div class="pill">Recent reviews</div>
	</header>

	<div class="grid">
		<section class="card">
			<div class="section-head">
				<div>
					<p class="eyebrow">Status</p>
					<h2>Availability</h2>
					<p class="hint">Tap the button that best matches what you saw.</p>
				</div>
			</div>
			<div class="chip-row">
				{#each availabilityOptions as option}
					<button
						type="button"
						class:selected={availability === option}
						onclick={() => {
							availability = option;
							helperMessage = '';
						}}
					>
						{option}
					</button>
				{/each}
			</div>

			<div class="section-head">
				<div>
					<p class="eyebrow">Condition</p>
					<h2>Cleanliness</h2>
					<p class="hint">Keep it honest so others know what to expect.</p>
				</div>
			</div>
			<div class="chip-row">
				{#each conditionOptions as option}
					<button
						type="button"
						class:selected={condition === option}
						onclick={() => {
							condition = option;
							helperMessage = '';
						}}
					>
						{option}
					</button>
				{/each}
			</div>

			<div class="section-head">
				<div>
					<p class="eyebrow">Accessibility</p>
					<h2>Access</h2>
					<p class="hint">Who can comfortably use this bathroom?</p>
				</div>
			</div>
			<div class="chip-row">
				{#each accessibilityOptions as option}
					<button
						type="button"
						class:selected={accessibility.includes(option)}
						onclick={() => toggleAccess(option)}
					>
						{option}
					</button>
				{/each}
			</div>
		</section>
		{#if userInfo.getEmail() !== 'test@mail.com'}
			<section class="card">
				<div class="section-head">
					<div>
						<p class="eyebrow">Your review</p>
						<h2>Rate & write</h2>
						<p class="hint">Pick a star rating and add a title plus a quick note.</p>
					</div>
				</div>

			<div class="stars" aria-label="Star rating from one to five">
				{#each [1, 2, 3, 4, 5] as star}
					<button
						type="button"
						class:selected={rating >= star}
						aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
						onclick={() => {
							rating = star;
							helperMessage = '';
						}}
					>
						{STAR_FILLED}
					</button>
				{/each}
				<span class="rating-label">{rating > 0 ? `${rating}/5` : 'Tap a star'}</span>
			</div>

			<label class="input-group">
				<span>Title</span>
				<input
					name="title"
					placeholder="Example: Clean and well-lit"
					bind:value={title}
					oninput={() => (helperMessage = '')}
				/>
			</label>

			<label class="input-group">
				<span>Review</span>
				<textarea
					name="review"
					rows="4"
					placeholder="Keep it short: what stood out, how busy it was, any tips."
					bind:value={review}
					oninput={() => (helperMessage = '')}
				></textarea>
			</label>

			{#if helperMessage}
				<p class="helper">{helperMessage}</p>
			{/if}

			<div class="actions">
				<button class="submit" type="button" onclick={submitReview} disabled={isGuest()}>
					{editingId ? 'Update review' : 'Submit review'}
				</button>
				{#if editingId}
					<button class="ghost" type="button" onclick={cancelEdit}>Cancel</button>
				{/if}
			</div>
		</section>
		{:else}
		<section class="card guest-banner">
			<p>You are continuing as a guest. Guests cannot post reviews.</p>
			<div class="guest-actions">
				<button type="button" class="ghost" onclick={scrollToReviews}>Continue reading</button>
				<button type="button" class="submit" onclick={() => goto('/')}>Log in to post</button>
			</div>
		</section>
		{/if}

		<section id="reviews-section" class="card reviews">
			<div class="section-head">
				<div>
					<p class="eyebrow">Feed</p>
					<h2>Most recent reviews</h2>
				</div>
			</div>

			{#if currentReviews.length === 0}
				<p class="hint">No reviews yet. Be the first to share your experience.</p>
			{:else}
				{#each currentReviews as item (item.id)}
					<article class="review">
						<header>
							<div>
								<h3>{item.title}</h3>
								<p class="meta">by {item.author} - {item.time}</p>
							</div>
							<div class="score">
								<span class="stars-inline">
									{STAR_FILLED.repeat(item.rating)}{STAR_EMPTY.repeat(5 - item.rating)}
								</span>
								<span class="rating-number">{item.rating}/5</span>
								{#if isOwnReview(item)}
									<button
										type="button"
										class="ghost"
										aria-label="Edit your review"
										onclick={() => startEdit(item)}
									>
										Edit
									</button>
									<button
										type="button"
										class="delete"
										aria-label="Delete your review"
										onclick={() => deleteReview(item.id)}
									>
										Delete
									</button>
								{/if}
							</div>
						</header>
						<p class="body">{item.body}</p>
						<div class="tags">
							<span>{item.status.availability}</span>
							<span>{item.status.condition}</span>

							{#if Array.isArray(item.status.accessibility)}
								{#each item.status.accessibility as tag}
									<span>{tag}</span>
								{/each}
							{:else}
								<span>{item.status.accessibility}</span>
							{/if}
						</div>
					</article>
				{/each}
			{/if}
		</section>
	</div>

	<!-- Removed duplicate auth-note: guests see the prominent guest-banner above the form -->
</section>

<style>
	:global(body) {
		font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		background: #f6f7fb;
		color: #1e1e1e;
	}

	.page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 24px 18px 56px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.hero {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(135deg, #4f378b, #7c66c2);
		color: white;
		border-radius: 18px;
		padding: 18px 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 11px;
		color: inherit;
		margin: 0 0 6px 0;
		font-weight: 700;
	}

	h1 {
		margin: 0;
		font-size: 28px;
	}

	.lede {
		margin: 6px 0 0;
		color: rgba(255, 255, 255, 0.85);
	}

	.pill {
		border: 1px solid rgba(255, 255, 255, 0.5);
		padding: 8px 14px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 13px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 14px;
	}

	.card {
		background: white;
		border-radius: 14px;
		padding: 16px;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.section-head h2 {
		margin: 2px 0 2px;
		font-size: 20px;
	}

	.hint {
		color: #5f5f6b;
		margin: 2px 0 0;
		font-size: 14px;
	}

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.chip-row button {
		border: 1px solid #d6d6de;
		background: #f2f2f7;
		padding: 10px 14px;
		border-radius: 10px;
		font-weight: 600;
		color: #1e1e1e;
		transition: all 0.15s ease;
	}

	.chip-row button.selected {
		background: #4f378b;
		border-color: #4f378b;
		color: white;
		box-shadow: 0 6px 14px rgba(79, 55, 139, 0.25);
	}

	.stars {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.stars button {
		background: transparent;
		border: none;
		font-size: 26px;
		color: #c8c8d6;
		cursor: pointer;
		transition:
			transform 0.1s ease,
			color 0.2s ease;
	}

	.stars button.selected {
		color: #f7b500;
		transform: translateY(-2px);
	}

	.rating-label {
		font-weight: 600;
		color: #414157;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-weight: 600;
		color: #2c2c35;
	}

	input,
	textarea {
		border: 1px solid #d6d6de;
		border-radius: 10px;
		padding: 10px 12px;
		font-size: 15px;
		background: #fafbff;
	}

	input:focus,
	textarea:focus {
		outline: 2px solid #c9b8ff;
		border-color: #4f378b;
	}

	textarea {
		resize: vertical;
		min-height: 90px;
	}

	.helper {
		color: #c03221;
		margin: 0;
		font-weight: 600;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.submit {
		align-self: flex-start;
		background: linear-gradient(135deg, #4f378b, #654cb5);
		color: white;
		border: none;
		padding: 12px 18px;
		border-radius: 12px;
		font-weight: 700;
		cursor: pointer;
		box-shadow: 0 10px 18px rgba(79, 55, 139, 0.3);
		transition:
			transform 0.1s ease,
			box-shadow 0.15s ease;
	}

	.submit:hover {
		transform: translateY(-1px);
		box-shadow: 0 12px 20px rgba(79, 55, 139, 0.36);
	}

	.ghost,
	.delete {
		background: transparent;
		border: 1px solid #d6d6de;
		color: #4f378b;
		padding: 8px 12px;
		border-radius: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	.delete {
		color: #c03221;
		border-color: #e7c9c5;
	}

	.reviews {
		gap: 10px;
	}

	.review {
		border: 1px solid #ececf4;
		border-radius: 12px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.review header {
		display: flex;
		justify-content: space-between;
		gap: 8px;
	}

	.review h3 {
		margin: 0;
		font-size: 17px;
	}

	.meta {
		margin: 3px 0 0;
		color: #5f5f6b;
		font-size: 13px;
	}

	.score {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.stars-inline {
		color: #f7b500;
		font-size: 16px;
		letter-spacing: 1px;
	}

	.rating-number {
		color: #414157;
		font-weight: 700;
	}

	.body {
		margin: 0;
		color: #2c2c35;
		line-height: 1.45;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tags span {
		background: #f2f2f7;
		color: #262633;
		padding: 6px 10px;
		border-radius: 999px;
		font-weight: 600;
		font-size: 13px;
		border: 1px solid #e2e2ec;
	}

	.location-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.favorite {
		background: transparent;
		border: 1px solid #d6d6de;
		color: #4f378b;
		padding: 8px 10px;
		border-radius: 10px;
		font-weight: 800;
		font-size: 16px;
		cursor: pointer;
		transition: background 0.15s ease, color 0.15s ease, transform 0.08s ease;
	}

	.favorite:hover {
		transform: translateY(-1px);
	}

	.favorite[aria-pressed="true"] {
		background: #4f378b;
		color: white;
		border-color: #4f378b;
	}

	@media (max-width: 640px) {
		.hero {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}

		.review header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
