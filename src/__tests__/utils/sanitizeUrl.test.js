import sanitizeUrl from '../../Utils/sanitizeUrl';

describe('sanitizeUrl', () => {
	it('accepts http URLs', () => {
		expect(sanitizeUrl('http://example.com/path')).toBe('http://example.com/path');
	});

	it('accepts https URLs', () => {
		expect(sanitizeUrl('https://example.com/path')).toBe('https://example.com/path');
	});

	it('returns the canonical URL.href form', () => {
		expect(sanitizeUrl('HTTPS://Example.COM')).toBe('https://example.com/');
	});

	it('rejects javascript: URIs', () => {
		expect(sanitizeUrl('javascript:alert(1)')).toBe('');
	});

	it('rejects data: URIs', () => {
		expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('');
	});

	it('rejects vbscript: URIs', () => {
		expect(sanitizeUrl('vbscript:msgbox("xss")')).toBe('');
	});

	it('rejects file: URIs', () => {
		expect(sanitizeUrl('file:///etc/passwd')).toBe('');
	});

	it('rejects relative URLs (no protocol)', () => {
		expect(sanitizeUrl('/relative/path')).toBe('');
	});

	it('rejects protocol-relative URLs', () => {
		expect(sanitizeUrl('//example.com')).toBe('');
	});

	it('rejects empty strings', () => {
		expect(sanitizeUrl('')).toBe('');
	});

	it('rejects malformed URLs', () => {
		expect(sanitizeUrl('not a url')).toBe('');
	});

	it('rejects case-variant javascript scheme', () => {
		expect(sanitizeUrl('JaVaScRiPt:alert(1)')).toBe('');
	});
});
