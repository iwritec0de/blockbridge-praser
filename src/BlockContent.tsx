import * as React from 'react';
import blocksToElements from './Utils/blocksToElements';
import type { Block, SerializerMap } from './types';

export interface BlockContentProps {
	blocks: Block[];
	/** Override or extend the default serializer map. Defaults are always loaded. */
	userSerializers?: SerializerMap;
	/**
	 * Provide a complete serializer map, bypassing the built-in defaults entirely.
	 * Use with `createSerializerMap` for tree-shakable builds that only bundle
	 * the block components you actually need.
	 *
	 * When set, `userSerializers` is ignored.
	 */
	serializers?: SerializerMap;
	renderContainer?: boolean;
	className?: string;
	wrapperComponent?: React.ComponentType<{ className?: string; children?: React.ReactNode }>;
}

const BlockContent: React.FC<BlockContentProps> = ({
	blocks,
	userSerializers,
	serializers,
	renderContainer,
	className,
	wrapperComponent,
}) => {
	const elementProps = {
		renderContainer,
		className,
		wrapperComponent,
	};

	return blocksToElements(
		blocks,
		userSerializers,
		elementProps,
		serializers
	) as React.ReactElement;
};

export default BlockContent;
