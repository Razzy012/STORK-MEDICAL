<script lang="ts">
	import { getAuth, updatePassword } from 'firebase/auth';
	import Button from '$lib/components/Button.svelte';
	import { removePopup } from '$lib/stores/popUpStore';

	export let props: {
        submitAction: Function;
        cancelAction?: Function
    };

	const defaultProps = { cancelAction: () => removePopup() };

	props = { ...defaultProps, ...props };

	let e_password = false;
	let e_min = false;

	const submit = (e) => {
		if (e.keyCode === 13) change(e);
	};

	const change = (e) => {
		const inputs = e.target.closest('[data-newUser]').querySelectorAll('[data-input]');
		e_password = false;
		e_min = false;
		if (inputs[0].value.trim() === inputs[1].value.trim()) {
			const password = inputs[0].value.trim();
			updatePassword(getAuth().currentUser, password)
				.then(() => {e_password = false; props.submitAction();})
				.catch((e) => {
					if (e.code === 'auth/weak-password') {
						e_password = true;
						e_min = true;
					}
				});
		} else {
			e_password = true;
		}
	};

	const cancel = (e) => {
		e_password = false;
        props.cancelAction();
	};
</script>

<div data-newUser class="border p-6 rounded bg-white border-frame-border">
	<div class="text-center text-2xl">Změnit heslo</div>
	<div class="relative">
		<label for="password" class="block mt-2">Heslo</label>
		<div
			class="absolute top-[2.125rem] right-4 pointer-events-none text-sm text-red-600 hidden"
			class:e_min
		>
			Min. 6 znaků
		</div>
		<input
			data-input
			on:keyup={submit}
			type="password"
			name="password"
			id="password"
			class="pl-3 h-[2.625rem] rounded-full w-full"
			class:e_password
		/><br />
	</div>
	<label for="password2" class="block mt-2">Heslo znovu</label>
	<input
		data-input
		on:keyup={submit}
		type="password"
		name="password2"
		id="password2"
		class="pl-3 h-[2.625rem] rounded-full w-full"
		class:e_password
	/><br />
	<div class="mt-7 m-auto max-w-fit">
		<div class="mr-1 inline-block"><Button onclick={change}>Změnit</Button></div>
		<Button onclick={cancel} width="85.25px">Zrušit</Button>
	</div>
</div>

<style>
	.e_password {
		box-shadow: inset 0px 0px 0px 2px red;
		border-color: white;
	}

	.e_password:hover {
		border-color: red;
	}

	.e_min {
		@apply block;
	}
</style>
