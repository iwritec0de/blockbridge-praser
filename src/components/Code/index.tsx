import * as React from 'react';
import classNames from 'classnames';

interface CodeProps {
	name: string;
	content?: string;
	className?: string;
}

const Code: React.FC<CodeProps> = (props) => {
	const classes = classNames('wp-block-code', {
		[`${props.className}`]: props.className,
	});

	return (
		<pre className={classes}>
			<code>{props.content}</code>
		</pre>
	);
};

export default Code;
