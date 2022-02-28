<script>
	import '../app.css';
	import { app } from '$lib/utils/firebase';
	import { firestore } from '$lib/utils/firebase';
	import { getAuth, linkWithPhoneNumber, onAuthStateChanged } from "firebase/auth";
	import authStore from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env'
	import Nav from '$lib/components/nav.svelte'

	const auth = getAuth();
	onAuthStateChanged(auth, async (user) => {
	if (user) {
		authStore.set({isLoggedIn: true});
	} else {
		authStore.set({isLoggedIn: false});
		try{
			browser && await goto('/user/login');
		} catch(e) {
			console.log(e.message);
		}
	}
	});
</script>

<Nav />

<div class="mx-8">
	<slot />
</div>



