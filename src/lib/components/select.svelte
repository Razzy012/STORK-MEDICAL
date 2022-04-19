<script context="module" lang="ts">
	let draging = false;
	let containerDraging = false;
	let currentDropdownMenu: HTMLUListElement;
	
	const documentClick = (event) => {
		const isButton = event.target.closest('[data-drop-down-button]') != null;

		if (draging) {
			draging = false;
		} else if (!isButton && event.target.closest('[data-drop-down-menu]') != null)
			if (event.target.closest('[data-scroll-bar-container]') != null) {
				containerDraging = false;
				currentDropdownMenu = event.target.closest('[data-drop-down-menu]');
			} else
				event.target.closest('[data-drop-down-menu]').classList.add('hidden');
		else if (!draging) 
			currentDropdownMenu = null;

		if (isButton) {
			currentDropdownMenu = event.target
				.closest('[data-drop-down]')
				.querySelector('[data-drop-down-menu]');
			currentDropdownMenu.classList.toggle('hidden');
		}

		document.querySelectorAll('[data-scroll-bar]').forEach(scrollBar => {
			scrollBar.classList.add('bg-darker-red');
			scrollBar.classList.remove('bg-red');
		})

		document.querySelectorAll('[data-drop-down-menu]').forEach(dropdownMenu => {
			if (dropdownMenu === currentDropdownMenu) return;
			dropdownMenu.classList.add('hidden');
		});
	};
</script>

<script lang="ts">
	import Drop_down from '$lib/icons/drop-down.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	export let options;
	export let choosed = options[0];
	export let maxVisibleOptions: number = 0;
	export let buttonCSS = '';

	const dispatch = createEventDispatcher();

	let itemWidth: number;
	let itemHeight: number;
	let inputWidth = '0px';
	let dropDownList: HTMLElement;
	let dropDownMenu: HTMLElement;
	let scrollBarZoneHeight = 0;
	let scrollBarHeight = '0px';
	let scrollBar: HTMLElement;
	let dropDownHeight = 0;
	let dropDownVisibleHeight = 0;
	let scale: number;

	onMount(() => {
		inputWidth = itemWidth + 'px';
		dropDownHeight = itemHeight * options.length;
		if (maxVisibleOptions != 0) {
			dropDownVisibleHeight = itemHeight * maxVisibleOptions;
			scrollBarZoneHeight = dropDownVisibleHeight - 40;
			scale = scrollBarZoneHeight / dropDownHeight
			if (itemHeight * maxVisibleOptions * scale > 15) {
				scrollBarHeight = itemHeight * maxVisibleOptions * scale + 'px';
			} else {
				scrollBarHeight = '20px';
				scale = (scrollBarZoneHeight - 20) / (dropDownHeight - dropDownVisibleHeight);
			}
		} else scrollBarHeight = '0px';
		dropDownMenu.classList.add('hidden');
	})

	const valueChanged = (e) => {
		choosed = e.target.innerText;
		dispatch('valueChanged', choosed);
	};

	const scroll = (e) => {
		if (maxVisibleOptions === 0) 
			return;
		e.preventDefault();
		if (e.wheelDelta < 0) {
			if (dropDownHeight - dropDownVisibleHeight > -1 * parseInt(dropDownList.style.top, 10) + 20)
				dropDownList.style.top = parseInt(dropDownList.style.top, 10) - 20 + 'px';
			else if (
				dropDownHeight - dropDownVisibleHeight >
				-1 * parseInt(dropDownList.style.top, 10) + 1
			)
				dropDownList.style.top = -1 * (dropDownHeight - dropDownVisibleHeight) + 'px';
		} else {
			if (0 > parseInt(dropDownList.style.top, 10) + 20)
				dropDownList.style.top = parseInt(dropDownList.style.top, 10) + 20 + 'px';
			else if (0 > parseInt(dropDownList.style.top, 10) + 1) dropDownList.style.top = '0px';
		}
		scrollBarY = parseInt(dropDownList.style.top, 10) * scale * -1;
	};

	let scrollBarY = 0;
	let initialScrollBarY: number;
	let initialY: number;

	const dragingStart = e => {
		scrollBar.classList.add('bg-red');
		scrollBar.classList.remove('bg-darker-red');
		if (e.target.closest('[data-scroll-bar]') != null) {
			draging = true;
			initialY = e.clientY;
			initialScrollBarY = scrollBarY;
		} else {
			containerDraging = true;
			initialY = e.layerY;
			if (initialY - 20 > scrollBarY + parseInt(scrollBarHeight, 10)) {
				move(scrollBarY + 5);
			} else if (initialY - 20 < scrollBarY) {
				move(scrollBarY - 5);
			}
			setTimeout(containerDragingEvent, 500)
		}
	}

	const move = newPos => {
		if (newPos < 0)
			scrollBarY = 0;
		else if (newPos > scrollBarZoneHeight - parseInt(scrollBarHeight, 10))
			scrollBarY = scrollBarZoneHeight - parseInt(scrollBarHeight, 10);
		else if (newPos)
			scrollBarY = newPos;
		dropDownList.style.top = -1 * scrollBarY / scale + 'px';
	}

	const dragingEvent = e => {
		if(draging) {
			let newPos = initialScrollBarY + e.clientY - initialY;
			move(newPos);
		}
		if(containerDraging) {
			if (e.target.closest('[data-scroll-bar]') == null)
				initialY = e.layerY;
		}
	}

	const containerDragingEvent = () => {
		if(containerDraging) {
			if (initialY - 20 > scrollBarY + parseInt(scrollBarHeight, 10)) {
				move(scrollBarY + 5);
			} else if (initialY - 20 < scrollBarY) {
				move(scrollBarY - 5);
			}
			setTimeout(containerDragingEvent, 50)
		}
	}
</script>

<svelte:window on:click={documentClick} on:mousemove={dragingEvent}/>

<div data-drop-down class="relative max-w-max min-w-max">
	<div
		data-drop-down-button
		tabindex="0"
		class={`flex place-items-center px-3 pb-1 pt-1 rounded-full cursor-pointer transition ease-in-out border bg-white border-frame-border hover:bg-hover-field hover:border-hover-frame-border focus-within:outline-none focus-within:border-black focus-within:bg-hover-field ${buttonCSS}`}
	>
		<div
			class="mr-[12px] text-center cursor-pointer rounded-full inline-block"
			style:width={inputWidth}
		>
			{choosed}
		</div>
		<div class="flex place-items-center w-4 h-4">
			<Drop_down />
		</div>
	</div>
	<div data-drop-down-menu class="relative" bind:this={dropDownMenu} style:width={itemWidth ? 'calc(' + itemWidth + 'px + 14px)' : '0px'}>
		<div class="absolute left-3 z-10">
			<div
				class="relative overflow-hidden box-content border z-20 border-frame-border hover:border-hover-frame-border rounded"
				style:width={itemWidth ? 'calc(' + itemWidth + 'px - 1px)' : '0px'} style:height={(itemHeight * maxVisibleOptions) ? (itemHeight * maxVisibleOptions) + 'px' : dropDownHeight + 'px'}
			>
				<ul
					on:wheel={scroll}
					bind:this={dropDownList}
					bind:clientWidth={itemWidth}
					class="absolute flex flex-col z-10 bg-white transition-all duration-[50ms] ease-linear"
					style="top: 0px"
				>
					{#each options as option}
						<li
							on:click={valueChanged}
							class="px-[0.35rem] pb-1 pt-1 text-center cursor-default first:rounded-t-[9px] last:rounded-b-[9px] bg-white hover:bg-hover-field"
							style="-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none"
							bind:clientHeight={itemHeight}
						>
							{option}
						</li>
					{/each}
				</ul>
			</div>
			<div data-scroll-bar-container on:mousedown={dragingStart} class="absolute z-10 -right-3 top-0 bg-white/80 rounded-r-[10px]" style:height={(itemHeight * maxVisibleOptions) ? `calc(${(itemHeight * maxVisibleOptions)}px + 2px)` : '0px'} style:width={itemWidth ? `calc(${itemWidth/2}px + 12px)` : '0px'}>
				<div class="relative">
					<div
						data-scroll-bar
						bind:this={scrollBar}
						class="absolute right-[0.125rem] w-2 h-[var(--scrollBarHeight)] bg-darker-red rounded transition-all duration-[50ms] ease-linear"
						style="--scrollBarHeight: {scrollBarHeight}" style:top={'calc(' + scrollBarY + 'px + 20px)'}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
