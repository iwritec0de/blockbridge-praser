import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';
import sanitizeUrl from '../../Utils/sanitizeUrl';

interface ImageProps {
	name: string;
	src?: string;
	alt?: string;
	caption?: string;
	href?: string;
	width?: number;
	height?: number;
	className?: string;
	align?: string;
	sizeSlug?: string;
}

const Image: React.FC<ImageProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
		[`align${props.align}`]: props.align,
		[`size-${props.sizeSlug}`]: props.sizeSlug,
	});

	const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
		src: props.src || undefined,
		alt: props.alt ?? '',
	};

	if (props.width !== undefined) {
		imgProps.width = props.width;
	}
	if (props.height !== undefined) {
		imgProps.height = props.height;
	}

	const img = <img {...imgProps} />;

	const safeHref = props.href ? sanitizeUrl(props.href) : '';
	const imageOrLink = safeHref ? <a href={safeHref}>{img}</a> : img;

	return (
		<figure className={classes}>
			{imageOrLink}
			{props.caption && <figcaption>{parse(props.caption)}</figcaption>}
		</figure>
	);
};

export default Image;
