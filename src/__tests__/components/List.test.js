import React from 'react';
import { render } from '@testing-library/react';
import List from '../../components/List';
import ListItem from '../../components/ListItem';

describe('List', () => {
	it('renders a ul when ordered is false', () => {
		const { container } = render(<List name="core/list" ordered={false} />);
		expect(container.querySelector('ul')).toBeTruthy();
		expect(container.querySelector('ol')).toBeNull();
	});

	it('renders a ul by default when ordered is not provided', () => {
		const { container } = render(<List name="core/list" />);
		expect(container.querySelector('ul')).toBeTruthy();
	});

	it('renders an ol when ordered is true', () => {
		const { container } = render(<List name="core/list" ordered={true} />);
		expect(container.querySelector('ol')).toBeTruthy();
		expect(container.querySelector('ul')).toBeNull();
	});

	it('applies wp-block-list class', () => {
		const { container } = render(<List name="core/list" />);
		expect(container.querySelector('ul')).toHaveClass('wp-block-list');
	});

	it('renders children inside the list', () => {
		const { container } = render(
			<List name="core/list">
				<li>Item one</li>
				<li>Item two</li>
			</List>
		);
		expect(container.querySelectorAll('li')).toHaveLength(2);
	});
});

describe('ListItem', () => {
	it('renders a li element', () => {
		const { container } = render(<ListItem name="core/list-item" content="Buy milk" />);
		expect(container.querySelector('li')).toBeTruthy();
	});

	it('renders content via html-react-parser', () => {
		const { container } = render(<ListItem name="core/list-item" content="Buy milk" />);
		expect(container.querySelector('li').textContent).toBe('Buy milk');
	});

	it('passes content through html-react-parser', () => {
		const { container } = render(<ListItem name="core/list-item" content="Buy milk today" />);
		expect(container.querySelector('li').textContent).toContain('Buy milk today');
	});

	it('renders children (nested list) when provided', () => {
		const { container } = render(
			<ListItem name="core/list-item" content="Parent">
				<ul>
					<li>Nested</li>
				</ul>
			</ListItem>
		);
		expect(container.querySelector('ul')).toBeTruthy();
		expect(container.querySelector('li').textContent).toBe('ParentNested');
	});

	it('renders without children when none provided', () => {
		const { container } = render(<ListItem name="core/list-item" content="Solo item" />);
		expect(container.querySelector('li').textContent).toBe('Solo item');
	});
});
