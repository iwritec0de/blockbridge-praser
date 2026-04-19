import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';
import sanitizeUrl from '../../Utils/sanitizeUrl';

interface VideoProps {
	name: string;
	src?: string;
	caption?: string;
	controls?: boolean;
	autoplay?: boolean;
	loop?: boolean;
	muted?: boolean;
	poster?: string;
	className?: string;
}

const Video: React.FC<VideoProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
	});

	const safeSrc = sanitizeUrl(props.src ?? '');
	const safePoster = sanitizeUrl(props.poster ?? '');

	return (
		<figure className={classes}>
			<video
				src={safeSrc || undefined}
				controls={props.controls ?? true}
				autoPlay={props.autoplay}
				loop={props.loop}
				muted={props.muted}
				poster={safePoster || undefined}
			/>
			{props.caption && <figcaption>{parse(props.caption)}</figcaption>}
		</figure>
	);
};

export default Video;
