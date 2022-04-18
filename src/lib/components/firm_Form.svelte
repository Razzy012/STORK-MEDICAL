<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import TextareaAutoheight from './textareaAutoheight.svelte';
	import ToggleButton from '$lib/components/toggleButton.svelte';
	import Select from '$lib/components/select.svelte'
	import unsavedInputPreventNavigation from "$lib/stores/unsavedInputPreventNavigation";
	import { doc, setDoc } from "firebase/firestore";
	import { firestore } from '$lib/utils/firebase';
  	const { store, preventAction } = unsavedInputPreventNavigation();
	
	interface firm {
		name: string;
		ico: string;
		residence: string;
		address: string;
		email: string;
		note: string;
		dateFrom: {month: string, year: string};
		dateUntill: {month: string, year: string};
		prize: string;
		send: 'email' | 'iaddress';
		attention: boolean;
	};

	export let firm: firm = {
		name: '',
		ico: '',
		residence: '',
		address: '',
		email: '',
		note: '',
		dateFrom: {month: '-', year: '-'},
		dateUntill: {month: '-', year: '-'},
		prize: '',
		send: 'iaddress',
		attention: false
	};

	export let updateRequired = false;

	if (updateRequired) store.set(true);

	let months = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	let years = ['-'];
	for (let i = 11; i<32; i++) {
		years[i-10] = i + 1999 + '';
	}

	let nameTextarea: HTMLElement;

	let sendCheckbox = firm.send !== 'iaddress';

	$: sendCheckbox ? firm.send = 'email' : firm.send = 'iaddress';

	onMount(() => {
		if (firm.name === '') nameTextarea.childNodes[0].focus();
	});

	let e_name = false;
	let e_ico = false;
	let e_residence = false;
	let e_address = false;
	let e_email = false;
	let e_prize = false;
	let buttonCSS = 'h-10'

	const isValidDate = (date: {month: string, year: string}) => {
		if (!isNaN(date.month) && !isNaN(date.year)) return 2; // both correct
		else if (!isNaN(date.month) || !isNaN(date.year)) return 1; // only one correct
		else return 0; // none correct
	}

	const isNewer = (dateNewer: {month: string, year: string}, dateOlder: {month: string, year: string}) => {
		if(dateNewer.year > dateOlder.year || (dateNewer.year == dateOlder.year && dateNewer.month >= dateOlder.month)) return true;
		else return false;
	}

	const updateFirm = async () => {
		e_name = false;
		e_ico = false;
		e_residence = false;
		e_address = false;
		e_email = false;
		e_prize = false;
		buttonCSS = 'h-10';

		if (!firm.name.trim()) e_name = true;
		if (!firm.ico.trim() || isNaN(firm.ico.trim())) e_ico = true;
		if (!firm.residence.trim()) e_residence = true;
		if (firm.send === 'iaddress' && !firm.address.trim()) e_address = true;
		else if (firm.send === 'email' && !firm.email.trim()) e_email = true;
		let from = isValidDate(firm.dateFrom);
		let untill = isValidDate(firm.dateUntill);
		if ((from == 1 || untill == 1) ||
			(from == 2 && untill == 0 || from == 0 && untill == 2) ||
			(from == 2 && !isNewer(firm.dateUntill, firm.dateFrom)) || 
			((!from || !untill) && firm.prize.trim())) buttonCSS = 'h-10 e_date';
		if((firm.prize.trim() && isNaN(firm.prize.trim())) ||
		   ((firm.dateFrom.month !== '-' || firm.dateFrom.year !== '-' || firm.dateUntill.month !== '-' || firm.dateUntill.year !== '-') && (isNaN(firm.prize.trim()) || firm.prize.trim() === ''))) e_prize = true;

		if (!e_name && !e_ico && !e_residence && !e_address && !e_email && !e_prize && buttonCSS == 'h-10') {
			store.set(false);

			let props = {
				name: firm.name.trim(),
				residence: firm.residence.trim(),
				send: firm.send.trim(),
			}

			if (firm.address.trim()) props['address'] = firm.address.trim();
			if (firm.email.trim()) props['email'] = firm.email.trim();
			if (firm.note.trim()) props['note'] = firm.note.trim();
			if (firm.attention) props['attention'] = true;
			if (firm.prize.trim()) {
				props['dateFrom'] = parseInt(firm.dateFrom.month + firm.dateFrom.year, 10);
				props['dateUntill'] = parseInt(firm.dateUntill.month + firm.dateUntill.year, 10);
				props['prize'] = parseInt(firm.prize.trim(), 10);
			}

			await setDoc(doc(firestore, 'firms', firm.ico), props);
			history.pushState({}, null, `/${firm.ico}`);
		}
	};

</script>

<div class="p-[17px] bg-white">
	<div use:preventAction class="flex gap-4 xl:gap-8 flex-col xl:flex-row">
		<div class="grid gap-4 grid-cols-[max-content_auto] basis-2/5 items-center auto-rows-min">
			<div class="text-right">Název:</div>
			<div bind:this={nameTextarea}>
				<TextareaAutoheight bind:value={firm.name} css="textarea" error={e_name}/>
			</div>

			<div class="text-right">IČO:</div>
			<TextareaAutoheight bind:value={firm.ico} css="textarea" error={e_ico} />

			<div class="text-right">Sídlo:</div>
			<TextareaAutoheight
				bind:value={firm.residence}
				css="textarea"
				error={e_residence}
			/>

			<div class="text-right">Fak. adresa:</div>
			<TextareaAutoheight bind:value={firm.address} css="textarea" error={e_address}/>

			<div class="text-right">Email:</div>
			<TextareaAutoheight bind:value={firm.email} css="textarea" error={e_email}/>
		</div>
		<div class="grid relative gap-4 grid-cols-[max-content_auto] basis-3/5 items-center auto-rows-min">
			<div class="text-right row-span-2">Poznámka:</div>
			<TextareaAutoheight bind:value={firm.note} css="textarea row-span-2"/>

			<div class="text-right">Paušál:</div>
			<div class="flex gap-3 place-items-start flex-col lg:flex-row xl:flex-col 2xl:flex-row">
				<div class="flex gap-3 place-items-center">
					<div>od</div>
					<Select bind:choosed={firm.dateFrom.month} options={months} maxVisibleOptions={5} {buttonCSS}/>
					<Select bind:choosed={firm.dateFrom.year} options={years} maxVisibleOptions={5} {buttonCSS}/>
				</div>
				<div class="flex gap-3 place-items-center">
					<div>do</div>
					<Select bind:choosed={firm.dateUntill.month} options={months} maxVisibleOptions={5} {buttonCSS}/>
					<Select bind:choosed={firm.dateUntill.year} options={years} maxVisibleOptions={5} {buttonCSS}/>
				</div>
				<div class="flex place-items-center">
					<div class='mr-3'>cena</div>
					<input type="text" class="rounded-full w-24 h-10" bind:value={firm.prize} class:e_prize/>
					<div class='ml-1'>Kč</div>
				</div>
			</div>

			<div class="text-right">Fakturaci posílat na:</div>
			<ToggleButton word1="Fakturace. adresu" word2="Email" bind:checked={sendCheckbox} />

			<div class="text-right">Věnovat pozornost:</div>
			<ToggleButton bind:checked={firm.attention} />
			<div class="absolute right-0 bottom-0 z-10"><Button onclick={updateFirm} css={$store ?'bg-blue text-white border-blue hover:bg-darker-blue hover:border-darker-blue focus:border-darker-blue focus:bg-darker-blue relative before:content-["Uložit"] before:absolute before:-top-[0.85px] before:-left-[0.85px] before:h-[2.625rem] before:px-3 before:border before:rounded-full before:flex before:items-center before:align-center before:border-blue before:bg-blue hover:before:bg-darker-blue hover:before:border-darker-blue focus:before:border-darker-blue focus:before:bg-darker-blue before:animate-[ping2_1.5s_cubic-bezier(0,0,0.2,1)_infinite] before:-z-10':''} >Uložit</Button></div>
		</div>
	</div>
</div>

<style>
	:global(.textarea) {
		@apply h-10 px-2 py-[6px] border resize-none border-frame-border hover:border-hover-frame-border focus:outline-none focus:border focus:border-black rounded-[25px];
	}

	:global(.e_date), .e_prize {
		box-shadow: inset 0px 0px 0px 2px red;
		border-color: white;
	}

	:global(.e_date:hover), .e_prize:hover {
		border-color: red;
	}

</style>
