import React from 'react';
import { render } from '@testing-library/react';
import Gallery from '../../components/Gallery';

describe('Gallery', () => {
	it('renders a figure element', () => {
		const { container } = render(<Gallery name="core/gallery" />);
		expect(container.querySelector('figure')).toBeTruthy();
	});

	it('applies wp-block-gallery class', () => {
		const { container } = render(<Gallery name="core/gallery" />);
		expect(container.querySelector('figure')).toHaveClass('wp-block-gallery');
	});

	it('renders children inside gallery grid list items', () => {
		const { container } = render(
			<Gallery name="core/gallery">
				<img src="a.jpg" alt="A" />
				<img src="b.jpg" alt="B" />
			</Gallery>
		);
		const items = container.querySelectorAll('.blocks-gallery-item');
		expect(items).toHaveLength(2);
		expect(items[0].querySelector('img')).toBeTruthy();
	});

	it('renders ul with blocks-gallery-grid class', () => {
		const { container } = render(<Gallery name="core/gallery" />);
		expect(container.querySelector('ul.blocks-gallery-grid')).toBeTruthy();
	});

	it('applies columns class when columns prop is provided', () => {
		const { container } = render(<Gallery name="core/gallery" columns={3} />);
		expect(container.querySelector('figure')).toHaveClass('columns-3');
	});

	it('does not apply columns class when columns is absent', () => {
		const { container } = render(<Gallery name="core/gallery" />);
		const figure = container.querySelector('figure');
		expect(figure.className).not.toMatch(/columns-/);
	});

	it('applies is-cropped class by default', () => {
		const { container } = render(<Gallery name="core/gallery" />);
		expect(container.querySelector('figure')).toHaveClass('is-cropped');
	});

	it('removes is-cropped class when imageCrop is false', () => {
		const { container } = render(<Gallery name="core/gallery" imageCrop={false} />);
		expect(container.querySelector('figure')).not.toHaveClass('is-cropped');
	});

	it('renders figcaption when caption is provided', () => {
		const { container } = render(<Gallery name="core/gallery" caption="My gallery" />);
		const caption = container.querySelector('figcaption');
		expect(caption).toBeTruthy();
		expect(caption).toHaveClass('blocks-gallery-caption');
		expect(caption.textContent).toBe('My gallery');
	});

	it('omits figcaption when caption is absent', () => {
		const { container } = render(<Gallery name="core/gallery" />);
		expect(container.querySelector('figcaption')).toBeNull();
	});

	it('applies custom className', () => {
		const { container } = render(<Gallery name="core/gallery" className="my-gallery" />);
		expect(container.querySelector('figure')).toHaveClass('my-gallery');
	});

	it('sets --gallery-columns CSS variable when columns is provided', () => {
		const { container } = render(<Gallery name="core/gallery" columns={4} />);
		const figure = container.querySelector('figure');
		expect(figure.style.getPropertyValue('--gallery-columns')).toBe('4');
	});
});
