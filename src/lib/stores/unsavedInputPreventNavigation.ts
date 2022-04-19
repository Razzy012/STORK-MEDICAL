import { writable, get } from "svelte/store";
import { beforeNavigate } from '$app/navigation';

export default function (eventName = "input", message = "Na stránce jsou neuložené změny.\nPřesto stránku opustit?") {
    const store = writable(false);

    function checkNavigation(navigation) {
        if (get(store)) {
            if (!confirm(message)) {
                navigation.cancel();
            } else {
                store.set(false);
            }
        }
    }

    function preventAction(node) {
        function markUnsaved(e) {
            store.set(true);
        }
        node.addEventListener(eventName, markUnsaved);
        return {
            destory() {
                node.removeEventListener(eventName, markUnsaved);
            },
        };
    }
    return { store, preventAction, checkNavigation };
}
