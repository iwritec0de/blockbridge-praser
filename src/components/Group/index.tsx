import * as React from 'react';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';

interface GroupProps {
	name: string;
	layout?: { type?: string };
	className?: string;
	children?: React.ReactNode;
}

const Group: React.FC<GroupProps> = (props) => {
	const layoutType = props.layout?.type;
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
		[`wp-block-group--${layoutType}`]: layoutType,
	});

	return <div className={classes}>{props.children}</div>;
};

export default Group;
