import * as React from 'react';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface ButtonsProps {
	name: string;
	className?: string;
	layout?: { type?: string; justifyContent?: string };
	children?: React.ReactNode;
}

const Buttons: React.FC<ButtonsProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
	});

	const style: React.CSSProperties = {};
	if (props.layout?.justifyContent) {
		style.justifyContent = props.layout.justifyContent;
	}

	return (
		<div className={classes} style={Object.keys(style).length ? style : undefined}>
			{props.children}
		</div>
	);
};

export default Buttons;
