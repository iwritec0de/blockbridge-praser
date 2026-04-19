import * as React from 'react';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface MediaTextProps {
	name: string;
	className?: string;
	mediaWidth?: number;
	media?: string;
	altText?: string;
	children?: React.ReactNode;
}

const MediaText: React.FC<MediaTextProps> = (props) => {
	const blockName = 'wp-block-' + cleanName(props.name);
	const classes = classNames(blockName, {
		[`${props.className}`]: props.className,
	});
	const styles: React.CSSProperties = {
		gridTemplateColumns: props.mediaWidth ? props.mediaWidth + '% auto' : undefined,
	};
	return (
		<div className={classes} style={styles}>
			<figure className={blockName + '__media'}>
				{props.media && <img src={props.media} alt={props.altText ?? ''} />}
			</figure>
			<div className={blockName + '__content'}>{props.children}</div>
		</div>
	);
};

export default MediaText;
