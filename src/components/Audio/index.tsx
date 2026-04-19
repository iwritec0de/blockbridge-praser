import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';
import sanitizeUrl from '../../Utils/sanitizeUrl';

interface AudioProps {
	name: string;
	src?: string;
	caption?: string;
	autoplay?: boolean;
	loop?: boolean;
	preload?: string;
	className?: string;
}

const Audio: React.FC<AudioProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
	});

	const safeSrc = sanitizeUrl(props.src ?? '');

	return (
		<figure className={classes}>
			<audio
				src={safeSrc || undefined}
				controls
				autoPlay={props.autoplay}
				loop={props.loop}
				preload={props.preload}
			/>
			{props.caption && <figcaption>{parse(props.caption)}</figcaption>}
		</figure>
	);
};

export default Audio;
