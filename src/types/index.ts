import type { ComponentType, ReactNode } from 'react';

export interface Block {
	name: string;
	_key: string;
	content: string;
	attributes: Record<string, unknown>;
	children: Block[];
}

export type SerializerMap = Record<string, ComponentType<BlockProps>>;

export interface BlockProps {
	name: string;
	_key?: string;
	content?: string;
	children?: ReactNode;
	[key: string]: unknown;
}
