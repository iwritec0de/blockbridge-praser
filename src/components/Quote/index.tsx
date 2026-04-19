import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface QuoteProps {
	name: string;
	content?: string;
	citation?: string;
	className?: string;
	align?: string;
	children?: React.ReactNode;
}

const Quote: React.FC<QuoteProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
		[`align${props.align}`]: props.align,
	});

	return (
		<blockquote className={classes}>
			{props.children}
			{props.citation && <cite>{parse(props.citation)}</cite>}
		</blockquote>
	);
};

export default Quote;
