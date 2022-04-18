<script lang='ts'>
    import { removePopup } from '$lib/stores/popUpStore'

    export let props: {
        message?: string;
        choice1?: string;
        choice2?: string;
        choice1F: Function;
        choice2F?: Function;};

    const defaultProps = {
        message: 'Potvrdit změnu?',
        choice1: 'Potvrdit',
        choice2: 'Zrušit',
        choice2F: () => removePopup()};

    props = {...defaultProps,...props};

</script>

<div class="border p-6 rounded bg-white border-frame-border">
    <div class="text-center text-xl">{@html props.message}</div>
    <div class="mt-6 max-w-fit m-auto">
        <button on:click={props.choice1F} class="h-[2.625rem] w-20 mr-2 border rounded-full hover:bg-hover-field">{props.choice1}</button>
        <button on:click={props.choice2F} class="h-[2.625rem] w-20 border rounded-full hover:bg-hover-field">{props.choice2}</button>
    </div>
</div>