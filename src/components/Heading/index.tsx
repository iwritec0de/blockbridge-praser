import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HEADING_TAGS: readonly HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const isHeadingTag = (value: unknown): value is HeadingTag =>
	typeof value === 'string' && (HEADING_TAGS as readonly string[]).includes(value);

interface HeadingProps {
	name: string;
	/** Heading tag to render (e.g. 'h2'). Set by the PHP plugin from block `level`. */
	mark?: HeadingTag;
	className?: string;
	textColor?: string;
	customTextColor?: string;
	fontSize?: string;
	align?: string;
	textAlign?: string;
	customFontSize?: string | number;
	content?: string;
	anchor?: string;
}

const Heading: React.FC<HeadingProps> = (props) => {
	const alignment = props.textAlign || props.align;
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
		'has-text-color': props.textColor || props.customTextColor,
		[`has-${props.textColor}-color`]: props.textColor,
		[`has-${props.fontSize}-font-size`]: props.fontSize,
		[`has-text-align-${alignment}`]: alignment,
	});

	const styles: React.CSSProperties = {
		textAlign: alignment as React.CSSProperties['textAlign'],
		fontSize: props.customFontSize,
		color: props.customTextColor,
	};

	const tag: HeadingTag = isHeadingTag(props.mark) ? props.mark : 'h2';

	return React.createElement(
		tag,
		{ style: styles, className: classes, id: props.anchor },
		parse(props.content ?? '')
	);
};

export default Heading;
