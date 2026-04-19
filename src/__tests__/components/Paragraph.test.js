import React from 'react';
import { render } from '@testing-library/react';
import Paragraph from '../../components/Paragraph';

describe('Paragraph', () => {
	it('renders a <p> element', () => {
		const { container } = render(<Paragraph name="core/paragraph" />);
		expect(container.querySelector('p')).toBeTruthy();
	});

	it('applies wp-block-paragraph class', () => {
		const { container } = render(<Paragraph name="core/paragraph" />);
		expect(container.querySelector('p')).toHaveClass('wp-block-paragraph');
	});

	it('adds has-text-color when textColor is provided', () => {
		const { container } = render(<Paragraph name="core/paragraph" textColor="primary" />);
		expect(container.querySelector('p')).toHaveClass('has-text-color');
	});

	it('adds has-drop-cap when dropCap is true', () => {
		const { container } = render(<Paragraph name="core/paragraph" dropCap={true} />);
		expect(container.querySelector('p')).toHaveClass('has-drop-cap');
	});

	it('renders content via html-react-parser', () => {
		const { container } = render(<Paragraph name="core/paragraph" content="Some text." />);
		expect(container.textContent).toBeTruthy();
	});
});
