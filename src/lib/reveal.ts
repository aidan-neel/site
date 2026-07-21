type RevealParams = {
	delay?: number;
	y?: number;
	immediate?: boolean;
};

/**
 * One-shot entrance: fades the element in while rising from `--reveal-y`.
 * `immediate` plays on mount (hero), otherwise on first scroll into view.
 * No-ops under prefers-reduced-motion and without JS (content stays visible).
 */
export function reveal(node: HTMLElement, params: RevealParams = {}) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.style.setProperty('--reveal-delay', `${params.delay ?? 0}ms`);
	if (params.y != null) node.style.setProperty('--reveal-y', `${params.y}px`);
	node.classList.add('reveal-pending');

	const show = () => {
		node.classList.remove('reveal-pending');
		node.classList.add('reveal');
	};

	if (params.immediate) {
		const timeout = setTimeout(show, 16);
		return {
			destroy() {
				clearTimeout(timeout);
			}
		};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				show();
				observer.disconnect();
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
