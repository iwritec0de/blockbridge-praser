/**
 * Blog listing — card-style post layout with category filter,
 * excerpts, featured images, and dates.
 */
import Link from 'next/link';
import { useState, useMemo } from 'react';

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
		year: 'numeric', month: 'short', day: 'numeric',
	});
}

function readTime(blocks = []) {
	const words = blocks.reduce((acc, b) => acc + (b.content || '').split(/\s+/).length, 0);
	return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// Derive a display category from WP tags/categories (best-effort).
function getCategory(post) {
	const embedded = post?._embedded?.['wp:term']?.[0];
	return embedded?.[0]?.name ?? '';
}

// Extract featured image URL from _embedded data.
function getFeaturedImage(post) {
	const media = post?._embedded?.['wp:featuredmedia']?.[0];
	if (!media) return null;
	// Prefer medium_large or medium size, fall back to full
	const sizes = media?.media_details?.sizes;
	return (
		sizes?.medium_large?.source_url ||
		sizes?.medium?.source_url ||
		media?.source_url ||
		null
	);
}

function PostCard({ post, featured }) {
	const title   = stripTags(post.title.rendered);
	const excerpt = stripTags(post.excerpt?.rendered ?? '').slice(0, 180);
	const cat     = getCategory(post);
	const image   = getFeaturedImage(post);
	const date    = formatDate(post.date);
	const time    = readTime(post.serializedBlocks);

	if (featured) {
		return (
			<article className="blog-card blog-card--featured">
				{image && (
					<Link href={`/post/${post.slug}`} className="blog-card__image-link" tabIndex={-1}>
						<img
							src={image}
							alt=""
							className="blog-card__image"
							loading="lazy"
						/>
					</Link>
				)}
				<div className="blog-card__body">
					{cat && <div className="blog-card__cat">{cat}</div>}
					<h2 className="blog-card__title blog-card__title--featured">
						<Link href={`/post/${post.slug}`}>{title}</Link>
					</h2>
					{excerpt && (
						<p className="blog-card__excerpt">{excerpt}{excerpt.length >= 180 ? '...' : ''}</p>
					)}
					<div className="blog-card__meta">
						<time dateTime={post.date}>{date}</time>
						<span aria-hidden="true">&middot;</span>
						<span>{time}</span>
					</div>
				</div>
			</article>
		);
	}

	return (
		<article className="blog-card">
			{image && (
				<Link href={`/post/${post.slug}`} className="blog-card__image-link" tabIndex={-1}>
					<img
						src={image}
						alt=""
						className="blog-card__image"
						loading="lazy"
					/>
				</Link>
			)}
			<div className="blog-card__body">
				{cat && <div className="blog-card__cat">{cat}</div>}
				<h2 className="blog-card__title">
					<Link href={`/post/${post.slug}`}>{title}</Link>
				</h2>
				{excerpt && (
					<p className="blog-card__excerpt">{excerpt}{excerpt.length >= 180 ? '...' : ''}</p>
				)}
				<div className="blog-card__meta">
					<time dateTime={post.date}>{date}</time>
					<span aria-hidden="true">&middot;</span>
					<span>{time}</span>
				</div>
			</div>
		</article>
	);
}

export default function Blog({ posts, error }) {
	// Derive category filters from actual post data
	const categories = useMemo(() => {
		const cats = new Set();
		for (const p of posts) {
			const cat = getCategory(p);
			if (cat && cat !== 'Uncategorized') cats.add(cat);
		}
		return [...cats].sort();
	}, [posts]);

	const [active, setActive] = useState('All');

	const visible = useMemo(() => {
		if (active === 'All') return posts;
		return posts.filter((p) => {
			const cat = getCategory(p).toLowerCase();
			return cat.includes(active.toLowerCase());
		});
	}, [posts, active]);

	if (error) {
		return (
			<>
				<div className="page-header">
					<div className="page-header__inner">
						<div className="page-header__label">All Posts</div>
						<h1>Writing</h1>
					</div>
				</div>
				<div className="container" style={{ paddingTop: '2rem' }}>
					<div className="error-box">
						<strong>Could not load posts.</strong>
						<p>Start the Docker stack: <code>docker compose up</code></p>
						<pre>{error}</pre>
					</div>
				</div>
			</>
		);
	}

	const [featuredPost, ...restPosts] = visible;

	return (
		<>
			<div className="page-header">
				<div className="page-header__inner">
					<div className="page-header__label">All Posts</div>
					<h1>Writing</h1>
					<p className="page-header__desc">
						Posts on headless WordPress, React, Gutenberg, and the BlockBridge ecosystem.
					</p>
				</div>
			</div>

			{categories.length > 0 && (
				<div className="filter-bar" role="navigation" aria-label="Filter posts by category">
					<div className="filter-bar__inner">
						{['All', ...categories].map((f) => (
							<button
								key={f}
								className={`filter-btn${active === f ? ' filter-btn--active' : ''}`}
								aria-pressed={active === f}
								onClick={() => setActive(f)}
							>
								{f}
							</button>
						))}
					</div>
				</div>
			)}

			<div className="blog-listing">
				{visible.length === 0 ? (
					<div className="empty-state" style={{ marginTop: '2rem' }}>
						<p>No posts found{active !== 'All' ? ` in "${active}"` : ''}.</p>
					</div>
				) : (
					<>
						{/* Featured first post */}
						{featuredPost && (
							<PostCard post={featuredPost} featured />
						)}

						{/* Card grid for the rest */}
						{restPosts.length > 0 && (
							<div className="blog-grid">
								{restPosts.map((post) => (
									<PostCard key={post.id} post={post} />
								))}
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps() {
	try {
		const res = await fetch(`${WP_API}/wp-json/wp/v2/posts?per_page=20&_embed`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const posts = await res.json();
		return { props: { posts, error: null } };
	} catch (err) {
		return { props: { posts: [], error: err.message } };
	}
}
