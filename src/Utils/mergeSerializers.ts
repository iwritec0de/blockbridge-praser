import merge from 'lodash.merge';
import type { SerializerMap } from '../types';

const mergeSerializers = (
	defaultSerializer: SerializerMap,
	customSerializers: SerializerMap | SerializerMap[]
): SerializerMap =>
	Array.isArray(customSerializers)
		? merge({}, defaultSerializer, ...customSerializers)
		: merge({}, defaultSerializer, customSerializers);

export default mergeSerializers;
