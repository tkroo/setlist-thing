import { writable } from 'svelte/store';

export const setlist = writable([]);
export const songlist = writable([]);
export const ctrlPressed = writable(false);

export function booleanStore(initial) {
	const isOpen = writable(initial);
	const { set, update } = isOpen;
	return {
		isOpen,
		open: () => set(true),
		close: () => set(false),
		toggle: () => update((n) => !n)
	};
}