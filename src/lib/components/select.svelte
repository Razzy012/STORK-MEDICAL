<script context='module' lang="ts">
	const documentClick = event => {
		const isButton = event.target.closest('[data-drop-down-button]') != null;
		if (!isButton && event.target.closest('[data-drop-down-menu]') != null) {
			event.target.closest('[data-drop-down-menu]').classList.add('hidden');
		}
		let currentDropdownMenu: HTMLUListElement;
		if (isButton) {
			currentDropdownMenu = event.target.closest('[data-drop-down]').querySelector('[data-drop-down-menu]');
			currentDropdownMenu.classList.toggle('hidden');
		}

		document.querySelectorAll('[data-drop-down-menu]').forEach(dropdownMenu => {
			if (dropdownMenu === currentDropdownMenu) return;
				dropdownMenu.classList.add('hidden');
				console.log('closing', dropdownMenu)
		})
	};
</script>

<script lang="ts">
	import Drop_down from '$lib/icons/drop-down.svelte'
	import { createEventDispatcher } from 'svelte';

	export let options;
	export let choosed = options[0];

	const dispatch = createEventDispatcher();

	let itemWidth: Number;
	let inputWidth: String;
	let dropDownMenu: HTMLElement;

	$: {
		if (itemWidth != undefined && itemWidth != 0) {
			inputWidth = itemWidth + 'px';
			dropDownMenu.classList.add('hidden');
		}
	}

	const valueChanged = e => {
		choosed = e.target.innerText;
		dispatch('valueChanged', choosed);
	}
</script>

<svelte:window on:click={documentClick}/>

<div data-drop-down class="relative max-w-max min-w-max">
	<div data-drop-down-button class="flex place-items-center px-3 pb-1 pt-1 rounded-full cursor-pointer transition ease-in-out bg-white border border-frame-border hover:bg-hover-field hover:border-hover-frame-border">
		{#key inputWidth}
			<div class="mr-[12px] text-center cursor-pointer border-0 rounded-full inline-block selection:select-none" style="width:{inputWidth}">
				{choosed}
			</div>
			<div class="flex place-items-center w-4 h-4">
				<Drop_down />
			</div>
		{/key}
	</div>
	<ul data-drop-down-menu class="absolute flex flex-col z-10 ml-[12px] max-w-max rounded-[20px] bg-white border border-frame-border hover:border-hover-frame-border" bind:this={dropDownMenu}>
		{#each options as option}
			<li on:click={valueChanged} class="px-[0.35rem] pb-1 pt-1 text-center cursor-default bg-white hover:bg-hover-field" bind:clientWidth={itemWidth}>{option}</li>
		{/each}
	</ul>
</div>

<style>
	li:nth-child(1) {
		border-radius: 19px 19px 0 0;
	}

	li:last-child {
		border-radius: 0 0 19px 19px;
	}
</style>