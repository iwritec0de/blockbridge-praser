import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface GalleryProps {
	name: string;
	columns?: number;
	caption?: string;
	imageCrop?: boolean;
	linkTo?: string;
	className?: string;
	children?: React.ReactNode;
}

const Gallery: React.FC<GalleryProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
		[`columns-${props.columns}`]: props.columns,
		'is-cropped': props.imageCrop !== false,
	});

	const style: Record<string, string | number> = {};
	if (props.columns) {
		style['--gallery-columns'] = props.columns;
	}

	return (
		<figure className={classes} style={Object.keys(style).length ? style : undefined}>
			<ul className="blocks-gallery-grid">
				{React.Children.map(props.children, (child) => (
					<li className="blocks-gallery-item">{child}</li>
				))}
			</ul>
			{props.caption && (
				<figcaption className="blocks-gallery-caption">{parse(props.caption)}</figcaption>
			)}
		</figure>
	);
};

export default Gallery;
