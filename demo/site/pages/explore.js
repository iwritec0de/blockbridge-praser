/**
 * Block Explorer — organized by block type with a sidebar table of contents.
 * Each block type section shows the rendered output + a brief description
 * of the attributes being demonstrated.
 */
import { useState, useMemo, useEffect, useRef } from 'react';
import { BlockContent } from '@iwritec0de/blockbridge-react';
import CodeBlock from '../components/CodeBlock';

const WP_API = (typeof window === 'undefined' && process.env.WP_INTERNAL_URL)
	|| process.env.NEXT_PUBLIC_WP_URL
	|| 'http://localhost:8080';

// Human-friendly labels and descriptions for Gutenberg block types
const BLOCK_META = {
	'core/heading':        { label: 'Heading',        desc: 'Demonstrates heading levels (h1-h6), text alignment, and font size presets.' },
	'core/paragraph':      { label: 'Paragraph',      desc: 'Rich text paragraphs with alignment, drop caps, font size, and custom colors.' },
	'core/image':          { label: 'Image',           desc: 'Images with captions, alignment options, linked images, and custom dimensions.' },
	'core/list':           { label: 'List',            desc: 'Ordered and unordered lists with nested items.' },
	'core/list-item':      { label: 'List Item',       desc: 'Individual list items within list blocks.' },
	'core/quote':          { label: 'Quote',           desc: 'Blockquotes with citations, including the large style variant.' },
	'core/buttons':        { label: 'Buttons',         desc: 'Button groups with layout options and fill/outline style variants.' },
	'core/button':         { label: 'Button',          desc: 'Individual buttons with custom colors, border radius, and link targets.' },
	'core/group':          { label: 'Group',           desc: 'Container block for grouping other blocks with background colors and padding.' },
	'core/columns':        { label: 'Columns',         desc: 'Multi-column layouts with configurable column widths.' },
	'core/column':         { label: 'Column',          desc: 'Individual column within a columns block, with width attributes.' },
	'core/media-text':     { label: 'Media & Text',    desc: 'Side-by-side media and text content with configurable media width.' },
	'core/separator':      { label: 'Separator',       desc: 'Horizontal rule with default, wide, and dots style variants.' },
	'core/spacer':         { label: 'Spacer',          desc: 'Vertical spacing block with configurable height.' },
	'core/gallery':        { label: 'Gallery',         desc: 'Image galleries with configurable columns, cropping, and captions.' },
	'core/table':          { label: 'Table',           desc: 'Data tables with header/footer rows and striped style variant.' },
	'core/video':          { label: 'Video',           desc: 'Self-hosted video with autoplay, loop, muted, and controls attributes.' },
	'core/audio':          { label: 'Audio',           desc: 'Self-hosted audio with autoplay and loop attributes.' },
	'core/embed':          { label: 'Embed',           desc: 'oEmbed content (YouTube, Twitter, etc.) with responsive aspect ratios.' },
	'core/file':           { label: 'File',            desc: 'Downloadable file with filename display and download button.' },
	'core/cover':          { label: 'Cover',           desc: 'Cover image/video with overlay color, opacity, and inner content.' },
	'core/code':           { label: 'Code',            desc: 'Preformatted code block preserving whitespace and indentation.' },
	'core/preformatted':   { label: 'Preformatted',    desc: 'Preformatted text preserving spacing and line breaks.' },
	'core/pullquote':      { label: 'Pullquote',       desc: 'Highlighted pull quote with citation, custom colors, and border.' },
	'core/verse':          { label: 'Verse',           desc: 'Poetry/verse block preserving line breaks and whitespace.' },
	'core/freeform':       { label: 'Classic Editor',  desc: 'Classic editor content (pre-Gutenberg HTML).' },
	'core/html':           { label: 'Custom HTML',     desc: 'Raw HTML block rendered directly.' },
	'core/more':           { label: 'More',            desc: 'Read-more separator that truncates content in archives.' },
	'core/nextpage':       { label: 'Page Break',      desc: 'Page break for multi-page posts.' },
};

// Blocks that are typically containers (shown as part of their parent, not standalone)
const CONTAINER_ONLY = new Set(['core/column', 'core/list-item', 'core/button']);

/**
 * Group the flat block array by type. Each block gets slotted under its blockName.
 * Returns Map<blockName, block[]>
 */
function groupBlocksByType(blocks) {
	const map = new Map();

	function walk(blockList) {
		for (const block of blockList) {
			if (!block.name) continue;
			if (!map.has(block.name)) {
				map.set(block.name, []);
			}
			map.get(block.name).push(block);
			// Also recurse into children so we pick up child types
			if (block.children?.length) {
				walk(block.children);
			}
		}
	}

	walk(blocks);
	return map;
}

/**
 * Create a slug from a block name for anchor linking.
 */
function toSlug(blockName) {
	return blockName.replace('/', '-');
}

function TOCSidebar({ blockTypes, activeSlug }) {
	return (
		<aside className="explorer-toc" aria-label="Block type navigation">
			<div className="explorer-toc__header">Block Types</div>
			<nav>
				<ul className="explorer-toc__list">
					{blockTypes.map(([name]) => {
						const meta = BLOCK_META[name];
						const label = meta?.label || name.replace('core/', '').replace(/-/g, ' ');
						const slug = toSlug(name);
						return (
							<li key={name}>
								<a
									href={`#${slug}`}
									className={`explorer-toc__link${activeSlug === slug ? ' explorer-toc__link--active' : ''}`}
								>
									{label}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}

function BlockTypeSection({ blockName, blocks, showJSON }) {
	const meta = BLOCK_META[blockName];
	const label = meta?.label || blockName.replace('core/', '').replace(/-/g, ' ');
	const desc = meta?.desc || `Demonstrates the ${blockName} block.`;
	const slug = toSlug(blockName);

	// Only render the first instance (or up to 2 for variety)
	const samples = blocks.slice(0, 2);

	return (
		<section className="explorer-section" id={slug}>
			<div className="explorer-section__header">
				<h2 className="explorer-section__title">{label}</h2>
				<code className="explorer-section__name">{blockName}</code>
			</div>
			<p className="explorer-section__desc">{desc}</p>

			{samples.map((block, i) => (
				<div className="explorer-section__sample" key={i}>
					<div className="explorer-section__render">
						<BlockContent blocks={[block]} />
					</div>
					{showJSON && (
						<div className="explorer-section__json">
							<CodeBlock
								code={JSON.stringify(block, null, 2)}
								language="json"
								title={`${blockName} — serialized data`}
							/>
						</div>
					)}
				</div>
			))}
		</section>
	);
}

export default function Explore({ page, error }) {
	const [showJSON, setShowJSON] = useState(false);
	const [activeSlug, setActiveSlug] = useState('');
	const [tocOpen, setTocOpen] = useState(false);
	const contentRef = useRef(null);

	const blocks = page?.serializedBlocks || [];

	// Group blocks by type, excluding container-only types
	const blockTypeMap = useMemo(() => {
		const map = groupBlocksByType(blocks);
		// Remove container-only types from top-level display
		for (const name of CONTAINER_ONLY) {
			map.delete(name);
		}
		return [...map.entries()];
	}, [blocks]);

	// Intersection observer for active TOC item
	useEffect(() => {
		if (!contentRef.current || blockTypeMap.length === 0) return;

		const sections = contentRef.current.querySelectorAll('.explorer-section');
		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSlug(entry.target.id);
						break;
					}
				}
			},
			{ rootMargin: '-80px 0px -60% 0px', threshold: 0 }
		);

		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	}, [blockTypeMap]);

	if (error || !page) {
		return (
			<div className="container">
				<div className="page-header">
					<div className="page-header__inner">
						<div className="page-header__label">Reference</div>
						<h1>Block Explorer</h1>
					</div>
				</div>
				{error ? (
					<div className="error-box">
						<strong>Could not load page.</strong>
						<p>Start the Docker stack: <code>docker compose up</code></p>
						<pre>{error}</pre>
					</div>
				) : (
					<p className="text-muted" style={{ padding: '2rem 0 4rem' }}>
						The &quot;Block Explorer&quot; page has not been created in WordPress yet.
						Run the seed script to populate demo content.
					</p>
				)}
			</div>
		);
	}

	return (
		<>
			<div className="page-header">
				<div className="page-header__inner">
					<div className="page-header__label">Reference</div>
					<h1>Block Explorer</h1>
					<p className="page-header__desc">
						Browse every Gutenberg block type rendered by BlockBridge.
						{blockTypeMap.length > 0 && (
							<>
								{' '}Showing <strong>{blockTypeMap.length}</strong> block types
								from <strong>{blocks.length}</strong> total blocks.
							</>
						)}
					</p>
				</div>
			</div>

			<div className="explorer-layout">
				{/* Mobile TOC toggle */}
				<button
					className="explorer-toc-toggle"
					onClick={() => setTocOpen(!tocOpen)}
					aria-expanded={tocOpen}
				>
					{tocOpen ? 'Hide' : 'Show'} block types ({blockTypeMap.length})
					<svg
						className={`explorer-toc-toggle__chevron${tocOpen ? ' explorer-toc-toggle__chevron--open' : ''}`}
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						aria-hidden="true"
					>
						<path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>

				{/* TOC sidebar (collapsible on mobile) */}
				<div className={`explorer-toc-wrapper${tocOpen ? ' explorer-toc-wrapper--open' : ''}`}>
					<TOCSidebar blockTypes={blockTypeMap} activeSlug={activeSlug} />
				</div>

				<div className="explorer-content" ref={contentRef}>
					<div className="explorer__toolbar">
						<button
							className={`btn ${showJSON ? 'btn--primary' : 'btn--secondary'}`}
							onClick={() => setShowJSON(!showJSON)}
						>
							{showJSON ? 'Hide JSON' : 'Show Block JSON'}
						</button>
						<span className="explorer__count">
							{blockTypeMap.length} block type{blockTypeMap.length !== 1 ? 's' : ''}
						</span>
					</div>

					{blockTypeMap.length > 0 ? (
						blockTypeMap.map(([name, typeBlocks]) => (
							<BlockTypeSection
								key={name}
								blockName={name}
								blocks={typeBlocks}
								showJSON={showJSON}
							/>
						))
					) : (
						<p className="text-muted" style={{ padding: '2rem 0' }}>
							No serialized blocks found. Ensure the BlockBridge WP plugin is active.
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	try {
		const res = await fetch(`${WP_API}/wp-json/wp/v2/pages?slug=block-explorer&_embed`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const pages = await res.json();
		if (!pages.length) return { props: { page: null, error: null } };
		return { props: { page: pages[0], error: null } };
	} catch (err) {
		return { props: { page: null, error: err.message } };
	}
}
