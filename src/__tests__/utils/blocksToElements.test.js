import React from 'react';
import { render } from '@testing-library/react';
import blocksToElements from '../../Utils/blocksToElements';

const makeBlock = (name, attrs = {}, children = [], content = '') => ({
	name,
	_key: 'key-' + name,
	content,
	attributes: attrs,
	children,
});

describe('blocksToElements', () => {
	it('returns an array of nodes when renderContainer is false', () => {
		const block = makeBlock('core/paragraph', {}, [], 'Hello');
		const result = blocksToElements([block], null, { renderContainer: false });
		expect(Array.isArray(result)).toBe(true);
	});

	it('wraps nodes in a container div when renderContainer is true', () => {
		const block = makeBlock('core/paragraph', {}, [], 'Hello');
		const node = blocksToElements([block], null, { renderContainer: true });
		const { container } = render(<>{node}</>);
		expect(container.querySelector('.bb-container')).toBeTruthy();
	});

	it('uses custom className on container', () => {
		const block = makeBlock('core/paragraph', {}, [], 'Hello');
		const node = blocksToElements([block], null, {
			renderContainer: true,
			className: 'custom-wrap',
		});
		const { container } = render(<>{node}</>);
		expect(container.querySelector('.custom-wrap')).toBeTruthy();
	});

	it('returns empty array for empty blocks', () => {
		const result = blocksToElements([], null, {});
		expect(result).toHaveLength(0);
	});
});
