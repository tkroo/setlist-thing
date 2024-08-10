import { DateTime } from 'luxon';

export const getTotalDuration = (obj) => {
	const totalSeconds = obj
		.map((s) => {
			const [minutes, seconds] = s.length.split(':').map(Number);
			return minutes * 60 + seconds;
		})
		.reduce((total, seconds) => total + seconds, 0);

	const totalDuration = DateTime.fromSeconds(totalSeconds).toFormat('mm:ss');

	if (obj.length) {
		return obj.length > 1 ? totalDuration : obj[0].length;
	} else {
		return '00:00';
	}
};

export const sortByKey = (arr, key, ascdesc) => {
	if(ascdesc) {
		return arr.sort((a, b) => (a[key] > b[key] ? 0 : 1));
	} else {
		return arr.sort((a, b) => (a[key] > b[key] ? 1 : 0));
	}
}