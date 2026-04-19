import * as React from 'react';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface ListProps {
	name: string;
	ordered?: boolean;
	className?: string;
	children?: React.ReactNode;
}

const List: React.FC<ListProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
	});

	const Tag = props.ordered ? 'ol' : 'ul';

	return <Tag className={classes}>{props.children}</Tag>;
};

export default List;
