import { DateTime } from 'luxon';


export const getTotalDuration = (obj) => {
	const totalSeconds = obj
		.map((s) => {
			const [minutes, seconds] = s.duration.split(':').map(Number);
			return minutes * 60 + seconds;
		})
		.reduce((total, seconds) => total + seconds, 0);

	const totalDuration = DateTime.fromSeconds(totalSeconds).toFormat('mm:ss');

	if (obj.length) {
		return obj.length > 1 ? totalDuration : obj[0].duration;
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

export const formatCSV = (obj) => {
	let rows = `name, album, duration, tuning\n`;
	obj.forEach((s) => {
		rows += `${s.name}, ${s.album}, ${s.duration}, ${s.tuning}\n`;
	});
	return rows
}

export const readCSV = (data) => {
	const lines = data.split('\n');
	const keys = lines[0].split(',');
	const output = lines.slice(1).map((line) => {
		const values = line.split(',');
		const obj = {};
		keys.forEach((key, i) => {
			obj[key] = values[i];
		});
		return obj;
	});
	return output
}

export const writeFile = (output, mimetype='text/csv') => {
	const foo = formatCSV(output);
	const output2 = foo
	const blob = new Blob([output2], { type: mimetype });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'untitled.csv';
	a.click();
};

// export const readFile = (event) => {
// 	const file = event.target.files[0];
// 	const reader = new FileReader();
// 	reader.onload = async(event) => {
// 		const data = event.target.result;
// 		let tmp = await detectThemeFormat(data, file);
// 		if (tmp.file_type != 'unknown') {
// 			message = `LOADED ${tmp.file_type} theme: '${file.name}'`;
// 			success = true;
// 			colors = tmp.colors;
// 		} else {
// 			success = false;
// 			message = `ERROR: unexpected format ${tmp.file_type} ${file.name}`;
// 		}
// 	}
// 	reader.readAsText(file);
// }