import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface ParagraphProps {
	name: string;
	className?: string;
	textColor?: string;
	customTextColor?: string;
	dropCap?: boolean;
	fontSize?: string;
	backgroundColor?: string;
	customBackgroundColor?: string;
	align?: string;
	customFontSize?: string | number;
	content?: string;
}

const Paragraph: React.FC<ParagraphProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
		'has-text-color': props.textColor || props.customTextColor,
		'has-drop-cap': props.dropCap,
		[`has-${props.textColor}-color`]: props.textColor,
		[`has-${props.fontSize}-font-size`]: props.fontSize,
		[`has-${props.backgroundColor}-background-color`]: props.backgroundColor,
		'has-background': props.backgroundColor || props.customBackgroundColor,
	});

	const styles: React.CSSProperties = {
		textAlign: props.align as React.CSSProperties['textAlign'],
		fontSize: props.customFontSize,
		backgroundColor: props.customBackgroundColor,
		color: props.customTextColor,
	};

	return (
		<p style={styles} className={classes}>
			{parse(props.content ?? '')}
		</p>
	);
};

export default Paragraph;
