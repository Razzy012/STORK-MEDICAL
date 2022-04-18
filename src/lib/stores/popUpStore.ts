import { writable } from 'svelte/store'

export interface popupItem {
    component: any;
    props?: {
        [key: string]: any;
    };
}

export const popup = writable<popupItem>(null);

export function setPopup(component: any, props: {[key: string]: any}=null) {
    if (props)
        popup.set({component, props});
    else
        popup.set({component});
}

export function removePopup() {
    popup.set(null);
}