// src/lib/userInfo.js

const STORAGE_KEY = 'userInfo';

// Load from sessionStorage or default
function load() {
	const json = sessionStorage.getItem(STORAGE_KEY);
	return json
		? JSON.parse(json)
		: { email: '', userprofilePicture: 'https://picsum.photos/100/100' };
}

function save(info) {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(info));
}

export const userInfo = {
	getEmail() {
		return load().email;
	},
	setEmail(email) {
		const info = load();
		info.email = email;
		save(info);
	},
	getProfilePicture() {
		return load().userprofilePicture;
	},
	setGuestProfilePicture() {
		const info = load();
		info.userprofilePicture = 'https://picsum.photos/50/50';
		save(info);
	},
	getUsername() {
		const email = load().email;
		return email ? email.split('@')[0] : '';
	}
};
