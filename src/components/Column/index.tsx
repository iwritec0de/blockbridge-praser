import * as React from 'react';
import classNames from 'classnames';

interface ColumnProps {
	className?: string;
	children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = (props) => {
	const classes = classNames('wp-block-column', {
		[`${props.className}`]: props.className,
	});

	return <div className={classes}>{props.children}</div>;
};

export default Column;
