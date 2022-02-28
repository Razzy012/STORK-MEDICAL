<script>
    import { goto } from "$app/navigation";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

    let e_email = false;
    let e_password = false;

    const loginWithEmail = async () => {
        try {
            e_email = false;
            e_password = false;
            const auth = getAuth();
            let userCredential = await signInWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('password').value);
            console.log("yes");
            await goto('../');
        } catch(e) {
            console.log(e.message);
            if (e.code === 'auth/invalid-email' || e.code === 'auth/user-not-found') {
                e_email = true;
            } else if (e.code === 'auth/wrong-password' || e.code === 'auth/internal-error') {
                e_password = true;
            }
        }
    }
</script>

<div class="h-screen flex place-items-center justify-center">
    <div class="border p-6 pb-4 rounded-lg bg-white">
        <div class="text-center text-2xl">Přihlášení</div>
        <label for="email" class="block mt-2">Email</label>
        <input type="email" name="email" id="email" class="pl-3 h-9 rounded-full" class:e_email><br>
        <label for="password" class="block mt-2">Password</label>
        <input type="password" name="password" id="password" class="pl-3 h-9 rounded-full" class:e_password><br>
        <button on:click="{loginWithEmail}" class="mt-4 block m-auto h-9 w-16 border rounded-full hover:bg-hover-field">Login</button>
    </div>
</div>

<style>
    .e_email {
        @apply border-red-600 border-2;
    }

    .e_password {
        @apply border-red-600 border-2;
    }
</style>
