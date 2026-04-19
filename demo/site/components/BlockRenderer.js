/**
 * BlockRenderer — wraps BlockContent with demo-specific customizations.
 *
 * Demonstrates:
 * 1. Passing serializedBlocks from the WP REST API
 * 2. A custom serializer override (wraps core/quote in a styled container)
 */
import { BlockContent } from '@iwritec0de/blockbridge-react';

/**
 * Custom serializer: wrap core/quote blocks in an extra div with a data attribute
 * so we can style them distinctly in the demo.
 *
 * Serializer components receive the block's attributes as spread props,
 * plus `name`, `_key`, `content`, and `children` (rendered inner blocks).
 */
const customSerializers = {
  'core/quote': ({ content, citation, children }) => (
    <div className="demo-custom-quote" data-demo="custom-serializer">
      <span className="demo-custom-quote__label">Custom Serializer</span>
      <blockquote className="wp-block-quote">
        {children}
        {citation && <cite>{citation}</cite>}
      </blockquote>
    </div>
  ),
};

export default function BlockRenderer({ serializedBlocks }) {
  if (!serializedBlocks) return null;

  return (
    <BlockContent
      blocks={serializedBlocks}
      userSerializers={customSerializers}
      renderContainer
    />
  );
}
