<script>
	import { userInfo } from '$lib/userInfoStore.js';

	// if user is not logged in or using a guest account
	$effect(() => {
		if (userInfo.getEmail() == '') {
			location.href = '/';
		}
	});
</script>

<h1>Profile Page</h1>

<p>User Email: {userInfo.getEmail()}</p>

<a href="/" onclick={() => userInfo.setEmail('')}>Log Out</a>
