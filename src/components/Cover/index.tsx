import * as React from 'react';
import classNames from 'classnames';

interface CoverProps {
	url?: string;
	dimRatio?: number;
	overlayColor?: string;
	customOverlayColor?: string;
	hasParallax?: boolean;
	focalPoint?: { x: number; y: number };
	minHeight?: number;
	minHeightUnit?: string;
	contentPosition?: string;
	align?: string;
	children?: React.ReactNode;
}

const Cover: React.FC<CoverProps> = (props) => {
	const dimRatio = props.dimRatio ?? 0;
	const hasDim = dimRatio > 0;
	const dimStep = Math.round(dimRatio / 10) * 10;

	const contentPos = props.contentPosition || 'center center';

	const classes = classNames('wp-block-cover', {
		'has-parallax': props.hasParallax,
		'has-custom-content-position': contentPos !== 'center center',
		'is-position-top-left': contentPos === 'top left',
		'is-position-top-center': contentPos === 'top center',
		'is-position-top-right': contentPos === 'top right',
		'is-position-center-left': contentPos === 'center left',
		'is-position-center-right': contentPos === 'center right',
		'is-position-bottom-left': contentPos === 'bottom left',
		'is-position-bottom-center': contentPos === 'bottom center',
		'is-position-bottom-right': contentPos === 'bottom right',
		[`align${props.align}`]: props.align,
	});

	const minHeightUnit = props.minHeightUnit || 'px';
	const outerStyle: React.CSSProperties = {};
	if (props.minHeight != null) {
		outerStyle.minHeight = `${props.minHeight}${minHeightUnit}`;
	}

	const overlayClasses = classNames('wp-block-cover__background', {
		[`has-${props.overlayColor}-background-color`]: props.overlayColor,
		'has-background-dim': hasDim,
		[`has-background-dim-${dimStep}`]: hasDim && dimStep > 0,
	});

	const overlayStyle: React.CSSProperties = {};
	if (props.customOverlayColor) {
		overlayStyle.backgroundColor = props.customOverlayColor;
	}

	const focalX = ((props.focalPoint?.x ?? 0.5) * 100).toFixed(2);
	const focalY = ((props.focalPoint?.y ?? 0.5) * 100).toFixed(2);

	return (
		<div className={classes} style={Object.keys(outerStyle).length ? outerStyle : undefined}>
			{hasDim && (
				<span
					aria-hidden="true"
					className={overlayClasses}
					style={Object.keys(overlayStyle).length ? overlayStyle : undefined}
				/>
			)}
			{props.url && (
				<img
					className="wp-block-cover__image-background"
					alt=""
					aria-hidden="true"
					src={props.url}
					style={{ objectPosition: `${focalX}% ${focalY}%` }}
				/>
			)}
			<div className="wp-block-cover__inner-container">{props.children}</div>
		</div>
	);
};

export default Cover;
