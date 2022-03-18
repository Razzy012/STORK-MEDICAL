<script lang='ts'>
    import {createEventDispatcher} from 'svelte';

    export let action: Function;
    export let message: String;

    const dispatch = createEventDispatcher();

    const confirmed = e => {
        action();
        dispatch('hide');
    }


</script>

<div class="border p-6 rounded bg-white">
    <div class="text-center text-xl">{message}</div>
    <div class="mt-6 max-w-fit m-auto">
        <button on:click={confirmed} class="h-[2.625rem] w-20 mr-2 border rounded-full hover:bg-hover-field">Potvrdit</button>
        <button on:click={() => dispatch('hide')} class="h-[2.625rem] w-20 border rounded-full hover:bg-hover-field">Zrušit</button>
    </div>
</div>