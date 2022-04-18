<script lang='ts'>
    import Xmark from "$lib/icons/xmark.svelte";
    import Select from "$lib/components/select.svelte";
    import { createEventDispatcher } from "svelte";
    import { doc, updateDoc, deleteDoc } from "firebase/firestore";
    import { firestore } from "$lib/utils/firebase";
    import { authStore } from '$lib/stores/authStore';

    export let userDoc: {roles: any; name: any; uid: string;};

    const dispatch = createEventDispatcher();

    let roles:any;
    let role: String;
 
    roles = userDoc.roles;
    if (roles.adminplus) role = 'admin+';
    else if (roles.admin) role = 'admin';
    else if (roles.write) role = 'zápis/čtení';
    else role = 'čtení';


    const options = ['admin', 'zápis/čtení', 'čtení'];

    const remove = e => {
        const execute = async () => {
            await deleteDoc(doc(firestore, 'users', userDoc.uid));
            dispatch('remove', userDoc);
        }
        dispatch('remove?', execute);
    }

    const update = async (e) => {
        const docRef = doc(firestore, "users", userDoc.uid); 
        
        let properties;
        if (e.detail === 'admin') {
            properties = {'admin': true, 'write': true};
        } else if (e.detail === 'zápis/čtení') {
            properties = {'write': true};
        } else {
            properties = {}
        }
        userDoc['roles'] = properties;
        
        await updateDoc(docRef, {'roles': properties});
    }

</script>

<div class="basis-[65%]">{userDoc.name}</div>
<div class='basis-[30%]'>
    <div>
        {#if role === 'admin+'}
            <div class="pl-10">admin+</div>
        {:else if userDoc.name === $authStore.name}
            <div class="pl-10">{role}</div>
        {:else}
            <Select {options} bind:choosed={role} on:valueChanged={update} buttonCSS={'h-10'}/>
        {/if}
    </div>
</div>
<div class='basis-[5%] ml-auto'>
    {#if (role != "admin+" && userDoc.name != $authStore.name)}
        <div class="ml-auto w-4 h-4 hover:cursor-pointer" on:click={remove}><Xmark /></div>
    {/if}
</div>
