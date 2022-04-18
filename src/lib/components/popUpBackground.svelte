<script lang="ts">
    import { removePopup } from '$lib/stores/popUpStore'

    let bg: HTMLElement;

    const click = e => {
        if (e.target === bg)
            removePopup();
    }
</script>

<div bind:this={bg} on:click={click} class='z-50 flex absolute top-0 left-0 bg-black/20 h-screen w-screen items-center justify-center'>
    <slot></slot>
</div>