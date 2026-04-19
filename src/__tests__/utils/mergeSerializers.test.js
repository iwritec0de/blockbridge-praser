import mergeSerializers from '../../Utils/mergeSerializers';

const FooBlock = () => null;
const BarBlock = () => null;
const BazBlock = () => null;

describe('mergeSerializers', () => {
	it('merges custom serializers over defaults', () => {
		const defaults = { 'core/paragraph': FooBlock };
		const custom = { 'core/paragraph': BarBlock };
		const result = mergeSerializers(defaults, custom);
		expect(result['core/paragraph']).toBe(BarBlock);
	});

	it('adds new serializers from custom map', () => {
		const defaults = { 'core/paragraph': FooBlock };
		const custom = { 'my-plugin/block': BarBlock };
		const result = mergeSerializers(defaults, custom);
		expect(result['core/paragraph']).toBe(FooBlock);
		expect(result['my-plugin/block']).toBe(BarBlock);
	});

	it('accepts an array of custom serializer maps', () => {
		const defaults = { 'core/paragraph': FooBlock };
		const custom1 = { 'core/paragraph': BarBlock };
		const custom2 = { 'core/heading': BazBlock };
		const result = mergeSerializers(defaults, [custom1, custom2]);
		expect(result['core/paragraph']).toBe(BarBlock);
		expect(result['core/heading']).toBe(BazBlock);
	});
});
