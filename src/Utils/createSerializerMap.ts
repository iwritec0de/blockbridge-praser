import type { ComponentType } from 'react';
import type { BlockProps, SerializerMap } from '../types';

/**
 * Build a serializer map from an explicit list of [blockName, Component] entries.
 *
 * Unlike `getSerializers()`, this does NOT import any block components itself.
 * Consumers supply only the components they actually use, enabling bundlers to
 * tree-shake everything else.
 *
 * @example
 * import { createSerializerMap, Paragraph, Heading } from '@iwritec0de/blockbridge-react';
 * const serializers = createSerializerMap([
 *   ['core/paragraph', Paragraph],
 *   ['core/heading', Heading],
 * ]);
 * <BlockContent blocks={blocks} serializers={serializers} />
 */
const createSerializerMap = (
	entries: Array<[string, ComponentType<BlockProps>]>
): SerializerMap => {
	const map: SerializerMap = {};
	for (const [name, component] of entries) {
		map[name] = component;
	}
	return map;
};

export default createSerializerMap;
