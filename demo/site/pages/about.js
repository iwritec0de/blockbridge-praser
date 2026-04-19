/**
 * About page — fetches the WP "about" page and renders its blocks.
 */
import { BlockContent } from '@iwritec0de/blockbridge-react';

const WP_API = (typeof window === 'undefined' && process.env.WP_INTERNAL_URL)
	|| process.env.NEXT_PUBLIC_WP_URL
	|| 'http://localhost:8080';

export default function About({ page, error }) {
	if (error || !page) {
		return (
			<>
				<div className="page-header">
					<div className="page-header__inner">
						<div className="page-header__label">About</div>
						<h1>About BlockBridge</h1>
					</div>
				</div>
				<div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
					{error ? (
						<div className="error-box">
							<strong>Could not load page.</strong>
							<p>Start the Docker stack: <code>docker compose up</code></p>
							<pre>{error}</pre>
						</div>
					) : (
						<p className="text-muted">
							The &quot;About&quot; page has not been created in WordPress yet.
							Run the seed script to populate demo content.
						</p>
					)}
				</div>
			</>
		);
	}

	return (
		<>
			<div className="page-header">
				<div className="page-header__inner">
					<div className="page-header__label">About</div>
					<h1>{page.title.rendered}</h1>
				</div>
			</div>
			<div className="post-body">
				{page.serializedBlocks ? (
					<BlockContent blocks={page.serializedBlocks} />
				) : (
					<p className="text-muted">
						No serialized blocks found. Ensure the BlockBridge WP plugin is active.
					</p>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps() {
	try {
		const res = await fetch(`${WP_API}/wp-json/wp/v2/pages?slug=about&_embed`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const pages = await res.json();
		if (!pages.length) return { props: { page: null, error: null } };
		return { props: { page: pages[0], error: null } };
	} catch (err) {
		return { props: { page: null, error: err.message } };
	}
}
