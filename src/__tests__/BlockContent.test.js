import React from 'react';
import { render } from '@testing-library/react';
import BlockContent from '../BlockContent';

const makeBlock = (name, attrs = {}, children = [], content = '') => ({
	name,
	_key: 'key-' + name,
	content,
	attributes: attrs,
	children,
});

describe('BlockContent', () => {
	it('renders without crashing with empty blocks array', () => {
		const { container } = render(<BlockContent blocks={[]} />);
		expect(container).toBeTruthy();
	});

	it('renders a container div when renderContainer is true', () => {
		const block = makeBlock('core/paragraph', {}, [], 'Hello');
		const { container } = render(<BlockContent blocks={[block]} renderContainer={true} />);
		expect(container.querySelector('.bb-container')).toBeTruthy();
	});

	it('applies custom className to the container', () => {
		const block = makeBlock('core/paragraph', {}, [], 'Hello');
		const { container } = render(
			<BlockContent blocks={[block]} renderContainer={true} className="my-content" />
		);
		expect(container.querySelector('.my-content')).toBeTruthy();
	});
});
