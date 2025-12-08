// import { writable } from "svelte/store";

// const defaultData = {
//     username: "Jenna",
//     reviewsCount: 23,
//     favoritesCount: 5,
//     visitsCount: 142,
//     status: "Helper",

//     favorites: [
//         {
//             id: 1,
//             name: "Calgary Central Library",
//             address: "800 3 St SE",
//             rating: 4.8,
//             updated: "2 days ago"
//         },
//         {
//             id: 2,
//             name: "Core Shopping Centre",
//             address: "324 8 Ave SW",
//             rating: 4.2,
//             updated: "1 week ago"
//         },
//         {
//             id: 3,
//             name: "Bow Valley College",
//             address: "345 6 Ave SE",
//             rating: 4.0,
//             updated: "2 weeks ago"
//         }
//     ],

//     recentReviews: [
//         {
//             id: 1,
//             location: "Calgary Central Library",
//             stars: 5,
//             comment: "Excellent facilities, very clean and well-maintained.",
//             time: "3 days ago"
//         }
//     ]
// };

// function createProfileStore() {
//     const { subscribe, set, update } = writable(defaultData);

//     return {
//         subscribe,
        
//         // Get status based on review count
//         getStatus: (reviewCount) => {
//             if (reviewCount >= 50) return { name: 'Expert', color: 'bg-purple-500' };
//             if (reviewCount >= 30) return { name: 'Pro', color: 'bg-blue-500' };
//             if (reviewCount >= 20) return { name: 'Helper', color: 'bg-yellow-500' };
//             if (reviewCount >= 10) return { name: 'Rookie', color: 'bg-green-500' };
//             return { name: 'Newbie', color: 'bg-gray-500' };
//         },

//         // Update a review
//         updateReview: (reviewId, newComment, newStars) => {
//             update(store => ({
//                 ...store,
//                 recentReviews: store.recentReviews.map(review =>
//                     review.id === reviewId
//                         ? { ...review, comment: newComment, stars: newStars }
//                         : review
//                 )
//             }));
//         },

//         // Delete a review
//         deleteReview: (reviewId) => {
//             update(store => ({
//                 ...store,
//                 recentReviews: store.recentReviews.filter(review => review.id !== reviewId),
//                 reviewsCount: Math.max(0, store.reviewsCount - 1)
//             }));
//         },

//         // Remove a favorite
//         removeFavorite: (favoriteId) => {
//             update(store => ({
//                 ...store,
//                 favorites: store.favorites.filter(fav => fav.id !== favoriteId),
//                 favoritesCount: Math.max(0, store.favoritesCount - 1)
//             }));
//         },

//         // Add a review
//         addReview: (review) => {
//             update(store => ({
//                 ...store,
//                 recentReviews: [
//                     { id: Date.now(), ...review, time: "Just now" },
//                     ...store.recentReviews
//                 ],
//                 reviewsCount: store.reviewsCount + 1
//             }));
//         },

//         // Add a favorite
//         addFavorite: (favorite) => {
//             update(store => ({
//                 ...store,
//                 favorites: [
//                     { id: Date.now(), ...favorite, updated: "Just now" },
//                     ...store.favorites
//                 ],
//                 favoritesCount: store.favoritesCount + 1
//             }));
//         }
//     };
// }

// export const profileStore = createProfileStore();

// src/lib/profileStore.js
import { writable } from "svelte/store";

const defaultData = {
    username: "Jenna",

    favorites: [
        {
            id: 1,
            name: "Calgary Central Library",
            address: "800 3 St SE",
            rating: 4.8,
            updated: "2 days ago"
        },
        {
            id: 2,
            name: "Core Shopping Centre",
            address: "324 8 Ave SW",
            rating: 4.2,
            updated: "1 week ago"
        },
        {
            id: 3,
            name: "Bow Valley College",
            address: "345 6 Ave SE",
            rating: 4.0,
            updated: "2 weeks ago"
        }
    ],

    recentReviews: [
        {
            id: 1,
            location: "Calgary Central Library",
            stars: 5,
            comment: "Excellent facilities, very clean and well-maintained.",
            time: "3 days ago"
        }
    ]
};

function createProfileStore() {
    const STORAGE_KEY = 'profileStore';

    // initialize from localStorage when available
    let initial = defaultData;
    if (typeof window !== 'undefined') {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                // merge with defaults to avoid missing keys
                initial = { ...defaultData, ...parsed };
            }
        } catch (e) {
            // ignore parse errors
        }
    }

    const store = writable(initial);

    // persist updates to localStorage
    if (typeof window !== 'undefined') {
        store.subscribe((value) => {
            try {
                // persist only the minimal parts we care about
                const toPersist = {
                    username: value.username,
                    favorites: value.favorites,
                    recentReviews: value.recentReviews
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
            } catch (e) {
                // ignore quota errors
            }
        });
    }

    const { subscribe, set, update } = store;

    return {
        subscribe,
        
        // Get computed stats
        getStats: (data) => {
            const reviewsCount = data.recentReviews.length;
            const favoritesCount = data.favorites.length;
            
            // Count unique locations from favorites and reviews
            const uniqueLocations = new Set();
            data.favorites.forEach(fav => uniqueLocations.add(fav.name));
            data.recentReviews.forEach(review => uniqueLocations.add(review.location));
            const visitsCount = uniqueLocations.size;

            return {
                reviewsCount,
                favoritesCount,
                visitsCount
            };
        },
        
        // Get status based on review count
        getStatus: (reviewCount) => {
            if (reviewCount >= 50) return { name: 'Expert', color: 'bg-purple-500' };
            if (reviewCount >= 30) return { name: 'Pro', color: 'bg-blue-500' };
            if (reviewCount >= 20) return { name: 'Helper', color: 'bg-yellow-500' };
            if (reviewCount >= 10) return { name: 'Rookie', color: 'bg-green-500' };
            return { name: 'Newbie', color: 'bg-gray-500' };
        },

        // Update a review
        updateReview: (reviewId, newComment, newStars) => {
            update(store => ({
                ...store,
                recentReviews: store.recentReviews.map(review =>
                    review.id === reviewId
                        ? { ...review, comment: newComment, stars: newStars }
                        : review
                )
            }));
        },

        // Delete a review
        deleteReview: (reviewId) => {
            update(store => ({
                ...store,
                recentReviews: store.recentReviews.filter(review => review.id !== reviewId),
                reviewsCount: Math.max(0, store.reviewsCount - 1)
            }));
        },

        // Remove a favorite
        removeFavorite: (favoriteId) => {
            update(store => ({
                ...store,
                favorites: store.favorites.filter(fav => fav.id !== favoriteId),
                favoritesCount: Math.max(0, store.favoritesCount - 1)
            }));
        },

        // Add a review
        addReview: (review) => {
            update(store => ({
                ...store,
                recentReviews: [
                    { id: Date.now(), ...review, time: "Just now" },
                    ...store.recentReviews
                ]
            }));
        },

        // Add a favorite
        addFavorite: (favorite) => {
            update(store => ({
                ...store,
                favorites: [
                    { id: Date.now(), ...favorite, updated: "Just now" },
                    ...store.favorites
                ]
            }));
        }
    };
}

export const profileStore = createProfileStore();