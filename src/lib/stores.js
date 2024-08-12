import { writable } from 'svelte/store';

export const songlist = writable([
	{
		"name": "Hank Is Dead",
		"album": "Murder The Mountains",
		"duration": "02:38",
		"tuning": "C"
	},
	{
		"name": "Dirt Wizard",
		"album": "Murder The Mountains",
		"duration": "02:59",
		"tuning": "E"
	},
	{
		"name": "Throw Up",
		"album": "Murder The Mountains",
		"duration": "06:35",
		"tuning": "C"
	}
]);
export const setlist = writable([]);