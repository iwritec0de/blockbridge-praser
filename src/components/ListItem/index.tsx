import * as React from 'react';
import parse from 'html-react-parser';

interface ListItemProps {
	name: string;
	content?: string;
	children?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = (props) => {
	return (
		<li>
			{parse(props.content ?? '')}
			{props.children}
		</li>
	);
};

export default ListItem;
