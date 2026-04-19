import React from 'react';
import { render } from '@testing-library/react';
import Embed from '../../components/Embed';

describe('Embed', () => {
	it('renders a figure with wp-block-embed class', () => {
		const { container } = render(<Embed name="core/embed" url="https://example.com" />);
		expect(container.querySelector('figure')).toHaveClass('wp-block-embed');
	});

	it('renders figcaption when caption provided', () => {
		const { container } = render(
			<Embed name="core/embed" url="https://example.com" caption="A caption" />
		);
		expect(container.querySelector('figcaption')).toBeTruthy();
	});

	it('omits figcaption when caption is absent', () => {
		const { container } = render(<Embed name="core/embed" url="https://example.com" />);
		expect(container.querySelector('figcaption')).toBeNull();
	});

	// YouTube
	it('renders an iframe with YouTube embed URL', () => {
		const { container } = render(
			<Embed
				name="core/embed"
				url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				providerNameSlug="youtube"
			/>
		);
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		expect(iframe.getAttribute('src')).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
	});

	it('applies responsive class for youtube', () => {
		const { container } = render(
			<Embed
				name="core/embed"
				url="https://www.youtube.com/watch?v=abc123"
				providerNameSlug="youtube"
				responsive={true}
			/>
		);
		expect(container.querySelector('figure')).toHaveClass('wp-block-embed--responsive');
	});

	// Vimeo
	it('renders an iframe with Vimeo embed URL', () => {
		const { container } = render(
			<Embed name="core/embed" url="https://vimeo.com/123456789" providerNameSlug="vimeo" />
		);
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		expect(iframe.getAttribute('src')).toBe('https://player.vimeo.com/video/123456789');
	});

	// Twitter
	it('renders a blockquote for twitter embeds', () => {
		const { container } = render(
			<Embed
				name="core/embed"
				url="https://twitter.com/user/status/123"
				providerNameSlug="twitter"
			/>
		);
		expect(container.querySelector('blockquote')).toBeTruthy();
		const link = container.querySelector('a');
		expect(link.getAttribute('href')).toBe('https://twitter.com/user/status/123');
	});

	// Generic
	it('renders a plain iframe for unknown providers', () => {
		const { container } = render(
			<Embed name="core/embed" url="https://example.com/widget" providerNameSlug="spotify" />
		);
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		expect(iframe.getAttribute('src')).toBe('https://example.com/widget');
	});

	// URL sanitization
	it('rejects javascript: protocol URLs', () => {
		const { container } = render(
			<Embed name="core/embed" url="javascript:alert(1)" providerNameSlug="youtube" />
		);
		expect(container.querySelector('iframe')).toBeNull();
	});

	it('renders nothing when url is empty', () => {
		const { container } = render(<Embed name="core/embed" />);
		expect(container.querySelector('iframe')).toBeNull();
		expect(container.querySelector('blockquote')).toBeNull();
	});

	it('adds provider and type classes', () => {
		const { container } = render(
			<Embed
				name="core/embed"
				url="https://example.com"
				providerNameSlug="youtube"
				type="video"
			/>
		);
		const figure = container.querySelector('figure');
		expect(figure).toHaveClass('is-provider-youtube');
		expect(figure).toHaveClass('is-type-video');
	});
});
