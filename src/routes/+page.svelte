<script>
	import { userInfo } from '$lib/userInfoStore.js';

	const signIn = (e) => {
		e.preventDefault();

		let formData = new FormData(e.target);
		let formObject = Object.fromEntries(formData.entries());

		userInfo.setEmail(formObject.email);

		location.href = '/inapp/find';
	};
</script>

<div><div><a href="/" class="selected">Sign in</a> <a href="/signup">Register</a></div></div>
<div><img src="/FlushFinder.png" alt="rgw" /></div>
<form onsubmit={(e) => signIn(e)}>
	<label for="email">Email</label>
	<input type="email" name="email" placeholder="name.last@gmail.com" required />

	<label for="password">Password</label>
	<input type="password" name="password" placeholder="your password here" required />

	<button type="submit">Sign in</button>

	<!-- <a href="https://youtu.be/dQw4w9WgXcQ?si=qhEw1V2XyojYuqNH">Forgot Password?</a> -->
	<a href="/forgotpassword">Forgot Password?</a>
</form>
<div>
	<a
		href="/inapp/find"
		onclick={() => {
			userInfo.setEmail('test@mail.com');
			userInfo.setGuestProfilePicture();
		}}
	>
		Continue as Guest
	</a>
</div>

<style>
	img {
		margin: 0svh auto;
	}
	div > a {
		padding-top: 10svh;
		color: #7b7d94;
		text-decoration: none;
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
	}

	input {
		border-radius: 0.5rem;
		border: 1px solid #d9d9d9;
		padding: 1svh 1.5svw;
	}

	form a {
		color: #2c2c2c;
		margin: 0px;
		text-decoration: underline;
	}

	div {
		display: flex;
		justify-content: right;
	}

	div > div {
		text-decoration: none;
		column-gap: 1svw;
		/* background-color: #3f3d3d; */
		background: #3f3d3d;
		border-radius: 100px;
		margin: 4svh 2svw;
	}
	div > div > a {
		text-decoration: none;
		padding: 1svb 1.5svw;
		border-radius: 1rem;
		color: white;
	}

	.selected {
		/* background-color: #797fd2; */
		color: white;
		background: #797fd2;
		border-radius: 100px;
	}
</style>
