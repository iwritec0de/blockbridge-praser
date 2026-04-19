import React from 'react';
import { render } from '@testing-library/react';
import MediaText from '../../components/MediaText';

describe('MediaText', () => {
	it('renders with wp-block-media-text class', () => {
		const { container } = render(<MediaText name="core/media-text" />);
		expect(container.firstChild).toHaveClass('wp-block-media-text');
	});

	it('renders the media image with src and alt', () => {
		const { container } = render(
			<MediaText name="core/media-text" media="img.jpg" altText="A photo" />
		);
		const img = container.querySelector('img');
		expect(img).toHaveAttribute('src', 'img.jpg');
		expect(img).toHaveAttribute('alt', 'A photo');
	});

	it('applies gridTemplateColumns style when mediaWidth is set', () => {
		const { container } = render(<MediaText name="core/media-text" mediaWidth={50} />);
		const style = container.firstChild.style.gridTemplateColumns;
		expect(style).toBe('50% auto');
	});

	it('renders children in the content div', () => {
		const { getByText } = render(
			<MediaText name="core/media-text">
				<p>text content</p>
			</MediaText>
		);
		expect(getByText('text content')).toBeTruthy();
	});
});
