<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	export let height = '40px';
	export let word1 = 'Ne';
	export let gap = '20px';
	export let word2 = 'Ano';
	export let checked = false;

	let inputId = 'input_' + counter++;
	let input: HTMLInputElement;
	let word1Width: Number;
	let word2Width: Number;

	const click = () => {
		input.blur();
	}
</script>

<div class="max-w-max">
	<label for={inputId}>
		<input type="checkbox" id={inputId} on:change={click} bind:this={input} class="absolute -left-[9000px] opacity-0 w-0 h-0 peer" bind:checked/>
		<div
			class="relative flex bg-hover-field box-content max-w-max cursor-pointer rounded-full border border-frame-border hover:border-hover-frame-border peer-focus:border-black peer-focus:before:border-black
		        before:content-[''] before:absolute before:bg-white before:border before:rounded-full before:-top-[1px] before:-left-[1px] before:border-frame-border before:w-[calc(var(--word1Width)+16px)] before:h-[calc(var(--containerHeight)+2px)] before:transition-[transform,width] before:ease-in-out before:duration-500 peer-checked:before:translate-x-[calc(var(--word1Width)+var(--gap)/2-3px)] peer-checked:before:w-[calc(12px+var(--word2Width)+2px+0.5px)] hover:before:border-hover-frame-border"
			style="height: {height}; gap: {gap}; --word1Width: {word1Width + 'px'}; --gap: {gap}; --word2Width: {word2Width + 'px'}; --containerHeight: {height}"
		>
			<div bind:clientWidth={word1Width} class="pl-3 bg-transparent selection:bg-transparent">
				<div class="grid items-center h-full">{word1}</div>
			</div>
			<div bind:clientWidth={word2Width} class="pr-3 bg-transparent selection:bg-transparent">
				<div class="grid items-center h-full">{word2}</div>
			</div>
		</div>
	</label>
</div>
