import { writable } from 'svelte/store';
import { firestore } from '$lib/utils/firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export interface firm {
    name: string;
    ico: number;
    residence: string;
    address?: string;
    email?: string;
    note?: string;
    dateFrom?: {month: number, year: number};
    dateUntill?: {month: number, year: number};
    prize?: number;
    send: 'email' | 'iaddress';
    attention?: boolean;
};

export const firms = writable<firm[]>([]);

let subscribed: Function = null;

export function createFirmsListener() {
    if (subscribed) {
        return;
    }
    subscribed = onSnapshot(query(collection(firestore, "firms"), orderBy('name')), (querySnapshot) => {
        firms.set([]);

        querySnapshot.forEach((firm) => {
            
            let firmData: firm = {
                name: firm.get('name'),
                ico: parseInt(firm.id, 10),
                residence: firm.get('residence'),
                send: firm.get('send'),
            };
            
            if (firm.get('address')) firmData['address'] = firm.get('address');
            if (firm.get('email')) firmData['email'] = firm.get('email');
            if (firm.get('note')) firmData['note'] = firm.get('note');
            if (firm.get('attention')) firmData['attention'] = true;
            if (firm.get('prize')) {
                let a: number;
                firm.get('dateFrom').length < 6 ? a = 1 : a = 2;
                firmData['dateFrom'] = {month: parseInt((firm.get('dateFrom')+'').substring(0,a), 10), year: parseInt((firm.get('dateFrom')+'').substring(a), 10)};

                firm.get('dateUntill').length < 6 ? a = 1 : a = 2;
                firmData['dateUntill'] = {month: parseInt((firm.get('dateUntill')+'').substring(0,a), 10), year: parseInt((firm.get('dateUntill')+'').substring(a), 10)}

                firmData['prize'] = firm.get('prize');
            }

            firms.update(n => n = [...n, firmData]);
        });
    });
}

export function cancelFirmsListener() {
    if (subscribed) {
        subscribed();
        subscribed = null;
    }
}
