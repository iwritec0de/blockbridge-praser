import Link from 'next/link';
import { useRouter } from 'next/router';
import Nav from './Nav';

const footerLinks = [
	{ href: '/blog',      label: 'Writing' },
	{ href: '/explore',   label: 'Explorer' },
	{ href: '/customize', label: 'Token Studio' },
	{ href: '/about',     label: 'About' },
	{ href: 'https://github.com/iwritec0de/blockbridge-wp', label: 'GitHub', external: true },
];

export default function Layout({ children }) {
	const router = useRouter();

	return (
		<div className="site-wrapper">
			<Nav />
			<main className="site-main" id="main" key={router.asPath}>
				<div className="page-transition">
					{children}
				</div>
			</main>
			<footer className="site-footer" role="contentinfo">
				<div className="site-footer__inner">
					<div className="site-footer__top">
						<div>
							<Link href="/" className="site-footer__brand">
								BlockBridge
								<span className="site-footer__dot" aria-hidden="true" />
							</Link>
							<div className="site-footer__tagline">
								WordPress Gutenberg blocks rendered as React components.
								<br />
								Open Source &middot; MIT License
							</div>
						</div>
						<nav aria-label="Footer navigation">
							<ul className="site-footer__nav">
								{footerLinks.map(({ href, label, external }) => (
									<li key={href}>
										{external ? (
											<a href={href} target="_blank" rel="noopener noreferrer">
												{label}
											</a>
										) : (
											<Link href={href}>{label}</Link>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className="site-footer__bottom">
						<span>&copy; {new Date().getFullYear()} BlockBridge</span>
						<span className="site-footer__powered">
							Powered by{' '}
							<a
								href="https://github.com/iwritec0de/blockbridge-react"
								target="_blank"
								rel="noopener noreferrer"
							>
								<code>@iwritec0de/blockbridge-react</code>
							</a>
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
