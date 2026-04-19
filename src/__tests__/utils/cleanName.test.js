import cleanName from '../../Utils/cleanName';

describe('cleanName', () => {
	it('returns the block slug from a namespaced block name', () => {
		expect(cleanName('core/paragraph')).toBe('paragraph');
	});

	it('handles custom namespaces', () => {
		expect(cleanName('my-plugin/my-block')).toBe('my-block');
	});

	it('falls back to the full name when no slash is present', () => {
		expect(cleanName('paragraph')).toBe('paragraph');
	});
});
