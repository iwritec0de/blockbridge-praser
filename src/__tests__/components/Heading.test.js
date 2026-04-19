import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../../components/Heading';

describe('Heading', () => {
	it('renders as h2 by default when mark is not provided', () => {
		const { container } = render(<Heading name="core/heading" />);
		expect(container.querySelector('h2')).toBeTruthy();
	});

	it('renders with the specified mark element', () => {
		const { container } = render(<Heading name="core/heading" mark="h3" />);
		expect(container.querySelector('h3')).toBeTruthy();
	});

	it('applies wp-block-heading class', () => {
		const { container } = render(<Heading name="core/heading" mark="h2" />);
		expect(container.querySelector('h2')).toHaveClass('wp-block-heading');
	});

	it('applies anchor as id', () => {
		const { container } = render(<Heading name="core/heading" mark="h2" anchor="my-section" />);
		expect(container.querySelector('#my-section')).toBeTruthy();
	});

	it('renders content via html-react-parser', () => {
		const { container } = render(
			<Heading name="core/heading" mark="h2" content="Hello World" />
		);
		expect(container.textContent).toBeTruthy();
	});
});
