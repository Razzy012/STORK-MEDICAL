<script lang='ts'>
    import { getAuth } from "firebase/auth";
    import Button from '$lib/components/Button.svelte'
    import ChangePasswordForm from "$lib/components/changePassword_Form.svelte";

    const user = getAuth().currentUser;
    const name = user.email;

    let changePasswordHTML: HTMLDivElement;

    const showChangePasswordForm = () => {
        changePasswordHTML.classList.remove('hidden');
    }
    const hideChangePasswordForm = () => {
        changePasswordHTML.classList.add('hidden');
    }

</script>

<svelte:head> <title>Profil</title> </svelte:head>

<div class=" flex place-items-center justify-center flex-col">
    <div class="w-[40rem] mt-10 flex justify-between place-items-end">
        <h1 class="inline-block pb-[1.125rem] text-2xl text-left">Profil</h1>
    </div>
    <div class="flex place-items-center justify-between mt-3 bg-white border rounded w-[40rem] pl-6 pr-6 border-frame-border">
        <div class="inline-block">Přihlášen: {name}</div>
        <div class="p-1 pr-0 inline-block "><Button onclick={showChangePasswordForm}>Změnit heslo</Button></div>
    </div>
    <div bind:this={changePasswordHTML} class='flex place-items-center absolute top-0 left-0 bg-black bg-opacity-20 h-screen w-screen hidden justify-center'>
        <ChangePasswordForm on:hide={hideChangePasswordForm}/>
    </div>
</div>