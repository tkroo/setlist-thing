import papa from 'papaparse';
import { Duration } from 'luxon';


export const getTotalDuration = (obj) => {
	const totalSeconds = obj
		.map((s) => {
			const [minutes, seconds] = s.duration.split(':').map(Number);
			return minutes * 60 + seconds;
		})
		.reduce((total, seconds) => total + seconds, 0);

	if (totalSeconds == 0) return 0;

	const dur = Duration.fromMillis(totalSeconds * 1000).shiftTo('hours', 'minutes', 'seconds', 'milliseconds').toObject();
	return `${dur.hours ? dur.hours + 'h ' : ''} ${dur.minutes ? dur.minutes + 'm ' : ''} ${dur.seconds}s`;
	// return '0m 0s'
};

export const sortByKey = (arr, key, ascdesc) => {
	if(ascdesc) {
		return arr.sort((a, b) => (a[key] > b[key] ? 0 : 1));
	} else {
		return arr.sort((a, b) => (a[key] > b[key] ? 1 : 0));
	}
}

export const papaReadCSV = async (input) => {
	return papa.parse(input, {
		header: true,
		skipEmptyLines: true
	});
}

export const writeFile = (output, filename='untitled.csv', mimetype='text/csv') => {
	const foo = papa.unparse(output);
	const blob = new Blob([foo], { type: mimetype });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
};


export const printDiv = (element, useStyles = true) => {
	const printStyles = useStyles
		? `<head><style>body,html{height:100%}*,::after,::before{box-sizing:border-box}em{font-style:italic}body{width:100%;margin:0;padding:0;font-family:sans-serif;}ol{padding-top:1rem;}ul{padding-top:1rem;list-style-type:none; font-size: 48px;}</style></head>`
		: '<head><style>body{ font-family:system-ui,sans-serif;font-size:12px;margin:1em;padding:0;}</style></head>';

	const divContents = document.getElementById(element).innerHTML;
	const a = window.open('', 'SETLIST', 'height=500,width=700');
	// const a = window.open('', 'SETLIST');
	if (!a) {
		windowOpenError = true;
	}
	a.document.write(`<html>${printStyles}<body>${divContents}</body></html>`);
	a.document.close();
	setTimeout(function () {
		a.print();
	}, 1000);
}