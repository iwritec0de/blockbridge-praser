#!/usr/bin/env node
/**
 * Babel emits ESM without file extensions and no package.json marker.
 * Node's native ESM resolver needs both. This script:
 *   1. writes lib/esm/package.json with { "type": "module" }
 *   2. walks lib/esm/**\/*.js and appends `.js` to bare relative specifiers
 *      so `import x from './foo'` becomes `import x from './foo.js'`.
 *
 * Kept intentionally dep-free — uses only Node stdlib.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ESM_ROOT = path.resolve(__dirname, '..', 'lib', 'esm');

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const out = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			out.push(...(await walk(full)));
		} else if (entry.isFile() && entry.name.endsWith('.js')) {
			out.push(full);
		}
	}
	return out;
}

async function resolveSpecifier(fromFile, specifier) {
	const baseDir = path.dirname(fromFile);
	const candidates = [
		path.resolve(baseDir, specifier + '.js'),
		path.resolve(baseDir, specifier, 'index.js'),
	];
	for (const candidate of candidates) {
		try {
			const stat = await fs.stat(candidate);
			if (stat.isFile()) {
				const rel = path.relative(baseDir, candidate);
				const normalized = rel.startsWith('.') ? rel : './' + rel;
				return normalized.split(path.sep).join('/');
			}
		} catch {
			// not this candidate
		}
	}
	return null;
}

// Matches import/export statements with bare relative specifiers — anything that
// starts with ./ or ../ and ends *without* a file extension. Covers:
//   import foo from './bar';
//   export { x } from '../baz';
//   import('./quux');
const REL_SPEC_RE = /(from\s+|import\s*\(\s*)(['"])(\.\.?\/[^'"\n]+?)\2/g;

async function patchFile(file) {
	const src = await fs.readFile(file, 'utf8');
	const edits = [];

	for (const match of src.matchAll(REL_SPEC_RE)) {
		const [full, prefix, quote, specifier] = match;
		// Skip if already has an extension (.js, .json, .mjs, .css, etc.)
		if (/\.[a-zA-Z0-9]+$/.test(specifier)) continue;
		const resolved = await resolveSpecifier(file, specifier);
		if (!resolved) continue;
		edits.push({ full, replacement: `${prefix}${quote}${resolved}${quote}` });
	}

	if (edits.length === 0) return false;

	let patched = src;
	for (const { full, replacement } of edits) {
		patched = patched.replace(full, replacement);
	}
	await fs.writeFile(file, patched, 'utf8');
	return true;
}

async function main() {
	await fs.writeFile(
		path.join(ESM_ROOT, 'package.json'),
		JSON.stringify({ type: 'module' }, null, 2) + '\n',
		'utf8'
	);

	const files = await walk(ESM_ROOT);
	let patched = 0;
	for (const file of files) {
		if (await patchFile(file)) patched++;
	}
	console.log(`postbuild-esm: wrote lib/esm/package.json, patched ${patched}/${files.length} files`);
}

main().catch((err) => {
	console.error('postbuild-esm failed:', err);
	process.exit(1);
});
