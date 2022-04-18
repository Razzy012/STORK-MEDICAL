<script lang='ts'>
    import { authStore } from '$lib/stores/authStore';
    import Button from '$lib/components/Button.svelte'
    import ChangePasswordForm from "$lib/components/changePassword_Form.svelte";
    import { setPopup, removePopup } from '$lib/stores/popUpStore'

    let name;
    $: name = $authStore.name ? $authStore.name : '';

    const showChangePasswordForm = () => {
        setPopup(ChangePasswordForm, {submitAction: () => removePopup()});
    }

</script>

<svelte:head> <title>Profil</title> </svelte:head>

<div class=" flex place-items-center justify-center flex-col">
    <div class="w-[40rem] mt-10 flex justify-between place-items-end">
        <h1 class="inline-block pb-[1.125rem] text-2xl text-left">Profil</h1>
    </div>
    <div class="flex place-items-center justify-between mt-3 bg-white border rounded w-[40rem] pl-6 pr-6 border-frame-border h-[4.6rem]">
        <div class="inline-block">Přihlášen: {name}</div>
        <div class="p-1 pr-0 inline-block "><Button onclick={showChangePasswordForm}>Změnit heslo</Button></div>
    </div>
</div>