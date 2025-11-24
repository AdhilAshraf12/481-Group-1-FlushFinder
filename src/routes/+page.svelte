<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<a href="/inapp/find">to find</a>
<div>
	<h1>Sign up</h1>
	<form action="">
		<label for="name">Full Name</label>
		<input name="name" type="text" />

		<label for="email">Email</label>
		<input type="email" name="email" value="toiletdestroyer123@gmail.com" />

		<label for="location">Location</label>
		<select name="location">
			<option value="Calgary">Calgary</option>
		</select>

		<label for="accessibility">Accessibilty Needs</label>
		<select name="accessibility">
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
