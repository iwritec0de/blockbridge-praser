import React from 'react';
import { render } from '@testing-library/react';
import Image from '../../components/Image';

describe('Image', () => {
	it('renders a figure element', () => {
		const { container } = render(
			<Image name="core/image" src="https://example.com/photo.jpg" alt="A photo" />
		);
		expect(container.querySelector('figure')).toBeTruthy();
	});

	it('renders img with src and alt', () => {
		const { container } = render(
			<Image name="core/image" src="https://example.com/photo.jpg" alt="A photo" />
		);
		const img = container.querySelector('img');
		expect(img).toBeTruthy();
		expect(img.getAttribute('src')).toBe('https://example.com/photo.jpg');
		expect(img.getAttribute('alt')).toBe('A photo');
	});

	it('renders figcaption when caption is provided', () => {
		const { container } = render(
			<Image name="core/image" src="" alt="" caption="Photo by Jane" />
		);
		const caption = container.querySelector('figcaption');
		expect(caption).toBeTruthy();
		expect(caption.textContent).toBe('Photo by Jane');
	});

	it('omits figcaption when caption is absent', () => {
		const { container } = render(<Image name="core/image" src="" alt="" />);
		expect(container.querySelector('figcaption')).toBeNull();
	});

	it('wraps image in <a> when href is provided', () => {
		const { container } = render(
			<Image name="core/image" src="" alt="" href="https://example.com" />
		);
		const link = container.querySelector('a');
		expect(link).toBeTruthy();
		// sanitizeUrl canonicalizes via URL.href, which adds the trailing slash.
		expect(link.getAttribute('href')).toBe('https://example.com/');
		expect(link.querySelector('img')).toBeTruthy();
	});

	it('does not render <a> when href is absent', () => {
		const { container } = render(<Image name="core/image" src="" alt="" />);
		expect(container.querySelector('a')).toBeNull();
	});

	it('applies width and height to img when provided', () => {
		const { container } = render(
			<Image name="core/image" src="" alt="" width={800} height={600} />
		);
		const img = container.querySelector('img');
		expect(img.getAttribute('width')).toBe('800');
		expect(img.getAttribute('height')).toBe('600');
	});

	it('applies wp-block-image class to figure', () => {
		const { container } = render(<Image name="core/image" src="" alt="" />);
		expect(container.querySelector('figure')).toHaveClass('wp-block-image');
	});
});
