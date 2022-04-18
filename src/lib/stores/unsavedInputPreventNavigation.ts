import { writable, get } from "svelte/store";

export default function (eventName = "input", message = "Na stránce jsou neuložené změny.\nPřesto stránku opustit?") {
    const store = writable(false);

    function preventAction(node) {
        function markUnsaved(e) {
            store.set(true);
        }
        function checkNavigation(e) {
        if (get(store)) {
            if (!confirm(message)) {
                e.preventDefault();
                if (e.type === "beforeunload") {
                    e.returnValue = "";
                }
                
            } else {
                store.set(false);
            }
        }
        }
        for (let a of document.querySelectorAll("a[href]")) {
            a.addEventListener("click", checkNavigation);
        }
        window.addEventListener("beforeunload", checkNavigation);
        node.addEventListener(eventName, markUnsaved);
        return {
            destory() {
                node.removeEventListener(eventName, markUnsaved);
                for (let a of document.querySelectorAll("a[href]")) {
                    a.removeEventListener("click", checkNavigation);
                }
                window.removeEventListener("beforeunload", checkNavigation);
            },
        };
    }
    return { store, preventAction };
}
