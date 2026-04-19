import React from 'react';
import { render } from '@testing-library/react';
import Group from '../../components/Group';

describe('Group', () => {
	it('renders a div element', () => {
		const { container } = render(<Group name="core/group" />);
		expect(container.querySelector('div')).toBeTruthy();
	});

	it('applies wp-block-group class', () => {
		const { container } = render(<Group name="core/group" />);
		expect(container.querySelector('div')).toHaveClass('wp-block-group');
	});

	it('applies layout type modifier class when layout is provided', () => {
		const { container } = render(<Group name="core/group" layout={{ type: 'constrained' }} />);
		expect(container.querySelector('div')).toHaveClass('wp-block-group--constrained');
	});

	it('renders children', () => {
		const { container } = render(
			<Group name="core/group">
				<p>Inner content</p>
			</Group>
		);
		expect(container.querySelector('p')).toBeTruthy();
	});

	it('does not add layout class when layout is absent', () => {
		const { container } = render(<Group name="core/group" />);
		const div = container.querySelector('div');
		expect(div.className).toBe('wp-block-group');
	});
});
