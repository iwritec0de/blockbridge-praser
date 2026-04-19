import * as React from 'react';
import classNames from 'classnames';

interface ColumnsProps {
	className?: string;
	children?: React.ReactNode;
}

const Columns: React.FC<ColumnsProps> = (props) => {
	const classes = classNames('wp-block-columns', {
		[`${props.className}`]: props.className,
	});

	return <div className={classes}>{props.children}</div>;
};

export default Columns;
