<!-- src/routes/inapp/profile/+page.svelte -->
<script>
    import { profileStore } from "$lib/profileStore.js";
    import { userInfo } from "$lib/userInfoStore.js";
    import { onMount } from "svelte";

    let user;
    let isGuest = false;
    let showAllFavorites = false;
    
    // Edit modal state
    let showEditModal = false;
    let editingReview = null;
    let editComment = "";
    let editStars = 0;

    $: user = $profileStore;
    import { isGuest as _isGuest } from '$lib/userInfoStore';
    $: isGuest = _isGuest();
    $: displayedFavorites = showAllFavorites ? user.favorites : user.favorites.slice(0, 3);
    $: stats = profileStore.getStats(user);
    $: statusInfo = profileStore.getStatus(stats.reviewsCount);

    onMount(() => {
        // Check if user is logged in
        if (userInfo.getEmail() === '') {
            window.location.href = '/';
        }
    });

    function handleEditClick(review) {
        editingReview = review;
        editComment = review.comment;
        editStars = review.stars;
        showEditModal = true;
    }

    function handleSaveEdit() {
        if (editingReview) {
            profileStore.updateReview(editingReview.id, editComment, editStars);
            showEditModal = false;
            editingReview = null;
        }
    }

    function handleDeleteClick(reviewId) {
        if (confirm('Are you sure you want to delete this review?')) {
            profileStore.deleteReview(reviewId);
        }
    }

    function handleRemoveFavorite(favoriteId) {
        if (confirm('Remove this location from favorites?')) {
            profileStore.removeFavorite(favoriteId);
        }
    }

    function handleLogout() {
        if (confirm('Are you sure you want to log out?')) {
            userInfo.setEmail('');
            window.location.href = '/';
        }
    }
</script>

<div class="w-full max-w-md mx-auto px-4 bg-gray-50 min-h-screen">

    {#if isGuest}
        <!-- GUEST VIEW -->
        <div class="flex justify-between items-center pt-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Account</h1>
            <!-- <button 
                class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors" 
                on:click={handleLogout}
            >
                <svg class="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span class="text-gray-700">Logout</span>
            </button> -->
        </div>

        <section class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 text-center shadow-sm mb-6">
            <div class="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <h2 class="text-xl font-bold mb-2 text-gray-900">Guest Mode</h2>
            <p class="text-gray-600 text-sm mb-6">
                You're browsing as a guest. Create an account to unlock all features!
            </p>
        </section>

        <section class="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <h3 class="font-semibold text-lg mb-4 text-gray-900">Why Register?</h3>
            <ul class="space-y-3">
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <div>
                        <p class="text-sm text-gray-700">Save your favorite bathrooms</p>
                    </div>
                </li>
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <div>
                        <p class="text-sm text-gray-700">Write and share reviews</p>
                    </div>
                </li>
                <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#A855F7" stroke-width="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <div>
                        <p class="text-sm text-gray-700">Track your stats and earn status badges</p>
                    </div>
                </li>
            </ul>
        </section>

        <button 
            class="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors mb-3" 
            on:click={handleLogout}
        >
            Register / Sign In
        </button>

    {:else}
        <!-- REGISTERED USER VIEW -->
        <div class="flex justify-between items-center pt-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
            <button 
                class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors" 
                on:click={handleLogout}
            >
                <svg class="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span class="text-gray-700">Logout</span>
            </button>
        </div>

        <!-- STATS CARD -->
        <section class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-sm mb-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-semibold text-gray-800 text-base">FlushFinder Member</h2>
                <span class="text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 {statusInfo.color === 'bg-purple-500' ? 'bg-purple-500' : statusInfo.color === 'bg-blue-500' ? 'bg-blue-500' : statusInfo.color === 'bg-yellow-500' ? 'bg-yellow-500' : statusInfo.color === 'bg-green-500' ? 'bg-green-500' : 'bg-gray-500'}">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <span class="font-medium">{statusInfo.name}</span>
                </span>
            </div>

            <div class="flex justify-around">
                <div class="text-center">
                    <p class="text-3xl font-bold text-purple-700 mb-1">{stats.reviewsCount}</p>
                    <p class="text-sm text-gray-600">Reviews</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl font-bold text-purple-700 mb-1">{stats.favoritesCount}</p>
                    <p class="text-sm text-gray-600">Favorites</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl font-bold text-purple-700 mb-1">{stats.visitsCount}</p>
                    <p class="text-sm text-gray-600">Visits</p>
                </div>
            </div>
        </section>

        <!-- FAVORITE BATHROOMS -->
        <section class="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <div class="mb-4">
                <h3 class="font-semibold text-gray-900 text-base">Favorite Bathrooms</h3>
            </div>

            {#if user.favorites.length === 0}
                <p class="text-gray-500 text-center py-8 text-sm">No favorites yet</p>
            {:else}
                <div class="space-y-3">
                    {#each displayedFavorites as fav}
                        <div class="flex justify-between items-start pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div class="flex-1 min-w-0">
                                <h4 class="font-semibold text-gray-900 text-sm mb-1 truncate">{fav.name}</h4>
                                <div class="flex items-center gap-1 text-gray-500 mb-1">
                                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span class="text-xs">{fav.address}</span>
                                </div>
                                <p class="text-xs text-gray-400">{fav.updated}</p>
                            </div>
                            <div class="flex flex-col items-end gap-2 ml-3 flex-shrink-0">
                                <div class="flex items-center gap-2">
                                    <div class="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded">
                                        <svg class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <span class="text-sm font-semibold text-gray-900">{fav.rating}</span>
                                    </div>
                                    <button 
                                        class="text-red-500 hover:text-red-600 transition-all hover:scale-110 group"
                                        on:click={() => handleRemoveFavorite(fav.id)}
                                        aria-label="Remove from favorites"
                                        title="Remove from favorites"
                                    >
                                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                {#if user.favorites.length > 3}
                    <button 
                        class="w-full mt-4 py-2 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                        on:click={() => showAllFavorites = !showAllFavorites}
                    >
                        {showAllFavorites ? 'Show Less' : 'View All Favorites'}
                    </button>
                {/if}
            {/if}
        </section>

        <!-- RECENT REVIEWS -->
        <section class="bg-white rounded-2xl p-5 shadow-sm">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-900 text-base">Your Recent Reviews</h3>
            </div>

            {#if user.recentReviews.length === 0}
                <p class="text-gray-500 text-center py-8 text-sm">No reviews yet</p>
            {:else}
                <div class="space-y-4">
                    {#each user.recentReviews.slice(0, 5) as review}
                        <div class="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-semibold text-gray-900 text-sm">{review.location}</h4>
                                <div class="flex gap-2">
                                    <button 
                                        class="text-purple-600 hover:text-purple-700 transition-colors text-base"
                                        on:click={() => handleEditClick(review)}
                                        aria-label="Edit review"
                                    >
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button 
                                        class="text-red-600 hover:text-red-700 transition-colors text-base"
                                        on:click={() => handleDeleteClick(review.id)}
                                        aria-label="Delete review"
                                    >
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="flex gap-0.5 mb-2">
                                {#each [1, 2, 3, 4, 5] as star}
                                    <svg 
                                        class="w-4 h-4 {star <= review.stars ? 'text-yellow-500' : 'text-gray-300'}" 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                {/each}
                            </div>

                            <p class="text-sm text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                            <p class="text-xs text-gray-400">{review.time}</p>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>
    {/if}
</div>

<!-- EDIT REVIEW MODAL -->
{#if showEditModal}
    <div 
        class="fixed inset-0 bg-purple-100 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
        on:click={() => showEditModal = false}
        role="dialog"
        aria-modal="true"
    >
        <div 
            class="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl" 
            on:click={(e) => e.stopPropagation()}
        >
            <!-- Modal Header -->
            <div class="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 class="text-lg font-semibold text-gray-900">Edit Review</h3>
                <button 
                    class="text-2xl text-gray-400 hover:text-gray-600 leading-none w-8 h-8 flex items-center justify-center" 
                    on:click={() => showEditModal = false}
                    aria-label="Close modal"
                >
                    ×
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-4">
                <!-- Rating -->
                <div>
                    <label class="block font-medium mb-2 text-gray-900 text-sm">Rating</label>
                    <div class="flex gap-2">
                        {#each [1, 2, 3, 4, 5] as star}
                            <button 
                                type="button"
                                class="transition-transform hover:scale-110 focus:outline-none"
                                on:click={() => editStars = star}
                            >
                                <svg 
                                    class="w-8 h-8 {star <= editStars ? 'text-yellow-500' : 'text-gray-300'}" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Comment -->
                <div>
                    <label class="block font-medium mb-2 text-gray-900 text-sm">Review</label>
                    <textarea 
                        bind:value={editComment}
                        rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="Share your experience..."
                    ></textarea>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex gap-3 p-6 border-t border-gray-100">
                <button 
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                    on:click={() => showEditModal = false}
                >
                    Cancel
                </button>
                <button 
                    class="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
                    on:click={handleSaveEdit}
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}