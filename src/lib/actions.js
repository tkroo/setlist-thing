export function trapFocus(node) {
	const previous = document.activeElement;

	function focusable() {
		return Array.from(
			node.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
	}

	function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		const current = document.activeElement;

		const elements = focusable();
		const first = elements.at(0);
		const last = elements.at(-1);

		if (event.shiftKey && current === first) {
			last.focus();
			event.preventDefault();
		}

		if (!event.shiftKey && current === last) {
			first.focus();
			event.preventDefault();
		}
	}

	focusable()[0]?.focus();

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			previous?.focus();
		}
	};
}


export function doubleClk(node, { delay }) {
	let waiting = false;
	let timeout = null;

	function handleClickType() {
		if (waiting) {
			clearTimeout(timeout);
			node.dispatchEvent(new CustomEvent('dclick', { detail: 'double' }));
			waiting = false;
			return;
		}
		waiting = true;
		timeout = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('sclick', { detail: 'single' }));
			waiting = false;
		}, delay);
	}

	node.addEventListener('click', handleClickType);

	return {
		destroy() {
			node.removeEventListener('click', handleClickType);
		}
	};
}

// function handleEmit(event) {
// 	//...LOGIC
// 	console.log(event.detail);
// }


// export function longpress(node, threshold = 500) {
// 	const handle_mousedown = () => {
// 		let start = Date.now();

// 		const timeout = setTimeout(() => {
// 			node.dispatchEvent(new CustomEvent('longpress'));
// 		}, threshold);

// 		const cancel = () => {
// 			clearTimeout(timeout);
// 			node.removeEventListener('mousemove', cancel);
// 			node.removeEventListener('mouseup', cancel);
// 		};

// 		node.addEventListener('mousemove', cancel);
// 		node.addEventListener('mouseup', cancel);
// 	};

// 	node.addEventListener('mousedown', handle_mousedown);

// 	return {
// 		destroy() {
// 			node.removeEventListener('mousedown', handle_mousedown);
// 		}
// 	};
// }