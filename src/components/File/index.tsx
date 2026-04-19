import * as React from 'react';
import classNames from 'classnames';
import cleanName from '../../Utils/cleanName';
import sanitizeUrl from '../../Utils/sanitizeUrl';

interface FileProps {
	name: string;
	href?: string;
	fileName?: string;
	textLinkHref?: string;
	showDownloadButton?: boolean;
	downloadButtonText?: string;
	className?: string;
}

const File: React.FC<FileProps> = (props) => {
	const classes = classNames('wp-block-' + cleanName(props.name), {
		[`${props.className}`]: props.className,
	});

	const linkHref = sanitizeUrl(props.textLinkHref || props.href || '');
	const downloadHref = sanitizeUrl(props.href || '');

	return (
		<div className={classes}>
			{linkHref && <a href={linkHref}>{props.fileName || props.href}</a>}
			{props.showDownloadButton !== false && downloadHref && (
				<a href={downloadHref} download className="wp-block-file__button">
					{props.downloadButtonText || 'Download'}
				</a>
			)}
		</div>
	);
};

export default File;
