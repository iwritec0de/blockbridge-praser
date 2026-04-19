import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';
import sanitizeUrl from '../../Utils/sanitizeUrl';

interface EmbedProps {
	name: string;
	url?: string;
	providerNameSlug?: string;
	type?: string;
	responsive?: boolean;
	caption?: string;
	className?: string;
}

/**
 * Build an embed URL suitable for an iframe src from a standard page URL.
 */
const getEmbedUrl = (url: string, provider: string): string => {
	const safe = sanitizeUrl(url);
	if (!safe) return '';

	if (provider === 'youtube') {
		const match = safe.match(
			/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
		);
		if (match) return `https://www.youtube.com/embed/${match[1]}`;
	}

	if (provider === 'vimeo') {
		const match = safe.match(/vimeo\.com\/(\d+)/);
		if (match) return `https://player.vimeo.com/video/${match[1]}`;
	}

	return safe;
};

const VIDEO_PROVIDERS = ['youtube', 'vimeo'];

const Embed: React.FC<EmbedProps> = (props) => {
	const { name, url = '', providerNameSlug = '', responsive = true, caption, className } = props;

	const provider = providerNameSlug.toLowerCase();
	const safeUrl = sanitizeUrl(url);

	const classes = classNames('wp-block-' + cleanName(name), {
		[`is-type-${props.type}`]: props.type,
		[`is-provider-${provider}`]: provider,
		'wp-block-embed--responsive': responsive && VIDEO_PROVIDERS.includes(provider),
		[`${className}`]: className,
	});

	const renderContent = () => {
		if (!safeUrl) return null;

		// Twitter / X — render a blockquote with a link.
		if (provider === 'twitter') {
			return (
				<blockquote className="wp-block-embed__twitter">
					<a href={safeUrl} target="_blank" rel="noopener noreferrer">
						{safeUrl}
					</a>
				</blockquote>
			);
		}

		// YouTube / Vimeo — responsive iframe.
		if (VIDEO_PROVIDERS.includes(provider)) {
			const embedSrc = getEmbedUrl(safeUrl, provider);
			if (!embedSrc) return null;

			return (
				<div className="wp-block-embed__wrapper">
					<iframe
						src={embedSrc}
						allowFullScreen
						title={`${provider} embed`}
						loading="lazy"
					/>
				</div>
			);
		}

		// Generic — plain iframe.
		return (
			<div className="wp-block-embed__wrapper">
				<iframe src={safeUrl} title="Embedded content" loading="lazy" />
			</div>
		);
	};

	return (
		<figure className={classes}>
			{renderContent()}
			{caption && <figcaption>{parse(caption)}</figcaption>}
		</figure>
	);
};

export default Embed;
