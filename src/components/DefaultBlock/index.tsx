import React, { Fragment } from 'react';
import parse from 'html-react-parser';

interface DefaultBlockProps {
	content?: string;
}

const DefaultBlock: React.FC<DefaultBlockProps> = (props) => {
	return <Fragment>{parse(props.content ?? '')}</Fragment>;
};

export default DefaultBlock;
