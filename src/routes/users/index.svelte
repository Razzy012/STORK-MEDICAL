<script lang="ts">
    import { firestore } from '$lib/utils/firebase';
    import { collection, getDocs } from "firebase/firestore";
    import User from '$lib/components/user.svelte'
    import ConfirmAction_Form from '$lib/components/confirmAction_Form.svelte';
    import NewUser_Form from '$lib/components/newUser_Form.svelte'
    import Button from '$lib/components/Button.svelte'

    let usersDocs: {roles: any; name: any; uid: string;}[] = [];

    let newUserFormHTML: HTMLDivElement;
    let confirmFormHTML: HTMLDivElement;

    (async () => {
        let usersDocsx
        try {
            usersDocsx = await getDocs(collection(firestore, "users")).then(v => v.docs);
            usersDocsx.forEach(doc => {
            usersDocs = [...usersDocs, {'roles': doc.data().roles, 'name': doc.data().name, 'uid': doc.id}]
            })
        } catch (e){}
    })();

    let action: Function;
    let message: String;

    const removeUser = e => {
        usersDocs = usersDocs.filter(v => v.uid != e.detail.uid);
    }

    const displayNewUser = e => {
        newUserFormHTML.classList.remove('invisible', 'pointer-events-none');
    }

    const hideNewUser = e => {
        newUserFormHTML.classList.add('invisible', 'pointer-events-none');
    }

    const displayActionConfirm = e => {
        confirmFormHTML.classList.remove('hidden');
        action = e.detail;
        message = 'Přejete si odstranit uživatele?';
    }

    const hideActionConfirm = e => {
        confirmFormHTML.classList.add('hidden');
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
    <div class="mt-3 bg-white border rounded w-[40rem] pl-6 pr-6 border-frame-border">
        <table class="w-full">
            <tr>
                <th class="w-[24rem] text-left">Uživatel</th>
                <th class="w-[148px] text-left pl-10">Role</th>
                <th></th>
            </tr>
            {#each usersDocs as userDoc, i (userDoc)}
                <User bind:userDoc={usersDocs[i]} on:remove?={displayActionConfirm} on:remove={removeUser}/>
            {/each}
        </table>
    </div>
</div>

<div bind:this={newUserFormHTML} class='absolute top-0 left-0 bg-black bg-opacity-20 h-screen w-screen flex invisible pointer-events-none place-items-center justify-center'>
    <NewUser_Form bind:usersDocs on:hide={hideNewUser} />
</div>

<div bind:this={confirmFormHTML} class='flex absolute top-0 left-0 bg-black bg-opacity-20 h-screen w-screen hidden place-items-center justify-center'>
    <ConfirmAction_Form {action} {message} on:hide={hideActionConfirm} />
</div>

<style>
    tr {
        border-bottom: solid 1px #d8d8d8;
        height: 4.6875rem;
    }
    
    tr:nth-child(1) {
        height: 2.625rem;
    }

    tr:last-child {
        border-bottom: none;
    }
</style>