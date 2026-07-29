/**
 * Scroll-velocity chromatic aberration.
 * Drives --ca-x / --ca-y on <html> and toggles .ca-active.
 * No-ops under prefers-reduced-motion.
 */
export function initChromaticAberration() {
	if (typeof window === 'undefined') return () => {};
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

	const root = document.documentElement;
	let raf = 0;
	let running = false;
	let lastY = window.scrollY;
	let lastT = performance.now();
	let current = 0;
	let target = 0;
	let dir = 1;

	// Max channel split in CSS px — subtle
	const MAX_PX = 1.35;
	// Maps px/ms scroll speed → 0..1 intensity
	const VELOCITY_SCALE = 10;
	const ATTACK = 0.38;
	const DECAY = 0.18;
	const TARGET_DECAY = 0.9;
	const REST = 0.02;

	const paint = () => {
		const ease = target > current ? ATTACK : DECAY;
		current += (target - current) * ease;
		target *= TARGET_DECAY;

		if (current < REST && target < REST) {
			current = 0;
			target = 0;
			root.style.setProperty('--ca-x', '0px');
			root.style.setProperty('--ca-y', '0px');
			root.classList.remove('ca-active');
			running = false;
			return;
		}

		const x = current * MAX_PX;
		const y = current * MAX_PX * 0.3 * dir;
		root.style.setProperty('--ca-x', `${x.toFixed(3)}px`);
		root.style.setProperty('--ca-y', `${y.toFixed(3)}px`);
		root.classList.add('ca-active');
		raf = requestAnimationFrame(paint);
	};

	const onScroll = () => {
		const now = performance.now();
		const y = window.scrollY;
		const dt = Math.max(now - lastT, 1);
		const dy = y - lastY;
		lastY = y;
		lastT = now;

		if (dy !== 0) dir = Math.sign(dy) || dir;

		const velocity = Math.abs(dy) / dt;
		target = Math.min(1, Math.max(target, velocity * VELOCITY_SCALE));

		if (!running) {
			running = true;
			raf = requestAnimationFrame(paint);
		}
	};

	window.addEventListener('scroll', onScroll, { passive: true });

	return () => {
		window.removeEventListener('scroll', onScroll);
		cancelAnimationFrame(raf);
		root.classList.remove('ca-active');
		root.style.removeProperty('--ca-x');
		root.style.removeProperty('--ca-y');
	};
}
