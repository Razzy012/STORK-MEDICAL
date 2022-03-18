<script>
    import Select from "$lib/components/select.svelte";
    import { firestore } from '$lib/utils/firebase';
    import { initializeApp } from "firebase/app";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { doc, setDoc } from "firebase/firestore"; 
    import {createEventDispatcher} from 'svelte';
    import Button from '$lib/components/Button.svelte'

    export let usersDocs = [];

    const dispatch = createEventDispatcher();

    let e_email = false;
    let e_password = false;
    let e_min = false;

    const options = ['admin', 'zápis/čtení', 'čtení'];
    let choosed = options[0];

    const submit = e => {
        if (e.keyCode === 13) create(e);
    }

    const create = e => {
        const inputs = e.target.closest('[data-newUser]').querySelectorAll('[data-input]');
        e_email = false;
        e_password = false;
        e_min = false;
        if (inputs[1].value.trim() === inputs[2].value.trim()) {
            const email = inputs[0].value.trim();
            const password = inputs[1].value.trim();

            let roles;

            if (choosed == 'zápis/čtení') {
                roles = {'write': true};
            } else if (choosed == 'admin') {
                roles = {'admin': true, 'write': true};
            } else {
                roles = {};
            }

            const firebaseConfig = {
                apiKey: "AIzaSyCnhLFTxV5p7Y84AR3nB_X8aIGaA3qY2XM",
                authDomain: "stork-medical-e715c.firebaseapp.com",
                projectId: "stork-medical-e715c",
                storageBucket: "stork-medical-e715c.appspot.com",
                messagingSenderId: "253073097203",
                appId: "1:253073097203:web:a8125ff8772004a5341286"
                };
            var secondaryApp = initializeApp(firebaseConfig, "Secondary");

            const auth = getAuth(secondaryApp)
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user  = userCredential.user;
                    await setDoc(doc(firestore, "users", user.uid), {
                        'name': email,
                        'roles': roles,
                        });
                    usersDocs = [...usersDocs, {'roles': roles, 'name': email, 'uid': user.uid}];
                    reset(e);
                })
                .catch((e) => {
                    if (e.code === 'auth/invalid-email' || e.code === 'auth/internal-error' || e.code === 'auth/missing-email') {
                        e_email = true;
                    } else if (e.code === 'auth/weak-password') {
                        e_password = true;
                        e_min = true;
                    }
                });
        } else {
            e_password = true;
        }
    }

    const reset = e => {
        const inputs = e.target.closest('[data-newUser]').querySelectorAll('[data-input]');
        inputs.forEach(input => {
            input.value = '';
        });
        choosed = options[0];
        e_email = false;
        e_password = false;
        dispatch('hide');
    }

</script>

<div data-newUser class="border p-6 rounded bg-white border-frame-border">
    <div class="text-center text-2xl">Vytvořit uživatele</div>
    <label for="email" class="block mt-4">Email</label>
    <input data-input on:keyup={submit} type="email" name="email" id="email" class="pl-3 h-[2.625rem] rounded-full w-full" class:e_email><br>
    <div class="relative">
        <label for="password" class="block mt-2">Heslo</label>
        <div class="absolute top-[2.125rem] right-4 pointer-events-none text-sm text-red-600 hidden" class:e_min>Min. 6 znaků</div>
        <input data-input on:keyup={submit} type="password" name="password" id="password" class="pl-3 h-[2.625rem] rounded-full w-full" class:e_password><br>
    </div>
    <label for="password2" class="block mt-2">Heslo znovu</label>
    <input data-input on:keyup={submit} type="password" name="password2" id="password2" class="pl-3 h-[2.625rem] rounded-full w-full" class:e_password><br>
    <div class="m-auto mt-4 max-w-fit"><Select {options} bind:choosed={choosed}/></div>
    <div class="mt-7 m-auto max-w-fit">
        <div class="mr-1 inline-block"><Button onclick={create}>Vytvořit</Button></div><Button onclick={reset} width='85.25px'>Zrušit</Button>
    </div>
</div>

<style>
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

    .e_min {
        @apply block;
    }
</style>