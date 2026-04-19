/**
 * Only allow http: and https: protocols to prevent XSS via javascript: URIs in href attributes.
 * Returns the canonicalized URL (URL.href) on success, empty string for invalid or disallowed URLs.
 *
 * NOTE: Relative URLs (root-relative like "/wp-content/..." or protocol-relative like "//cdn...")
 * are treated as invalid and will return "". This is by design — the URL parser requires a
 * protocol — but WordPress installs configured with site_url returning relative paths, or custom
 * REST responses that strip the host, will surface empty src / href attributes. The workaround
 * is to resolve to absolute URLs before serialization, either with a custom
 * `blockbridge_block_{name}` filter on the server, or by passing pre-resolved blocks into
 * BlockContent.
 */
const sanitizeUrl = (url: string): string => {
	try {
		const parsed = new URL(url);
		if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
			return parsed.href;
		}
	} catch {
		// invalid URL — reject it
	}
	return '';
};

export default sanitizeUrl;
