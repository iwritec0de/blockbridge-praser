import React from 'react';
import { render } from '@testing-library/react';
import Quote from '../../components/Quote';

describe('Quote', () => {
	it('renders a blockquote element', () => {
		const { container } = render(<Quote name="core/quote" content="Some quote text" />);
		expect(container.querySelector('blockquote')).toBeTruthy();
	});

	it('applies wp-block-quote class', () => {
		const { container } = render(<Quote name="core/quote" content="" />);
		expect(container.querySelector('blockquote')).toHaveClass('wp-block-quote');
	});

	it('renders cite element when citation is provided', () => {
		const { container } = render(<Quote name="core/quote" content="" citation="John Doe" />);
		expect(container.querySelector('cite')).toBeTruthy();
		expect(container.querySelector('cite').textContent).toBe('John Doe');
	});

	it('omits cite element when citation is absent', () => {
		const { container } = render(<Quote name="core/quote" content="" />);
		expect(container.querySelector('cite')).toBeNull();
	});

	it('renders children as quote body', () => {
		const { container } = render(
			<Quote name="core/quote">
				<p>Words of wisdom</p>
			</Quote>
		);
		expect(container.textContent).toContain('Words of wisdom');
	});
});
