<div><div><a href="/">Sign in</a> <a href="/signup">Register</a></div></div>
<div><img src="/FlushFinder.png" alt="rgw" /></div>

<form onsubmit={(e) => e.preventDefault()}>
	<h2>Please enter the email associated with your FlushFinder Account</h2>
	<label for="email">Email</label>
	<input type="email" placeholder="Your Email" required />
	<div><a href="/">Cancel</a> <button type="submit">Reset Password</button></div>
</form>

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

	form div {
		justify-content: space-evenly;
		align-items: center;
		text-align: center;
	}

	form > div > a {
		padding: 0px;
	}

	div > div {
		text-decoration: none;
		column-gap: 1svw;
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
</style>
