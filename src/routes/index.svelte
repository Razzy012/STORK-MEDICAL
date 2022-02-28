<script>
    import authStore from "$lib/stores/authStore";
    import { getAuth, signOut } from "firebase/auth";

    const logout = () => {
        const auth = getAuth();
        signOut(auth)
            .catch((e) => {
            console.log(e.message);
        });
    }
</script>

<h1>index</h1>
<button on:click="{logout}">logout</button>
