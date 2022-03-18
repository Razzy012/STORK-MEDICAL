<script>
    import User from "$lib/icons/user.svelte";
    import { getAuth, signOut } from "firebase/auth";
    import { authStore } from "$lib/stores/authStore";
    import Stork from '$lib/icons/stork.svelte'

    const logout = () => {
        const auth = getAuth();
        signOut(auth)
            .catch((e) => {
            console.log(e.message);
        });
    }
</script>

<div class="bg-white w-screen h-19 border-b border-frame-border">
    <div class="h-full flex place-items-center justify-between">
        <div class="ml-8 text-5xl stork text-red-600 flex place-items-center">
            <div class="inline-block w-20"><Stork /></div>
            <div>Stork</div>
        </div>
        <div class="relative flex place-items-center">
            <div class="mr-14 text-2xl after:transition-all after:ease-in-out duration-700 after:content-[''] after:m-auto after:w-[0px] after:h-[2px] after:bg-black after:block hover:after:w-full"><a href="/">Adresář</a></div>
            <div class="mr-14 text-2xl after:transition-all after:ease-in-out duration-700 after:content-[''] after:m-auto after:w-[0px] after:h-[2px] after:bg-black after:block hover:after:w-full"><a href="/fakturace">Fakturace</a></div>
            <div class="mr-14 text-2xl after:transition-all after:ease-in-out duration-700 after:content-[''] after:m-auto after:w-[0px] after:h-[2px] after:bg-black after:block hover:after:w-full"><a href="/cenik">Ceník</a></div>
            <div class="user-menu-logo relative mr-7">
                <div class="p-[1rem] rounded-full bg-black">
                    <div class="w-[1.15rem] h-[1.15rem] text-white">
                        <User />
                    </div>
                </div>
                <div class="absolute top-[4.25rem] -right-[0.55rem] text-lg text-center border border-frame-border rounded bg-white hidden">
                    <div class="relative user-menu p-1 z-10 hover:bg-hover-field cursor-pointer"><a href="/users/profile">Profil</a></div>
                    <div class="b-triangle absolute -top-[15px] right-[23.5px] w-0 h-0 border-b-[15px] border-l-[9.23px] border-r-[9.23px] border-l-transparent border-r-transparent border-frame-border"></div>
                    <div class="absolute -top-[13px] right-[23.5px] w-0 h-0 border-b-[15px] border-l-[9.23px] border-r-[9.23px] border-l-transparent border-r-transparent border-white"></div>
                    {#if $authStore.roles.admin === true}
                        <div class="user-menu py-1 px-3 hover:bg-hover-field cursor-pointer"><a href="/users">Uživatelé</a></div>
                        <div on:click={logout} class="user-menu p-1 hover:bg-hover-field cursor-pointer">Odhlásit</div>
                    {:else}
                        <div on:click={logout} class="user-menu py-1 px-3 hover:bg-hover-field cursor-pointer">Odhlásit</div>
                    {/if}
                    
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .stork {
        font-family: 'Lobster Two', cursive;
    }

    .user-menu-logo:hover > div:last-child {
        display: block;
    }

    .user-menu-logo:hover > div:first-child::before {
        content: '';
        width: 105px;
        height: 30px;
        position: absolute;
        top: 38px;
        left: -46px;
    }

    .user-menu-logo:hover > div:first-child::after {
        content: '';
        width: 105px;
        height: 110px;
        position: absolute;
        top: 68px;
        left: -46px;
        z-index: -10;
    }

    .user-menu-logo > div:last-child:hover {
        @apply border-hover-frame-border;
    }

    .user-menu-logo > div:last-child:hover > .b-triangle {
        @apply border-b-hover-frame-border;
    }

    .user-menu:first-child {
		border-radius: 9px 9px 0 0;
	}

	.user-menu:last-child {
		border-radius: 0 0 9px 9px;
	}
</style>