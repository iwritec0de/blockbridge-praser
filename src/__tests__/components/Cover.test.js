import React from 'react';
import { render } from '@testing-library/react';
import Cover from '../../components/Cover';

describe('Cover', () => {
	it('renders with wp-block-cover class', () => {
		const { container } = render(<Cover />);
		expect(container.firstChild).toHaveClass('wp-block-cover');
	});

	it('renders background img element when url is provided', () => {
		const { container } = render(<Cover url="https://example.com/img.jpg" />);
		const img = container.querySelector('.wp-block-cover__image-background');
		expect(img).toBeTruthy();
		expect(img.getAttribute('src')).toBe('https://example.com/img.jpg');
	});

	it('does not render background img when url is absent', () => {
		const { container } = render(<Cover />);
		expect(container.querySelector('.wp-block-cover__image-background')).toBeNull();
	});

	it('renders overlay span when dimRatio > 0', () => {
		const { container } = render(<Cover dimRatio={50} />);
		expect(container.querySelector('.wp-block-cover__background')).toBeTruthy();
	});

	it('does not render overlay span when dimRatio is 0', () => {
		const { container } = render(<Cover dimRatio={0} />);
		expect(container.querySelector('.wp-block-cover__background')).toBeNull();
	});

	it('does not render overlay span when dimRatio is absent', () => {
		const { container } = render(<Cover />);
		expect(container.querySelector('.wp-block-cover__background')).toBeNull();
	});

	it('applies has-background-dim and dim-step class to overlay span', () => {
		const { container } = render(<Cover dimRatio={50} />);
		const span = container.querySelector('.wp-block-cover__background');
		expect(span).toHaveClass('has-background-dim');
		expect(span).toHaveClass('has-background-dim-50');
	});

	it('rounds dimRatio to nearest 10 for class', () => {
		const { container } = render(<Cover dimRatio={45} />);
		const span = container.querySelector('.wp-block-cover__background');
		expect(span).toHaveClass('has-background-dim-50');
	});

	it('applies customOverlayColor as inline style on overlay span', () => {
		const { container } = render(<Cover dimRatio={50} customOverlayColor="#ff0000" />);
		const span = container.querySelector('.wp-block-cover__background');
		expect(span.style.backgroundColor).toBe('rgb(255, 0, 0)');
	});

	it('applies overlayColor class to overlay span', () => {
		const { container } = render(<Cover dimRatio={50} overlayColor="black" />);
		const span = container.querySelector('.wp-block-cover__background');
		expect(span).toHaveClass('has-black-background-color');
	});

	it('wraps children in wp-block-cover__inner-container', () => {
		const { container } = render(
			<Cover>
				<p>inner</p>
			</Cover>
		);
		const innerContainer = container.querySelector('.wp-block-cover__inner-container');
		expect(innerContainer).toBeTruthy();
		expect(innerContainer.querySelector('p')).toBeTruthy();
	});

	it('renders children even without url or dimRatio', () => {
		const { getByText } = render(
			<Cover>
				<p>inner</p>
			</Cover>
		);
		expect(getByText('inner')).toBeTruthy();
	});

	it('applies minHeight style in px by default', () => {
		const { container } = render(<Cover minHeight={400} />);
		expect(container.firstChild.style.minHeight).toBe('400px');
	});

	it('applies minHeight with custom unit', () => {
		const { container } = render(<Cover minHeight={50} minHeightUnit="vh" />);
		expect(container.firstChild.style.minHeight).toBe('50vh');
	});

	it('adds has-parallax class when hasParallax is true', () => {
		const { container } = render(<Cover hasParallax={true} />);
		expect(container.firstChild).toHaveClass('has-parallax');
	});

	it('adds content position class when contentPosition is non-default', () => {
		const { container } = render(<Cover contentPosition="bottom left" />);
		expect(container.firstChild).toHaveClass('has-custom-content-position');
		expect(container.firstChild).toHaveClass('is-position-bottom-left');
	});
});
