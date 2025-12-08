// place files you want to import through the `$lib` alias in this folder.
import { derived, writable } from 'svelte/store';

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
		{	id: 2,
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
		{	id: 3,
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


export const sharedReviews = writable([...seedReviews]);

export const rating = derived(sharedReviews, $sharedReviews => {
    if ($sharedReviews.length === 0) return 0;
    let total = 0;
    for (const review of $sharedReviews) {
        total += review.rating;
    }
    return total / $sharedReviews.length;
});

export const currentcondition = derived(sharedReviews, ($sharedReviews) => {
    return $sharedReviews[0].status.availability;
});
