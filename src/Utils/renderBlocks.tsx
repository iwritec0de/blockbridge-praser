import * as React from 'react';
import type { Block, SerializerMap } from '../types';

// Minimal ambient — Babel substitutes process.env.NODE_ENV at build time, so we
// only need the type (avoids pulling in @types/node for a single usage).
declare const process: { env: { NODE_ENV?: string } };

const renderElement = React.createElement;

export interface RenderBlocksProps {
	renderContainer?: boolean;
	className?: string;
	wrapperComponent?: React.ComponentType<{ className?: string; children?: React.ReactNode }>;
}

/**
 * Core rendering function that converts blocks to React elements using
 * a caller-supplied serializer map. Does NOT import any block components,
 * making it fully tree-shakable when paired with `createSerializerMap`.
 */
const renderBlocks = (
	blocks: Block[],
	serializers: SerializerMap,
	props: RenderBlocksProps
): React.ReactNode => {
	const { renderContainer, className, wrapperComponent } = props;

	const renderBlock = (block: Block, _index: number): React.ReactNode => {
		const name = block.name;
		const children = block.children.map(renderBlock);
		const serializer = serializers[name];
		if (!serializer) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn('A serializer doesnt exist for ' + name);
			}
			return null;
		}

		const blockProps = {
			name: block.name,
			key: block._key,
			content: block.content,
			...block.attributes,
		};
		return renderElement(serializer, blockProps, children);
	};

	const nodes = blocks.map(renderBlock);

	const Wrapper = (wrapperComponent ?? 'div') as React.ElementType;
	const container = renderElement(Wrapper, { className: className ?? 'bb-container' }, nodes);
	return renderContainer ? container : nodes;
};

export default renderBlocks;
