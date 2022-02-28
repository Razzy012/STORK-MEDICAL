import { writable } from 'svelte/store'

const authStore = writable<{
    isLoggedIn: boolean,
}>({
    isLoggedIn: false
});

export default {
    set: authStore.set,
}