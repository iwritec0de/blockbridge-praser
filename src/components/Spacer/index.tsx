import * as React from 'react';

interface SpacerProps {
	name: string;
	height?: string | number;
}

const Spacer: React.FC<SpacerProps> = (props) => {
	return <div className="wp-block-spacer" style={{ height: props.height }} aria-hidden="true" />;
};

export default Spacer;
