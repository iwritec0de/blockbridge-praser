import React from 'react';
import { render } from '@testing-library/react';
import Separator from '../../components/Separator';
import Spacer from '../../components/Spacer';

describe('Separator', () => {
	it('renders an hr element', () => {
		const { container } = render(<Separator name="core/separator" />);
		expect(container.querySelector('hr')).toBeTruthy();
	});

	it('applies wp-block-separator class', () => {
		const { container } = render(<Separator name="core/separator" />);
		expect(container.querySelector('hr')).toHaveClass('wp-block-separator');
	});

	it('does not add is-style class for default variant', () => {
		const { container } = render(<Separator name="core/separator" variant="default" />);
		const hr = container.querySelector('hr');
		expect(hr.className).not.toContain('is-style-default');
	});

	it('applies is-style-wide class for wide variant', () => {
		const { container } = render(<Separator name="core/separator" variant="wide" />);
		expect(container.querySelector('hr')).toHaveClass('is-style-wide');
	});

	it('applies is-style-dots class for dots variant', () => {
		const { container } = render(<Separator name="core/separator" variant="dots" />);
		expect(container.querySelector('hr')).toHaveClass('is-style-dots');
	});
});

describe('Spacer', () => {
	it('renders a div element', () => {
		const { container } = render(<Spacer name="core/spacer" />);
		expect(container.querySelector('div')).toBeTruthy();
	});

	it('applies wp-block-spacer class', () => {
		const { container } = render(<Spacer name="core/spacer" />);
		expect(container.querySelector('div')).toHaveClass('wp-block-spacer');
	});

	it('applies height as inline style', () => {
		const { container } = render(<Spacer name="core/spacer" height="50px" />);
		expect(container.querySelector('div').style.height).toBe('50px');
	});

	it('is aria-hidden', () => {
		const { container } = render(<Spacer name="core/spacer" />);
		expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
	});
});
