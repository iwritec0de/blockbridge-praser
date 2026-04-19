import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const GH_ICON = (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
		<path d="M7 1C3.686 1 1 3.686 1 7c0 2.656 1.724 4.912 4.113 5.708.301.055.411-.131.411-.29v-.806c-1.674.363-2.026-.806-2.026-.806-.274-.695-.67-.88-.67-.88-.548-.374.041-.367.041-.367.605.043.924.622.924.622.538.921 1.41.655 1.754.5.054-.389.21-.655.383-.806-1.338-.152-2.745-.669-2.745-2.975 0-.657.234-1.194.622-1.615-.063-.152-.269-.764.059-1.594 0 0 .508-.163 1.663.622.483-.135.999-.202 1.514-.203.515.001 1.031.068 1.514.203 1.154-.785 1.661-.622 1.661-.622.329.83.122 1.442.06 1.594.389.421.621.958.621 1.615 0 2.313-1.41 2.821-2.753 2.97.217.186.41.553.41 1.115v1.652c0 .16.108.347.414.289C11.278 11.91 13 9.655 13 7c0-3.314-2.686-6-6-6z" />
	</svg>
);

const links = [
	{ href: '/',         label: 'Home' },
	{ href: '/blog',     label: 'Writing' },
	{ href: '/explore',  label: 'Block Explorer' },
	{ href: '/customize',label: 'Token Studio' },
	{ href: '/about',    label: 'About' },
];

export default function Nav() {
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);

	const isActive = (href) =>
		href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

	// Close mobile menu on route change
	useEffect(() => {
		const handleRouteChange = () => setMobileOpen(false);
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => router.events.off('routeChangeComplete', handleRouteChange);
	}, [router]);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [mobileOpen]);

	// Close on Escape key
	const handleKeyDown = useCallback((e) => {
		if (e.key === 'Escape') setMobileOpen(false);
	}, []);

	useEffect(() => {
		if (mobileOpen) {
			document.addEventListener('keydown', handleKeyDown);
			return () => document.removeEventListener('keydown', handleKeyDown);
		}
	}, [mobileOpen, handleKeyDown]);

	return (
		<header className="site-header" role="banner">
			<div className="site-header__inner">
				<Link href="/" className="site-header__brand" aria-label="BlockBridge home">
					BlockBridge
					<span className="site-header__logo-dot" aria-hidden="true" />
				</Link>

				<nav className="site-nav site-nav--desktop" aria-label="Main navigation">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={`site-nav__link${isActive(href) ? ' site-nav__link--active' : ''}`}
						>
							{label}
						</Link>
					))}
				</nav>

				<div className="site-header__end">
					<a
						href="https://github.com/iwritec0de/blockbridge-wp"
						className="site-header__gh"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View on GitHub"
					>
						{GH_ICON}
						GitHub
					</a>

					<button
						className={`hamburger${mobileOpen ? ' hamburger--active' : ''}`}
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileOpen}
					>
						<span className="hamburger__line" />
						<span className="hamburger__line" />
						<span className="hamburger__line" />
					</button>
				</div>
			</div>

			{/* Mobile overlay + drawer */}
			<div
				className={`mobile-overlay${mobileOpen ? ' mobile-overlay--visible' : ''}`}
				onClick={() => setMobileOpen(false)}
				aria-hidden="true"
			/>
			<nav
				className={`mobile-nav${mobileOpen ? ' mobile-nav--open' : ''}`}
				aria-label="Mobile navigation"
				aria-hidden={!mobileOpen}
			>
				<div className="mobile-nav__links">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={`mobile-nav__link${isActive(href) ? ' mobile-nav__link--active' : ''}`}
							tabIndex={mobileOpen ? 0 : -1}
						>
							{label}
						</Link>
					))}
				</div>
				<div className="mobile-nav__footer">
					<a
						href="https://github.com/iwritec0de/blockbridge-wp"
						className="mobile-nav__gh"
						target="_blank"
						rel="noopener noreferrer"
						tabIndex={mobileOpen ? 0 : -1}
					>
						{GH_ICON}
						View on GitHub
					</a>
				</div>
			</nav>
		</header>
	);
}
