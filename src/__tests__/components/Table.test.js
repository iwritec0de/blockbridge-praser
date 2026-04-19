import React from 'react';
import { render } from '@testing-library/react';
import Table from '../../components/Table';

const bodyRows = [
	{
		cells: [
			{ content: 'Alice', tag: 'td', align: '' },
			{ content: '30', tag: 'td', align: '' },
		],
	},
];
const headRows = [
	{
		cells: [
			{ content: 'Name', tag: 'th', align: '' },
			{ content: 'Age', tag: 'th', align: '' },
		],
	},
];

describe('Table', () => {
	it('renders a table element', () => {
		const { container } = render(<Table name="core/table" body={bodyRows} />);
		expect(container.querySelector('table')).toBeTruthy();
	});

	it('renders tbody with body rows', () => {
		const { container } = render(<Table name="core/table" body={bodyRows} />);
		expect(container.querySelector('tbody')).toBeTruthy();
		expect(container.querySelector('td').textContent).toBe('Alice');
	});

	it('renders thead when head rows provided', () => {
		const { container } = render(<Table name="core/table" head={headRows} body={bodyRows} />);
		expect(container.querySelector('thead')).toBeTruthy();
		expect(container.querySelector('th').textContent).toBe('Name');
	});

	it('omits thead when head is empty', () => {
		const { container } = render(<Table name="core/table" head={[]} body={bodyRows} />);
		expect(container.querySelector('thead')).toBeNull();
	});

	it('omits tfoot when foot is empty', () => {
		const { container } = render(<Table name="core/table" body={bodyRows} foot={[]} />);
		expect(container.querySelector('tfoot')).toBeNull();
	});

	it('applies wp-block-table class to figure wrapper', () => {
		const { container } = render(<Table name="core/table" body={bodyRows} />);
		expect(container.querySelector('figure')).toHaveClass('wp-block-table');
	});
});
