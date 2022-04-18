<script>
	import Firm_Form from '$lib/components/firm_Form.svelte';
    import { page } from '$app/stores';
    import { firms } from '$lib/stores/firmsStore';
    import Button from '$lib/components/Button.svelte';
    import ConfirmAction_form from '$lib/components/confirmAction_Form.svelte';
    import { setPopup, removePopup } from '$lib/stores/popUpStore';
    import { doc, deleteDoc } from "firebase/firestore";
    import { firestore } from '$lib/utils/firebase';
    import { goto } from '$app/navigation';
    import { browser } from '$app/env';

    let defaultFirm = {
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

    if (browser)
        document.title = 'Nová firma';

    let firmCopy = {};

    $: if ($page.params.ico !== 'newFirm') {
        let firm = $firms.filter(firm => firm.ico + '' === $page.params.ico)[0];

        for(const key in firm) {
            if (['ico', 'prize'].includes(key)) {
                firmCopy[key] = firm[key] + '';
            } else if (['dateFrom', 'dateuntill'].includes(key)) {
                firmCopy[key] = {month: firm[key].month, year: firm[key].year}
            } else {
                firmCopy[key] = firm[key];
            }
        };

        firmCopy = {...defaultFirm, ...firmCopy}
        if (browser)
            document.title = firmCopy.name;
    }

    const deleteFirm = async () => {
        await deleteDoc(doc(firestore, "firms", firmCopy.ico + ''));
    }

    const confirmDeleteFirm = () => {
        setPopup(ConfirmAction_form, {
            message: `Přejete si odstranit <b>${firmCopy.name}</b>?<br>Tento krok již nepůjde vzít zpět.`,
            choice1F: () => {deleteFirm(); removePopup(); goto('/')},   
        })
    }
</script>

<div class="mt-10 flex justify-between place-items-end">
    <h1 class="inline-block pb-[1.125rem] text-2xl text-left">Základní informace</h1>
    <Button onclick={confirmDeleteFirm} css={'hover:!bg-red hover:text-white hover:border-red focus:bg-red focus:text-white focus:border-red'}>Odstranit firmu</Button>
</div>
<div class="mt-3 bg-white border rounded pl-6 pr-6 border-frame-border">
    {#if $page.params.ico !== 'newFirm'}
        <Firm_Form firm={firmCopy}/>
    {:else}
        <Firm_Form/>
    {/if}
</div>