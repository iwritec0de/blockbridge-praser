import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';

interface VerseProps {
	name: string;
	content?: string;
	textColor?: string;
	customTextColor?: string;
	className?: string;
}

const Verse: React.FC<VerseProps> = (props) => {
	const classes = classNames('wp-block-verse', {
		[`${props.className}`]: props.className,
		'has-text-color': props.textColor || props.customTextColor,
		[`has-${props.textColor}-color`]: props.textColor,
	});

	const style: React.CSSProperties = {};
	if (props.customTextColor) {
		style.color = props.customTextColor;
	}

	return (
		<pre className={classes} style={Object.keys(style).length ? style : undefined}>
			{parse(props.content ?? '')}
		</pre>
	);
};

export default Verse;
