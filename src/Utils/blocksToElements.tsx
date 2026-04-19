import getSerializers from './getSerializers';
import mergeSerializers from './mergeSerializers';
import renderBlocks from './renderBlocks';
import type { RenderBlocksProps } from './renderBlocks';
import type { Block, SerializerMap } from '../types';
import type { ReactNode } from 'react';

const blocksToElements = (
	blocks: Block[],
	userSerializers: SerializerMap | null | undefined,
	props: RenderBlocksProps,
	completeSerializers?: SerializerMap
): ReactNode => {
	// When a complete serializer map is provided, use it as-is without
	// loading the default map. This is the tree-shakable path.
	if (completeSerializers) {
		return renderBlocks(blocks, completeSerializers, props);
	}

	const defaultSerializers = getSerializers();
	const serializers = userSerializers
		? mergeSerializers(defaultSerializers, userSerializers)
		: defaultSerializers;

	return renderBlocks(blocks, serializers, props);
};

export default blocksToElements;
