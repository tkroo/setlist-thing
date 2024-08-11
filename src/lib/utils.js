import { DateTime, Duration } from 'luxon';


export const getTotalDuration = (obj) => {
	const totalSeconds = obj
		.map((s) => {
			const [minutes, seconds] = s.duration.split(':').map(Number);
			return minutes * 60 + seconds;
		})
		.reduce((total, seconds) => total + seconds, 0);

	if (totalSeconds == 0) return 0;

	const dur = Duration.fromMillis(totalSeconds*1000);
	// const totalDuration = DateTime.fromSeconds(totalSeconds).toFormat('mm:ss');
	const totalDuration = dur.toFormat('hh:mm:ss');
	const tmpArr = totalDuration.split(':')
	const obby = {hours: tmpArr[0], minutes: tmpArr[1], seconds: tmpArr[2]}
	const foox = Duration.fromObject(obby)
	// console.log('foox: ', foox);
	// const formattedDuration = foo[0] + 'hrs ' + foo[1] + 'mins ' + foo[2] + 'secs '
	return foox.toHuman({unitDisplay: 'short', listStyle:'narrow'});
};

export const sortByKey = (arr, key, ascdesc) => {
	if(ascdesc) {
		return arr.sort((a, b) => (a[key] > b[key] ? 0 : 1));
	} else {
		return arr.sort((a, b) => (a[key] > b[key] ? 1 : 0));
	}
}

const formatCSV = (obj) => {
	let rows = `name,album,duration,tuning\n`;
	obj.forEach((s) => {
		rows += `${s.name},${s.album},${s.duration},${s.tuning}\n`;
	});
	return rows
}

export const readCSV = (data) => {
	const lines = data.split('\n').filter(x => x);
	const keys = lines[0].split(',');

	const output = lines.slice(1).map((line) => {
		const values = line.split(',');
		const obj = {};
		keys.forEach((key, i) => {
			obj[key] = values[i];
		});
		return obj;
	});
	console.log('readCSV: output', output)
	return output
}

export const writeFile = (output, filename='untitled.csv', mimetype='text/csv') => {
	const foo = formatCSV(output);
	const output2 = foo
	const blob = new Blob([output2], { type: mimetype });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
};

// export const readFile = async (event) => {
// 	const file = event.target.files[0];
// 	console.log('readFile() ', file)
// 	const reader = new FileReader();

// 	reader.onload = async(event) => {
// 		const data = event.target.result;
// 		let tmp = readCSV(data);
// 		console.log('tmp: ');
// 		console.log(tmp);
// 		if (tmp) {
// 			return {
// 				success:true,
// 				data:tmp,
// 				message: `loaded ${file.name}`
// 			}
// 		} else {
// 			return {
// 				success: false,
// 				data: null,
// 				message: `ERROR: expected CSV file ${file.name}`
// 			};
// 		}
// 	}
// 	reader.readAsText(file);
// }

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