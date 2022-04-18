<script lang='ts'>
    export let onclick;
    export let width = '';
    export let css = '';

    let button: HTMLButtonElement;

    const click = (e) => {
        button.blur();
        onclick(e);
    }
</script>

<button on:click={click} bind:this={button} class={`${css} h-[2.625rem] px-3 border rounded-full transition ease-in-out bg-white border-frame-border hover:border-hover-frame-border hover:bg-hover-field focus:border-black focus:bg-hover-field focus:outline-none`} style="{width ? `width: ${width}`: 'width: fit-content'}"><slot></slot></button>


