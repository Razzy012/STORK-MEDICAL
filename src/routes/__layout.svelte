<script>
	import '../app.css';
	import { app } from '$lib/utils/firebase';
	import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env'
	import Nav from '$lib/components/nav.svelte'
	import { firestore } from '$lib/utils/firebase'
    import { doc, getDoc } from "firebase/firestore";

	const auth = getAuth(app);
	onAuthStateChanged(auth, async (user) => {
	if (user) {
		let docSnap;
		try {
			docSnap = await getDoc(doc(firestore, "users", user.uid));
		} catch (e){
			const auth = getAuth();
			signOut(auth)
				.catch((e) => {
			});
		}
		let roles = {adminplus:false, admin:false, write:false};

		for (const [key, value] of Object.entries(docSnap.data().roles)) {
			roles[key] = value;
		}
		if(roles.adminplus === true) roles.admin = true;

		authStore.set({isLoggedIn: true, name: docSnap.data().name, roles:roles})
	} else {
		authStore.set({isLoggedIn: true, name: null, roles:{}});
		browser && await goto('/login')
	} 
	});
</script>

<Nav />

<div class="mx-8">
	<slot />
</div>



