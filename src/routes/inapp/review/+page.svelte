<script>
	import { userInfo } from '$lib/userInfoStore';

	$effect(() => {
		if (userInfo.getEmail() == '') {
			location.href = '/';
		}
	});
</script>

<h1>Review Page</h1>

{#if userInfo.getEmail() === 'test@mail.com'}
	<h2>You need to be signed in in order to review</h2>
	<a href="/">Log in here</a>
	<h3>Want an Account?</h3>
	<a href="signup">Sign up here</a>
{/if}
