import * as React from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';

interface Cell {
	content: string;
	tag?: string;
	align?: string;
}

interface Row {
	cells: Cell[];
}

interface TableProps {
	name: string;
	head?: Row[];
	body?: Row[];
	foot?: Row[];
	className?: string;
	hasFixedLayout?: boolean;
}

const renderCell = (cell: Cell, rowIndex: number, cellIndex: number) => {
	const Tag = (cell.tag === 'th' ? 'th' : 'td') as React.ElementType;
	const classes = classNames({
		[`has-text-align-${cell.align}`]: cell.align,
	});
	return (
		<Tag key={`${rowIndex}-${cellIndex}`} className={classes || undefined}>
			{parse(cell.content ?? '')}
		</Tag>
	);
};

const renderRows = (rows: Row[]) =>
	rows.map((row, rowIndex) => (
		<tr key={rowIndex}>
			{row.cells.map((cell, cellIndex) => renderCell(cell, rowIndex, cellIndex))}
		</tr>
	));

const Table: React.FC<TableProps> = (props) => {
	const classes = classNames('wp-block-table', {
		[`${props.className}`]: props.className,
	});

	const tableStyle: React.CSSProperties = {
		tableLayout: props.hasFixedLayout ? 'fixed' : undefined,
	};

	const hasHead = props.head && props.head.length > 0;
	const hasFoot = props.foot && props.foot.length > 0;

	return (
		<figure className={classes}>
			<table style={tableStyle}>
				{hasHead && <thead>{renderRows(props.head!)}</thead>}
				{props.body && <tbody>{renderRows(props.body)}</tbody>}
				{hasFoot && <tfoot>{renderRows(props.foot!)}</tfoot>}
			</table>
		</figure>
	);
};

export default Table;
