import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';
import Buttons from '../../components/Buttons';

describe('Button', () => {
	it('renders an anchor when url is provided', () => {
		const { container } = render(
			<Button name="core/button" url="https://example.com" text="Click" />
		);
		expect(container.querySelector('a')).toBeTruthy();
		// sanitizeUrl canonicalizes via URL.href, which adds the trailing slash.
		expect(container.querySelector('a').getAttribute('href')).toBe('https://example.com/');
	});

	it('renders a span when url is absent', () => {
		const { container } = render(<Button name="core/button" text="No link" />);
		expect(container.querySelector('span')).toBeTruthy();
		expect(container.querySelector('a')).toBeNull();
	});

	it('applies is-style-outline class when variant is outline', () => {
		const { container } = render(
			<Button name="core/button" variant="outline" text="Outline" />
		);
		expect(container.querySelector('.is-style-outline')).toBeTruthy();
	});

	it('renders button text', () => {
		const { container } = render(
			<Button name="core/button" text="Buy now" url="https://example.com" />
		);
		expect(container.textContent).toContain('Buy now');
	});
});

describe('Buttons', () => {
	it('renders a div wrapper', () => {
		const { container } = render(<Buttons name="core/buttons" />);
		expect(container.querySelector('div')).toBeTruthy();
	});

	it('applies wp-block-buttons class', () => {
		const { container } = render(<Buttons name="core/buttons" />);
		expect(container.querySelector('.wp-block-buttons')).toBeTruthy();
	});

	it('renders children', () => {
		const { container } = render(
			<Buttons name="core/buttons">
				<span>child</span>
			</Buttons>
		);
		expect(container.querySelector('span')).toBeTruthy();
	});
});
