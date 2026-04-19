/**
 * Single post — post header + BlockContent body + prev/next nav.
 */
import Link from 'next/link';
import BlockRenderer from '../../components/BlockRenderer';

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

function getCategory(post) {
	return post?._embedded?.['wp:term']?.[0]?.[0]?.name ?? '';
}

function getTags(post) {
	return post?._embedded?.['wp:term']?.[1] ?? [];
}

function BackArrow() {
	return (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
			<path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export default function Post({ post, prevPost, nextPost, error }) {
	if (error || !post) {
		return (
			<>
				<div className="post-back">
					<Link href="/blog"><BackArrow /> All posts</Link>
				</div>
				<div className="container" style={{ paddingTop: '2rem' }}>
					<div className="error-box">
						<strong>Post not found.</strong>
						{error && <pre>{error}</pre>}
					</div>
				</div>
			</>
		);
	}

	const title   = stripTags(post.title.rendered);
	const excerpt = stripTags(post.excerpt?.rendered ?? '');
	const cat     = getCategory(post);
	const tags    = getTags(post);
	const date    = formatDate(post.date);
	const time    = readTime(post.serializedBlocks);

	return (
		<>
			<div className="post-back">
				<Link href="/blog"><BackArrow /> All posts</Link>
			</div>

			<header className="post-header">
				{cat && <div className="post-header__cat">{cat}</div>}
				<h1>{title}</h1>
				{excerpt && <p className="post-header__deck">{excerpt}</p>}
				<div className="meta">
					<time dateTime={post.date}>{date}</time>
					<span className="meta__sep" aria-hidden="true">—</span>
					<span>{time}</span>
				</div>
			</header>

			<article className="post-body">
				{post.serializedBlocks ? (
					<BlockRenderer serializedBlocks={post.serializedBlocks} />
				) : (
					<p className="text-muted">
						No serialized blocks found. Ensure the BlockBridge WP plugin is active.
					</p>
				)}
			</article>

			<div className="post-footer">
				{tags.length > 0 && (
					<div className="post-footer__tags">
						{tags.map((tag) => (
							<span key={tag.id} className="post-tag">{tag.name}</span>
						))}
					</div>
				)}

				{(prevPost || nextPost) && (
					<nav className="post-nav" aria-label="Post navigation">
						{prevPost ? (
							<div className="post-nav__item">
								<Link href={`/post/${prevPost.slug}`}>
									<div className="post-nav__dir">← Previous</div>
									<div className="post-nav__title">
										{stripTags(prevPost.title.rendered)}
									</div>
								</Link>
							</div>
						) : <div />}

						{nextPost ? (
							<div className="post-nav__item post-nav__item--next">
								<Link href={`/post/${nextPost.slug}`}>
									<div className="post-nav__dir">Next →</div>
									<div className="post-nav__title">
										{stripTags(nextPost.title.rendered)}
									</div>
								</Link>
							</div>
						) : <div />}
					</nav>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps({ params }) {
	try {
		const res = await fetch(
			`${WP_API}/wp-json/wp/v2/posts?slug=${encodeURIComponent(params.slug)}&_embed`
		);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const posts = await res.json();
		if (!posts.length) return { notFound: true };

		const post = posts[0];

		// Fetch all posts to derive prev/next by date order
		const allRes  = await fetch(`${WP_API}/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc`);
		let prevPost  = null;
		let nextPost  = null;

		if (allRes.ok) {
			const allPosts = await allRes.json();
			const idx = allPosts.findIndex((p) => p.id === post.id);
			if (idx !== -1) {
				prevPost = allPosts[idx + 1] ?? null; // older
				nextPost = allPosts[idx - 1] ?? null; // newer
			}
		}

		return { props: { post, prevPost, nextPost, error: null } };
	} catch (err) {
		return { props: { post: null, prevPost: null, nextPost: null, error: err.message } };
	}
}
