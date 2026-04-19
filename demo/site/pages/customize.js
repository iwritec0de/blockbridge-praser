/**
 * Token Customizer — live-edit CSS custom properties and preview the result.
 */
import { useState, useCallback } from 'react';
import TokenCustomizer from '../components/TokenCustomizer';
import BlockRenderer from '../components/BlockRenderer';

const WP_API = (typeof window === 'undefined' && process.env.WP_INTERNAL_URL)
	|| process.env.NEXT_PUBLIC_WP_URL
	|| 'http://localhost:8080';

export default function Customize({ post, error }) {
  const [tokenStyles, setTokenStyles] = useState({});

  const handleTokenChange = useCallback((tokens) => {
    setTokenStyles(tokens);
  }, []);

  const previewStyle = Object.keys(tokenStyles).length > 0 ? tokenStyles : {};

  return (
    <div className="container container--wide">
      <div className="page-header">
        <h1>Token Customizer</h1>
        <p className="page-header__subtitle">
          Adjust BlockBridge CSS custom properties in real-time and see how they affect rendered blocks.
        </p>
      </div>

      <div className="customize-layout">
        <aside className="customize-layout__controls">
          <TokenCustomizer onTokenChange={handleTokenChange} />
        </aside>

        <div className="customize-layout__preview">
          <h2 className="customize-layout__preview-title">Live Preview</h2>
          {error || !post ? (
            <div className="error-box">
              <strong>No sample content available.</strong>
              <p>Make sure WordPress is running and has at least one post.</p>
              {error && <pre>{error}</pre>}
            </div>
          ) : (
            <div className="customize-preview" style={previewStyle}>
              <div className="post-header">
                <h3>{post.title.rendered}</h3>
                <p className="meta">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="page-content">
                {post.serializedBlocks ? (
                  <BlockRenderer serializedBlocks={post.serializedBlocks} />
                ) : (
                  <p className="text-muted">
                    No serialized blocks found. Ensure the BlockBridge WP plugin is active.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${WP_API}/wp-json/wp/v2/posts?_embed&per_page=1`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    if (!posts.length) return { props: { post: null, error: null } };
    return { props: { post: posts[0], error: null } };
  } catch (err) {
    return { props: { post: null, error: err.message } };
  }
}
