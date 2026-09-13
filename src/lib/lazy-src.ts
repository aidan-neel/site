export function lazyVisible(node: HTMLElement, onShow: () => void) {
	let shown = false;

	const show = () => {
		if (shown) return;
		shown = true;
		onShow();
	};

	if (typeof IntersectionObserver === 'undefined') {
		show();
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			if (!entries.some((entry) => entry.isIntersecting)) return;
			show();
			observer.disconnect();
		},
		{ rootMargin: '180px 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
