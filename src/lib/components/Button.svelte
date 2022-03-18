<script>
    export let onclick;

    export let width = '';
</script>

<button on:click={onclick} class="h-[2.625rem] pl-3 pr-3 border rounded-full transition ease-in-out bg-white border-frame-border hover:border-hover-frame-border hover:bg-hover-field" style="{width ? `width: ${width}`: 'width: fit-content'}"><slot></slot></button>

<style>

</style>
