<script>
	import '../app.css';
	import '$lib/utils/firebase'
	import { doc, setDoc } from "firebase/firestore"; 
import { firestore } from '$lib/utils/firebase';

	const cityRef = doc(firestore, 'cities', 'BJ');
	setDoc(cityRef, { capital: true }, { merge: true });
</script>


<slot />
