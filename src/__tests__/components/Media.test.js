import React from 'react';
import { render } from '@testing-library/react';
import Audio from '../../components/Audio';
import Video from '../../components/Video';
import File from '../../components/File';

describe('Audio', () => {
	it('renders a figure with audio element', () => {
		const { container } = render(
			<Audio name="core/audio" src="https://example.com/audio.mp3" />
		);
		expect(container.querySelector('figure')).toBeTruthy();
		expect(container.querySelector('audio')).toBeTruthy();
	});

	it('applies wp-block-audio class', () => {
		const { container } = render(<Audio name="core/audio" src="" />);
		expect(container.querySelector('figure')).toHaveClass('wp-block-audio');
	});

	it('renders figcaption when caption provided', () => {
		const { container } = render(<Audio name="core/audio" src="" caption="A podcast" />);
		expect(container.querySelector('figcaption')).toBeTruthy();
	});

	it('omits figcaption when caption is absent', () => {
		const { container } = render(<Audio name="core/audio" src="" />);
		expect(container.querySelector('figcaption')).toBeNull();
	});
});

describe('Video', () => {
	it('renders a figure with video element', () => {
		const { container } = render(
			<Video name="core/video" src="https://example.com/video.mp4" />
		);
		expect(container.querySelector('figure')).toBeTruthy();
		expect(container.querySelector('video')).toBeTruthy();
	});

	it('applies wp-block-video class', () => {
		const { container } = render(<Video name="core/video" src="" />);
		expect(container.querySelector('figure')).toHaveClass('wp-block-video');
	});

	it('renders figcaption when caption provided', () => {
		const { container } = render(<Video name="core/video" src="" caption="A video tour" />);
		expect(container.querySelector('figcaption')).toBeTruthy();
	});

	it('passes poster to video element', () => {
		const { container } = render(
			<Video name="core/video" src="" poster="https://example.com/thumb.jpg" />
		);
		expect(container.querySelector('video').getAttribute('poster')).toBe(
			'https://example.com/thumb.jpg'
		);
	});
});

describe('File', () => {
	it('renders a div wrapper', () => {
		const { container } = render(
			<File name="core/file" href="https://example.com/doc.pdf" fileName="doc.pdf" />
		);
		expect(container.querySelector('div')).toBeTruthy();
	});

	it('applies wp-block-file class', () => {
		const { container } = render(<File name="core/file" href="https://example.com/doc.pdf" />);
		expect(container.querySelector('div')).toHaveClass('wp-block-file');
	});

	it('renders a link with fileName as text', () => {
		const { container } = render(
			<File name="core/file" href="https://example.com/doc.pdf" fileName="My Document" />
		);
		const link = container.querySelector('a');
		expect(link.textContent).toBe('My Document');
	});

	it('renders download button when showDownloadButton is true', () => {
		const { container } = render(
			<File name="core/file" href="https://example.com/doc.pdf" showDownloadButton={true} />
		);
		expect(container.querySelector('.wp-block-file__button')).toBeTruthy();
	});

	it('omits download button when showDownloadButton is false', () => {
		const { container } = render(
			<File name="core/file" href="https://example.com/doc.pdf" showDownloadButton={false} />
		);
		expect(container.querySelector('.wp-block-file__button')).toBeNull();
	});
});
