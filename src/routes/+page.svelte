<script>
	import { userInfo } from '$lib/userInfoStore.js';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<a href="/inapp/find">to find</a>
<form
	onsubmit={(e) => {
		e.preventDefault();

		let formData = new FormData(e.target);
		let formObject = Object.fromEntries(formData.entries());

		userInfo.setEmail(formObject.email);

		location.href = '/inapp/profile';
	}}
>
	<label for="email">Email</label>
	<input type="email" name="email" placeholder="name.last@gmail.com" />

	<label for="password">Password</label>
	<input type="password" name="password" placeholder="your password here" />

	<button type="submit">Sign in</button>

	<a href="https://youtu.be/dQw4w9WgXcQ?si=qhEw1V2XyojYuqNH">Forgot Password?</a>
</form>

<a
	href="/inapp/profile"
	onclick={() => {
		userInfo.setEmail('test@mail.com');
		userInfo.setGuestProfilePicture();
	}}>Continue as Guest</a
>

<style>
	form a {
		color: grey;
	}

	a {
		color: lightgrey;
	}
</style>
