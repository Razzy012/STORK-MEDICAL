<script>
    import Plus from "$lib/icons/plus.svelte";
    import { firms } from '$lib/stores/firmsStore'
    import { flip } from 'svelte/animate';

</script>

<svelte:head>
    <title>Adresář</title>
</svelte:head>

<div class="mt-10 text-2xl">
    Adresář
</div>
<div class="mt-7 bg-white border rounded pl-6 pr-6 border-frame-border">
    <div class="flex w-full h-[2.7rem] items-center">
        <div class="font-bold basis-[30%]">Název</div>
        <div class="font-bold basis-[20%]">IČO</div>
        <div class="font-bold basis-1/2">Sídlo</div>
    </div>
    {#each $firms as firm (firm.ico)}
        <div class="relative" animate:flip>
            <a href={`/${firm.ico}`} class="flex h-14 items-center border-t border-frame-border cursor-pointer before:content-[''] before:absolute before:-left-[10px] before:top-[1px] before:rounded before:w-[calc(100%+20px)] before:h-[calc(100%-1px)] hover:before:bg-hover-field">
                <div class="basis-[30%] z-10">{firm.name}</div>
                <div class="basis-[20%] z-10">{firm.ico}</div>
                <div class="basis-1/2 z-10">{firm.residence}</div>
            </a>
        </div>
    {/each}
</div>

<a href='/newFirm' class="absolute bottom-8 right-8 w-[60px] h-[60px] flex justify-center items-center rounded-full cursor-pointer text-5xl bg-white border border-frame-border hover:bg-hover-field hover:border-hover-frame-border">
    <Plus />
</a>


