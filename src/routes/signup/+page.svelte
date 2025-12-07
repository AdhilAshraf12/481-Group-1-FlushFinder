<script>
	import { userInfo } from '$lib/userInfoStore.js';

	const signup = (e) => {
		e.preventDefault();

		let formData = new FormData(e.target);
		let formObject = Object.fromEntries(formData.entries());

		userInfo.setEmail(formObject.email);

		location.href = '/inapp/profile';
	};
</script>

<div><div><a href="/" class="selected">Sign in</a> <a href="/signup">Register</a></div></div>
<div><img src="/FlushFinder.png" alt="rgw" /></div>

<form onsubmit={(e) => signup(e)}>
	<h1>Sign up</h1>
	<label for="name">Full Name</label>
	<input name="name" type="text" placeholder="First Last" required />

	<label for="email">Email</label>
	<input type="email" name="email" placeholder="toiletdestroyer123@gmail.com" required />

	<!-- <label for="location">Location</label>
	<select name="location" required>
		<option value="Calgary">Calgary</option>
	</select>

	<label for="accessibility">Accessibilty Needs</label>
	<select name="accessibility" required>
		<option value="" disabled selected>Please select an option</option>
		<option value="Yes">Yes</option>
		<option value="No">No</option>
	</select> -->
	<span>
		<input type="checkbox" name="terms" required />
		<p>
			I accept the terms
			<a href="https://youtu.be/dQw4w9WgXcQ?si=qhEw1V2XyojYuqNH"><u>Read our T&C's</u></a>
		</p>
	</span>

	<button type="submit">Register</button>
</form>

<style>
	img {
		margin: 0svh auto;
	}

	button {
		background-color: #2c2c2c;
		border: none;
		border-radius: 1rem;
		color: #f5f5f5;
		padding: 2svb;
		margin: 2svh 0svw;
	}
	form {
		border-radius: 1rem;
		border: 1px solid #d9d9d9;
		padding: 4svh 4svw;
		margin: 0svh 4svw;

		display: flex;
		flex-direction: column;
		row-gap: 2svh;
		column-gap: 2svh;
	}

	input,
	select,
	option {
		border-radius: 0.5rem;
		border: 1px solid #d9d9d9;
		padding: 1svh 1.5svw;
	}

	a {
		color: #757575;
	}
	span {
		display: flex;
		align-items: flex-start;
		padding: 2svh 0svw;
		column-gap: 1svw;
	}

	span p {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin: 0px;
	}

	div {
		display: flex;
		justify-content: right;
	}

	div > div {
		text-decoration: none;
		column-gap: 1svw;
		/* background-color: #3f3d3d; */
		background: #797fd2;
		border-radius: 100px;
		margin: 4svh 2svw;
	}
	div > a {
		text-decoration: none;
		padding: 1svb 1.5svw;
		border-radius: 1rem;
		color: white;
	}

	.selected {
		/* background-color: #797fd2; */
		color: white;

		background: #3f3d3d;
		border-radius: 100px;
	}
</style>
