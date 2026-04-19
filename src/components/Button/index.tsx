import * as React from 'react';
import classNames from 'classnames';
import sanitizeUrl from '../../Utils/sanitizeUrl';

interface ButtonProps {
	name: string;
	url?: string;
	text?: string;
	linkTarget?: string;
	rel?: string;
	variant?: 'fill' | 'outline';
	backgroundColor?: string;
	textColor?: string;
	customBackgroundColor?: string;
	customTextColor?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
	const classes = classNames('wp-block-button__link', {
		[`is-style-${props.variant}`]: props.variant,
		[`has-${props.backgroundColor}-background-color`]: props.backgroundColor,
		[`has-${props.textColor}-color`]: props.textColor,
	});

	const style: React.CSSProperties = {
		backgroundColor: props.customBackgroundColor,
		color: props.customTextColor,
	};

	const safeUrl = sanitizeUrl(props.url ?? '');

	const inner = safeUrl ? (
		<a
			href={safeUrl}
			target={props.linkTarget}
			rel={props.rel}
			className={classes}
			style={style}
		>
			{props.text}
		</a>
	) : (
		<span className={classes} style={style}>
			{props.text}
		</span>
	);

	return <div className="wp-block-button">{inner}</div>;
};

export default Button;
