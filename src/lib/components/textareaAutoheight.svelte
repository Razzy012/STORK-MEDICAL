<script lang="ts">
	import { onMount } from "svelte";

	export let css = '';
	export let value = '';
	export let error = false;

	let minClientHeight: number;
	let textarea: HTMLTextAreaElement;

	onMount(() => {
		textarea.style.height = textarea.offsetHeight + 'px';
		minClientHeight = parseInt(textarea.style.height, 10);
	})

	const autoGrow = e => {
		textarea.style.height = minClientHeight + 'px';
		if (minClientHeight < textarea.scrollHeight) {
			textarea.style.height = `calc(${textarea.scrollHeight}px + 2px)`;
		}
    }
	</script>

<textarea bind:this={textarea} bind:value on:input={autoGrow} class={`overflow-hidden w-full ${css}`} class:error wrap="soft" rows="1"></textarea>

<style>
	.error {
        box-shadow: inset 0px 0px 0px 2px red;
        border-color: white;
    }

	.error:hover {
        border-color: red;
    }
</style>