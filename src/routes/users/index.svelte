<script lang="ts">
    import { firestore } from '$lib/utils/firebase';
    import { collection, getDocs } from "firebase/firestore";
    import User from '$lib/components/user.svelte';
    import ConfirmAction_Form from '$lib/components/confirmAction_Form.svelte';
    import NewUser_Form from '$lib/components/newUser_Form.svelte';
    import Button from '$lib/components/Button.svelte';
    import { setPopup, removePopup } from '$lib/stores/popUpStore';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';

    let usersDocs: {roles: any; name: any; uid: string;}[] = [];

    (async () => {
        let usersDocsx
        try {
            usersDocsx = await getDocs(collection(firestore, "users")).then(v => v.docs);
            usersDocsx.forEach(doc => {
            usersDocs = [...usersDocs, {'roles': doc.data().roles, 'name': doc.data().name, 'uid': doc.id}]
            })
        } catch (e){}
    })();

    const removeUser = e => {
        usersDocs = usersDocs.filter(v => v.uid != e.detail.uid);
    }

    const displayNewUser = e => {
        setPopup(NewUser_Form, {
            submitAction: (roles, name, uid) => {
                usersDocs = [...usersDocs, {'roles': roles, 'name': name, 'uid': uid}];
                removePopup();
            }
        });
    }

    const displayActionConfirm = e => {
        const action = () => {e.detail(), removePopup()};
        let message = 'Přejete si odstranit uživatele?';
        setPopup(ConfirmAction_Form, {message: message, choice1F: action});
    }

</script>

<svelte:head>
    <title>Uživatelé</title>
</svelte:head>

<div class=" flex place-items-center justify-center flex-col">
    <div class="w-[40rem] mt-10 flex justify-between place-items-end">
        <h1 class="inline-block pb-[1.125rem] text-2xl text-left">Uživatelé</h1>
        <Button onclick={displayNewUser}>Přidat uživatele</Button>
    </div>
    <div class="mt-3 bg-white border rounded w-[40rem] pl-6 pr-6 border-frame-border transition-all duration-200">
        <div class="flex flex-col w-full">
            <div class="h-[2.7rem] flex items-center">
                <div class="font-bold basis-[65%]">Uživatel</div>
                <div class="font-bold basis-[30%] pl-10">Role</div>
                <div class="basis-[5%]"></div>
            </div>
            {#each usersDocs as userDoc, i (userDoc)}
                <div animate:flip={{duration: 200}} transition:fade|local={{duration: 200}} class='h-[4.6rem] border-t border-frame-border flex items-center'>
                    <User bind:userDoc={usersDocs[i]} on:remove?={displayActionConfirm} on:remove={removeUser}/>
                </div>
            {/each}
        </div>
    </div>
</div>