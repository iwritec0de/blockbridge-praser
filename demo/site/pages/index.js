/**
 * Homepage — featured post hero + recent post list + about strip.
 */
import Link from 'next/link';

// Server-side fetches (getServerSideProps) use WP_INTERNAL_URL when available
// (e.g. http://wordpress:80 inside Docker). Browser-visible URLs in rendered
// content use NEXT_PUBLIC_WP_URL (e.g. http://localhost:8080).
const WP_API = (typeof window === 'undefined' && process.env.WP_INTERNAL_URL)
	|| process.env.NEXT_PUBLIC_WP_URL
	|| 'http://localhost:8080';

function stripTags(html = '') {
	return html.replace(/<[^>]*>/g, '')
		.replace(/&hellip;/g, '\u2026')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#0?39;/g, "'")
		.replace(/&nbsp;/g, '\u00A0')
		.trim();
}

function formatDate(dateStr) {
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric',
	});
}

function readTime(blocks = []) {
	const words = blocks.reduce((acc, b) => acc + (b.content || '').split(/\s+/).length, 0);
	return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// ─── Fallback content when WordPress is offline ─────────────
const FALLBACK_FEATURED = {
	slug: null,
	title: 'How Headless WordPress Changes What\'s Possible for Your Front End',
	excerpt: 'When WordPress handles content and React handles presentation, you get the best of both worlds — a battle-tested CMS with a modern component-driven UI.',
	date: null,
	category: 'Deep Dive',
};

const FALLBACK_POSTS = [
	{ slug: null, title: 'Rendering Every Gutenberg Block as a React Component', category: 'Tutorial', date: null },
	{ slug: null, title: 'Design Tokens Are the Bridge Between CMS and Component', category: 'Design', date: null },
	{ slug: null, title: 'Static Generation with a WordPress Backend', category: 'Performance', date: null },
	{ slug: null, title: 'Writing a Custom Block Renderer for Any Gutenberg Block', category: 'Open Source', date: null },
];

// ─── Components ──────────────────────────────────────────────

function ArrowRight() {
	return (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
			<path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function FeatureHero({ post }) {
	const title   = post?.title?.rendered   ? stripTags(post.title.rendered)   : FALLBACK_FEATURED.title;
	const excerpt = post?.excerpt?.rendered ? stripTags(post.excerpt.rendered) : FALLBACK_FEATURED.excerpt;
	const slug    = post?.slug;

	return (
		<section className="hero" aria-labelledby="feat-title">
			<div className="hero__inner">
				<div className="hero__label">Featured</div>
				<h1 id="feat-title" className="hero__title">
					{slug ? (
						<Link href={`/post/${slug}`}>{title}</Link>
					) : title}
				</h1>
				<p className="hero__deck">{excerpt}</p>
				{post && (
					<div className="hero__meta">
						<time dateTime={post.date}>{formatDate(post.date)}</time>
						<span className="hero__meta-sep" aria-hidden="true">—</span>
						<span>{readTime(post.serializedBlocks)}</span>
					</div>
				)}
				{slug && (
					<Link href={`/post/${slug}`} className="hero__read-link">
						Read the article <ArrowRight />
					</Link>
				)}
				{!post && (
					<div className="error-box" style={{ marginTop: '2rem' }}>
						<strong>WordPress is not reachable.</strong>
						<p>Start the Docker stack: <code>docker compose up</code></p>
					</div>
				)}
			</div>
		</section>
	);
}

function PostItem({ post }) {
	const title   = stripTags(post?.title?.rendered || post.title);
	const excerpt = post?.excerpt?.rendered ? stripTags(post.excerpt.rendered).slice(0, 140) : '';
	const slug    = post?.slug;
	const date    = post?.date ? formatDate(post.date) : null;

	return (
		<article className="post-item">
			<div className="post-item__inner">
				<div>
					{post.category && <div className="post-item__cat">{post.category}</div>}
					<h2 className="post-item__title">
						{slug ? (
							<Link href={`/post/${slug}`}>{title}</Link>
						) : title}
					</h2>
					{excerpt && <p className="post-item__excerpt">{excerpt}</p>}
					{date && (
						<div className="post-item__foot">
							<time dateTime={post.date}>{date}</time>
							<span aria-hidden="true">·</span>
							<span>{readTime(post.serializedBlocks)}</span>
						</div>
					)}
				</div>
				<div className="post-item__thumb" role="img" aria-label="" />
			</div>
		</article>
	);
}

// ─── Page ────────────────────────────────────────────────────

export default function Home({ featured, recentPosts, morePosts, error }) {
	return (
		<>
			<FeatureHero post={featured} />

			<section className="post-list-section" aria-labelledby="recent-label">
				<div className="post-list-section__header">
					<h2 id="recent-label" className="section-label">Recent Posts</h2>
					<Link href="/blog" className="section-all-link">All posts →</Link>
				</div>

				{recentPosts.length > 0 ? (
					recentPosts.map((post) => (
						<PostItem key={post.id || post.title} post={post} />
					))
				) : (
					FALLBACK_POSTS.map((post) => (
						<PostItem key={post.title} post={post} />
					))
				)}
			</section>

			<div className="about-strip">
				<div className="about-strip__inner">
					<div>
						<div className="about-strip__eyebrow">About This Site</div>
						<p className="about-strip__text">
							Powered by real WordPress content — serialized by the{' '}
							<code>blockbridge-wp</code> PHP plugin and rendered by{' '}
							<code>@iwritec0de/blockbridge-react</code>.
							Every post is a Gutenberg block tree rendered as React components.
						</p>
					</div>
					<div className="about-strip__links">
						<a
							href="https://github.com/iwritec0de/blockbridge-wp"
							className="about-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							blockbridge-wp
						</a>
						<a
							href="https://github.com/iwritec0de/blockbridge-react"
							className="about-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							blockbridge-react
						</a>
						<Link href="/about" className="about-link">About this demo</Link>
					</div>
				</div>
			</div>

			{morePosts.length > 0 && (
				<section className="more-grid-section" aria-labelledby="more-label">
					<div className="post-list-section__header" style={{ marginBottom: '0' }}>
						<h2 id="more-label" className="section-label">More to Read</h2>
					</div>
					<div className="more-grid" style={{ marginTop: '1.5rem' }} role="list">
						{morePosts.map((post) => {
							const title = stripTags(post.title?.rendered || '');
							return (
								<article className="more-grid-item" key={post.id} role="listitem">
									<div className="more-grid-item__cat">
										{post.categories?.[0] ? 'WordPress' : 'Post'}
									</div>
									<h3 className="more-grid-item__title">
										<Link href={`/post/${post.slug}`}>{title}</Link>
									</h3>
									<div className="more-grid-item__meta">
										<time dateTime={post.date}>{formatDate(post.date)}</time>
									</div>
								</article>
							);
						})}
					</div>
				</section>
			)}
		</>
	);
}

export async function getServerSideProps() {
	try {
		const res = await fetch(`${WP_API}/wp-json/wp/v2/posts?per_page=12&_embed`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const posts = await res.json();

		const [featured, ...rest] = posts;
		const recentPosts = rest.slice(0, 4);
		const morePosts   = rest.slice(4, 10);

		return { props: { featured: featured || null, recentPosts, morePosts, error: null } };
	} catch (err) {
		return { props: { featured: null, recentPosts: [], morePosts: [], error: err.message } };
	}
}
