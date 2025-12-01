<script>
	import { userInfo } from '$lib/userInfoStore.js';
</script>

<div><h2><a href="/login">Already have an Account?</a></h2></div>
<div>
	<h1>Sign up</h1>
	<form
		onsubmit={(e) => {
			e.preventDefault();

			let formData = new FormData(e.target);
			let formObject = Object.fromEntries(formData.entries());

			userInfo.setEmail(formObject.email);

			location.href = '/inapp/profile';
		}}
	>
		<label for="name">Full Name</label>
		<input name="name" type="text" />

		<label for="email">Email</label>
		<input type="email" name="email" placeholder="toiletdestroyer123@gmail.com" />

		<label for="location">Location</label>
		<select name="location">
			<option value="Calgary">Calgary</option>
		</select>

		<label for="accessibility">Accessibilty Needs</label>
		<select name="accessibility">
			<option value="" disabled selected>Please select an option</option>
			<option value="Yes">Yes</option>
			<option value="No">No</option>
		</select>
		<span>
			<input type="checkbox" name="terms" />
			Accept Our terms
			<a href="https://youtu.be/dQw4w9WgXcQ?si=qhEw1V2XyojYuqNH">Read our T&C's</a>
		</span>

		<button type="submit">Register</button>
	</form>
</div>

<style>
	button {
		background-color: grey;
		color: white;
		border: none;
		border-radius: 1svb;
		padding: 1svb;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	a {
		color: grey;
	}
</style>
