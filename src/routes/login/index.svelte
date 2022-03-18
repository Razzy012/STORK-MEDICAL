<script lang="ts">
    import { goto } from "$app/navigation";
    import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
    import Button from '$lib/components/Button.svelte'
    import Stork from '$lib/icons/stork.svelte'

    let e_email = false;
    let e_password = false;
    let email: HTMLInputElement;
    let password: HTMLInputElement;

    const submit = e => {
        if (e.keyCode === 13) loginWithEmail();
    }

    const loginWithEmail = async () => {
        try {
            e_email = false;
            e_password = false;
            const auth = getAuth();
            setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim());
            await goto('../');
        } catch(e) {
            if (e.code === 'auth/invalid-email' || e.code === 'auth/user-not-found') {
                e_email = true;
            } else if (e.code === 'auth/wrong-password' || e.code === 'auth/internal-error') {
                e_password = true;
            } 
        }
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="h-screen flex place-items-center justify-center">
    <div class="relative border p-6 pb-4 rounded bg-white border-frame-border">
        <div class="absolute -top-20">
            <div class="ml-8 text-5xl stork text-red-600 flex place-items-center">
                <div class="inline-block w-20"><Stork /></div>
                <div>Stork</div>
            </div>
        </div>
        <div class="text-center text-2xl">Přihlášení</div>
        <label for="email" class="block mt-2">Email</label>
        <input on:keyup={submit} type="email" name="email" bind:this={email} class="pl-3 h-[2.625rem] rounded-full" class:e_email><br>
        <label for="password" class="block mt-2">Heslo</label>
        <input on:keyup={submit} type="password" name="password" bind:this={password} class="pl-3 h-[2.625rem] rounded-full" class:e_password><br>
        <div class="mt-4 max-w-fit m-auto"><Button onclick={loginWithEmail}>Login</Button></div>
    </div>
</div>

<style>
    .stork {
        font-family: 'Lobster Two', cursive;
    }

    .e_email {
        box-shadow: inset 0px 0px 0px 2px red;
        border-color: white;
    }

    .e_email:hover {
        border-color: red;
    } 

    .e_password {
        box-shadow: inset 0px 0px 0px 2px red;
        border-color: white;
    }

    .e_password:hover {
        border-color: red;
    } 

</style>
