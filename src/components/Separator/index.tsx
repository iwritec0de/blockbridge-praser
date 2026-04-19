import * as React from 'react';
import classNames from 'classnames';

interface SeparatorProps {
	name: string;
	variant?: 'default' | 'wide' | 'dots';
	className?: string;
}

const Separator: React.FC<SeparatorProps> = (props) => {
	const classes = classNames('wp-block-separator', {
		[`${props.className}`]: props.className,
		[`is-style-${props.variant}`]: props.variant && props.variant !== 'default',
	});

	return <hr className={classes} />;
};

export default Separator;
