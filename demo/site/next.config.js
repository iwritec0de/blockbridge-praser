const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow fetching from local WordPress in dev
  async rewrites() {
    return [];
  },
  // Force a single copy of React/React-DOM.
  //
  // The `@iwritec0de/blockbridge-react` package is installed as a `file:../..`
  // dependency which symlinks to the sibling praser checkout. That checkout
  // has its own `node_modules/react` (React 19, used for the library's dev +
  // tests). When Next.js/webpack follows `require('react')` from inside the
  // symlinked lib, Node's resolver walks up from the *real* path and finds
  // praser's React 19 instead of the demo's React 18. The React 19 elements
  // created by the lib then get handed to the React 18 reconciler, which does
  // not recognise the new `$$typeof` symbol and throws:
  //
  //     Objects are not valid as a React child (found: object with keys
  //     {$typeof, type, key, props, _owner, _store})
  //
  // Aliasing both packages to the demo's own copies guarantees a single React.
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    };
    return config;
  },
};

module.exports = nextConfig;
