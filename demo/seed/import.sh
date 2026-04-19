#!/bin/bash
# Demo content import script — run via WP-CLI sidecar container.
# Waits for WordPress to be ready, installs WP if needed, then seeds demo content.

set -e

WP="wp --allow-root --path=/var/www/html"

# ---------------------------------------------------------------------------
# Wait for WordPress files and DB to be reachable
# ---------------------------------------------------------------------------
echo "[demo] Waiting for WordPress to be ready..."
until $WP db check 2>/dev/null; do
  echo "[demo] WordPress not ready yet, retrying in 5s..."
  sleep 5
done
echo "[demo] WordPress is ready."

# ---------------------------------------------------------------------------
# Install WordPress if not already installed
# ---------------------------------------------------------------------------
if ! $WP core is-installed 2>/dev/null; then
  echo "[demo] Installing WordPress..."
  $WP core install \
    --url="http://localhost:8080" \
    --title="BlockBridge Demo" \
    --admin_user="admin" \
    --admin_password="admin" \
    --admin_email="admin@example.com" \
    --skip-email
  echo "[demo] Flushing rewrite rules..."
  $WP rewrite structure '/%postname%/'
  $WP rewrite flush
fi

# ---------------------------------------------------------------------------
# Activate the serializer plugin
# ---------------------------------------------------------------------------
echo "[demo] Activating BlockBridge WP plugin..."
$WP plugin activate blockbridge-wp || echo "[demo] Plugin may already be active via mu-plugin."

# ---------------------------------------------------------------------------
# Enable REST API CORS for localhost:3000
# ---------------------------------------------------------------------------
echo "[demo] Setting site URL and home..."
$WP option update siteurl "http://localhost:8080"
$WP option update home "http://localhost:8080"

# ---------------------------------------------------------------------------
# Remove default content
# ---------------------------------------------------------------------------
echo "[demo] Removing default posts/pages..."
$WP post delete 1 2 --force 2>/dev/null || true

# ---------------------------------------------------------------------------
# Seed Pages
# ---------------------------------------------------------------------------
echo "[demo] Creating pages..."

# --- Home Page ---
HOME_ID=$($WP post create \
  --post_type=page \
  --post_status=publish \
  --post_title="Home" \
  --porcelain \
  --post_content='<!-- wp:group {"backgroundColor":"vivid-cyan-blue","textColor":"white","layout":{"type":"constrained"},"className":"hero-section"} -->
<div class="wp-block-group hero-section has-white-color has-vivid-cyan-blue-background-color has-text-color has-background"><!-- wp:heading {"level":1,"textAlign":"center","fontSize":"x-large"} -->
<h1 class="wp-block-heading has-text-align-center has-x-large-font-size">Headless WordPress, Beautiful React</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
<p class="has-text-align-center has-large-font-size">BlockBridge transforms your Gutenberg content into fully rendered React components — no iframes, no shortcodes, just clean markup.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"white","textColor":"vivid-cyan-blue"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-vivid-cyan-blue-color has-white-background-color has-text-color has-background wp-element-button" href="http://localhost:8080/block-explorer/">Explore Blocks</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="https://github.com/iwritec0de/blockbridge-react">View on GitHub</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center">Why BlockBridge?</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3,"textAlign":"center"} -->
<h3 class="wp-block-heading has-text-align-center">Full Block Support</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Every core Gutenberg block has a dedicated React renderer. Headings, images, galleries, embeds, tables — they all just work.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3,"textAlign":"center"} -->
<h3 class="wp-block-heading has-text-align-center">Recursive Rendering</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Nested blocks like groups, columns, and media-text are handled automatically. Inner blocks render just as WordPress intended.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3,"textAlign":"center"} -->
<h3 class="wp-block-heading has-text-align-center">Drop-In Library</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Install from npm, pass your serialized blocks to the BlockContent component, and your content is live. No complex configuration needed.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:quote {"className":"is-style-large"} -->
<blockquote class="wp-block-quote is-style-large"><!-- wp:paragraph -->
<p>We switched from a custom parser to BlockBridge and cut our front-end rendering code by 60%. The block fidelity is remarkable.</p>
<!-- /wp:paragraph --><cite>Jordan Mitchell, Lead Engineer at Starter Studio</cite></blockquote>
<!-- /wp:quote -->')

# --- About Page ---
$WP post create \
  --post_type=page \
  --post_status=publish \
  --post_title="About" \
  --post_content='<!-- wp:cover {"url":"https://picsum.photos/seed/about-hero/1200/400","dimRatio":60,"overlayColor":"black","minHeight":300} -->
<div class="wp-block-cover" style="min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-60 has-background-dim"></span><img class="wp-block-cover__image-background" alt="About BlockBridge" src="https://picsum.photos/seed/about-hero/1200/400" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">About BlockBridge</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">A two-part system for rendering WordPress Gutenberg blocks as native React components.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">The Problem</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Headless WordPress gives you freedom on the front end, but Gutenberg block content arrives as serialized HTML with embedded comments. Most headless setups either dump raw HTML into the page unsafely or write brittle regex parsers that break whenever WordPress updates.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>BlockBridge takes a different approach. A lightweight PHP plugin serializes blocks into structured JSON via the REST API. A companion React library consumes that JSON and renders each block with a dedicated component — preserving classes, attributes, and nested structures faithfully.</p>
<!-- /wp:paragraph -->

<!-- wp:media-text {"mediaPosition":"right","mediaType":"image","mediaWidth":45,"mediaUrl":"https://picsum.photos/seed/architecture/600/400","mediaAlt":"BlockBridge architecture diagram"} -->
<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile" style="grid-template-columns:auto 45%">
<div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">How It Works</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>The PHP plugin hooks into the REST API and adds a <code>serializedBlocks</code> field to every post and page response.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Each block is represented as a JSON object with its name, attributes, inner HTML, and nested inner blocks.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The React library reads that array and maps each block to a React component, recursing into inner blocks automatically.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<figure class="wp-block-media-text__media"><img src="https://picsum.photos/seed/architecture/600/400" alt="BlockBridge architecture diagram"/></figure></div>
<!-- /wp:media-text -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:group {"backgroundColor":"cyan-bluish-gray","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-cyan-bluish-gray-background-color has-background"><!-- wp:heading {"level":3,"textAlign":"center"} -->
<h3 class="wp-block-heading has-text-align-center">The Team</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">WordPress content deserves first-class rendering in modern JavaScript frameworks. Contributions and feedback are always welcome on GitHub.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->'

# --- Block Explorer Page ---
$WP post create \
  --post_type=page \
  --post_status=publish \
  --post_title="Block Explorer" \
  --post_content='<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Block Explorer</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"large"} -->
<p class="has-large-font-size">This page demonstrates every supported Gutenberg block type. Use it as a visual reference to verify that BlockBridge renders each block correctly.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Heading Block</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Heading Level 1</h1>
<!-- /wp:heading -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Heading Level 2</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Heading Level 3</h3>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Heading Level 4</h4>
<!-- /wp:heading -->

<!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading">Heading Level 5</h5>
<!-- /wp:heading -->

<!-- wp:heading {"level":6} -->
<h6 class="wp-block-heading">Heading Level 6</h6>
<!-- /wp:heading -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Paragraph Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A standard paragraph with <strong>bold</strong>, <em>italic</em>, <code>inline code</code>, and <a href="https://developer.wordpress.org/block-editor/">a hyperlink</a>. Paragraphs are the most common block type and support rich inline formatting.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"backgroundColor":"pale-cyan-blue","fontSize":"medium"} -->
<p class="has-pale-cyan-blue-background-color has-background has-medium-font-size">This paragraph has a background color and medium font size applied through block attributes.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Image Block</h2>
<!-- /wp:heading -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/blockbridge-hero/800/400","alt":"Mountain landscape at sunrise with fog rolling through the valley","caption":"Dawn breaks over the Appalachian ridgeline — captured during a weekend hike near Shenandoah."} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/blockbridge-hero/800/400" alt="Mountain landscape at sunrise with fog rolling through the valley"/><figcaption class="wp-element-caption">Dawn breaks over the Appalachian ridgeline — captured during a weekend hike near Shenandoah.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">List Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>An unordered list with nested items demonstrating multi-level hierarchy:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Front-end frameworks<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>React — component-based UI with a virtual DOM</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Vue — progressive framework with a gentle learning curve</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Svelte — compiles components to vanilla JavaScript at build time</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Back-end platforms<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>WordPress — powers over 40% of the web</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Node.js — JavaScript on the server</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Build tools and bundlers</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>An ordered list with step-by-step instructions and nested sub-steps:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Install the WordPress plugin<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Download the plugin zip from the releases page</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Upload via <strong>Plugins &gt; Add New &gt; Upload</strong> in wp-admin</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Click <em>Activate</em> to enable the serializer</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Verify the REST API returns <code>serializedBlocks</code> on posts and pages</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Install the React library and start rendering blocks</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Quote Block</h2>
<!-- /wp:heading -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>Any application that can be written in JavaScript will eventually be written in JavaScript.</p>
<!-- /wp:paragraph --><cite>Jeff Atwood, co-founder of Stack Overflow</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:quote {"className":"is-style-large"} -->
<blockquote class="wp-block-quote is-style-large"><!-- wp:paragraph -->
<p>The best way to predict the future is to invent it.</p>
<!-- /wp:paragraph --><cite>Alan Kay, computer scientist and Turing Award recipient</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Buttons Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Buttons support fill and outline styles, custom colors, and flexible layout alignment:</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"vivid-cyan-blue"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-vivid-cyan-blue-background-color has-background wp-element-button" href="https://example.com">Get Started</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="https://example.com">Read the Docs</a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"vivid-green-cyan"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-vivid-green-cyan-background-color has-background wp-element-button" href="https://example.com">Download</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline","textColor":"vivid-red"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-vivid-red-color has-text-color wp-element-button" href="https://example.com">Cancel</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Group Block</h2>
<!-- /wp:heading -->

<!-- wp:group {"backgroundColor":"pale-pink","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-pale-pink-background-color has-background"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Grouped Content</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This heading and paragraph are wrapped in a group block with a pale pink background. Groups act as generic containers for organizing nested blocks.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Columns Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A two-column layout — the default for side-by-side content:</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Column One</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Columns create responsive multi-column layouts. Each column is its own block that can hold arbitrary inner content.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Column Two</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>On smaller screens, columns stack vertically. BlockBridge preserves the responsive stacking behavior through CSS classes.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>A three-column layout with mixed content types inside each column:</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"sizeSlug":"medium","linkDestination":"none","url":"https://picsum.photos/seed/col-one/300/200","alt":"Dense forest canopy viewed from below"} -->
<figure class="wp-block-image size-medium"><img src="https://picsum.photos/seed/col-one/300/200" alt="Dense forest canopy viewed from below"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Performance</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Server-side rendering and static generation work seamlessly. Each block component is lightweight and tree-shakeable.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"sizeSlug":"medium","linkDestination":"none","url":"https://picsum.photos/seed/col-two/300/200","alt":"Clean workspace with laptop and notebook"} -->
<figure class="wp-block-image size-medium"><img src="https://picsum.photos/seed/col-two/300/200" alt="Clean workspace with laptop and notebook"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Developer Experience</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Override any block renderer with your own components. The library provides sensible defaults while remaining fully extensible.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"sizeSlug":"medium","linkDestination":"none","url":"https://picsum.photos/seed/col-three/300/200","alt":"Colorful abstract pattern representing design flexibility"} -->
<figure class="wp-block-image size-medium"><img src="https://picsum.photos/seed/col-three/300/200" alt="Colorful abstract pattern representing design flexibility"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Design Fidelity</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>WordPress class names and attributes are preserved, so your existing theme styles carry over to the headless front end.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Media and Text Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Image on the left, text on the right (default layout):</p>
<!-- /wp:paragraph -->

<!-- wp:media-text {"mediaType":"image","mediaWidth":40,"mediaUrl":"https://picsum.photos/seed/media-left/400/300","mediaAlt":"Developer working at a standing desk with dual monitors"} -->
<div class="wp-block-media-text alignwide is-stacked-on-mobile" style="grid-template-columns:40% auto">
<figure class="wp-block-media-text__media"><img src="https://picsum.photos/seed/media-left/400/300" alt="Developer working at a standing desk with dual monitors"/></figure>
<div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Image Left, Text Right</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The media-text block places an image beside text content with configurable width ratios. This is the default orientation — the media appears on the left at 40% width and the text fills the remaining space.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:media-text -->

<!-- wp:paragraph -->
<p>Text on the left, image on the right (flipped layout):</p>
<!-- /wp:paragraph -->

<!-- wp:media-text {"mediaPosition":"right","mediaType":"image","mediaWidth":50,"mediaUrl":"https://picsum.photos/seed/media-right/400/300","mediaAlt":"Open notebook with handwritten wireframe sketches"} -->
<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile" style="grid-template-columns:auto 50%">
<div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Text Left, Image Right</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Setting <code>mediaPosition</code> to <code>right</code> flips the layout. The text content leads and the image follows — useful when the copy is the primary focus and the image provides supplementary context.</p>
<!-- /wp:paragraph --></div>
<figure class="wp-block-media-text__media"><img src="https://picsum.photos/seed/media-right/400/300" alt="Open notebook with handwritten wireframe sketches"/></figure></div>
<!-- /wp:media-text -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Separator Block</h2>
<!-- /wp:heading -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>The horizontal rule above is a default separator. Below are the wide and dots style variants.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:separator {"className":"is-style-dots"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-dots"/>
<!-- /wp:separator -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Spacer Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A 60-pixel spacer follows this paragraph.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph -->
<p>The space above was created by a spacer block.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Gallery Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A four-column gallery with captions and alt text on each image:</p>
<!-- /wp:paragraph -->

<!-- wp:gallery {"columns":4,"linkTo":"none","caption":"A curated selection of photographs from the Pacific Northwest."} -->
<figure class="wp-block-gallery has-nested-images columns-4 is-cropped"><!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/gallery-one/400/300","alt":"Misty evergreen forest at dawn","caption":"Olympic National Forest"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/gallery-one/400/300" alt="Misty evergreen forest at dawn"/><figcaption class="wp-element-caption">Olympic National Forest</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/gallery-two/400/300","alt":"Rocky coastline with crashing waves","caption":"Cannon Beach, Oregon"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/gallery-two/400/300" alt="Rocky coastline with crashing waves"/><figcaption class="wp-element-caption">Cannon Beach, Oregon</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/gallery-three/400/300","alt":"Snow-capped mountain reflected in a still alpine lake","caption":"Mount Rainier"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/gallery-three/400/300" alt="Snow-capped mountain reflected in a still alpine lake"/><figcaption class="wp-element-caption">Mount Rainier</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/gallery-four/400/300","alt":"Wildflower meadow with distant mountain range","caption":"Cascade Range wildflowers"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/gallery-four/400/300" alt="Wildflower meadow with distant mountain range"/><figcaption class="wp-element-caption">Cascade Range wildflowers</figcaption></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Table Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A striped table with header row, multiple body rows, and a caption:</p>
<!-- /wp:paragraph -->

<!-- wp:table {"className":"is-style-stripes","hasFixedLayout":true} -->
<figure class="wp-block-table is-style-stripes"><table class="has-fixed-layout"><thead><tr><th>Block Name</th><th>Category</th><th>Supports Inner Blocks</th><th>Typical Use Case</th></tr></thead><tbody><tr><td>core/paragraph</td><td>Text</td><td>No</td><td>Body copy, descriptions, captions</td></tr><tr><td>core/heading</td><td>Text</td><td>No</td><td>Section titles, page headings</td></tr><tr><td>core/image</td><td>Media</td><td>No</td><td>Photos, diagrams, illustrations</td></tr><tr><td>core/gallery</td><td>Media</td><td>Yes</td><td>Photo grids, portfolio showcases</td></tr><tr><td>core/group</td><td>Design</td><td>Yes</td><td>Section wrappers, background containers</td></tr><tr><td>core/columns</td><td>Design</td><td>Yes</td><td>Multi-column layouts, feature grids</td></tr><tr><td>core/cover</td><td>Design</td><td>Yes</td><td>Hero banners, call-to-action sections</td></tr><tr><td>core/media-text</td><td>Design</td><td>Yes</td><td>Side-by-side image and text layouts</td></tr><tr><td>core/embed</td><td>Embeds</td><td>No</td><td>YouTube, Vimeo, Twitter embeds</td></tr><tr><td>core/table</td><td>Text</td><td>No</td><td>Data tables, comparison charts</td></tr></tbody></table><figcaption class="wp-element-caption">All 22 supported block types are rendered by BlockBridge, grouped by their WordPress editor category.</figcaption></figure>
<!-- /wp:table -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Video Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A self-hosted video with HTML5 native controls. For third-party video services, use the embed block below.</p>
<!-- /wp:paragraph -->

<!-- wp:video {"src":"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4","controls":true,"caption":"Big Buck Bunny — an open-source animated short film by the Blender Foundation."} -->
<figure class="wp-block-video"><video controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></video><figcaption class="wp-element-caption">Big Buck Bunny — an open-source animated short film by the Blender Foundation.</figcaption></figure>
<!-- /wp:video -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Audio Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>An audio player for self-hosted audio content like podcasts, music tracks, or sound samples:</p>
<!-- /wp:paragraph -->

<!-- wp:audio {"src":"https://upload.wikimedia.org/wikipedia/commons/2/21/Sonata_no._14_in_C-sharp_minor_%22Moonlight_Sonata%22_-_I._Adagio_sostenuto.ogg","caption":"SoundHelix Song 1 — a procedurally generated music track for testing audio playback."} -->
<figure class="wp-block-audio"><audio controls src="https://upload.wikimedia.org/wikipedia/commons/2/21/Sonata_no._14_in_C-sharp_minor_%22Moonlight_Sonata%22_-_I._Adagio_sostenuto.ogg"></audio><figcaption class="wp-element-caption">SoundHelix Song 1 — a procedurally generated music track for testing audio playback.</figcaption></figure>
<!-- /wp:audio -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Embed Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A YouTube embed with 16:9 aspect ratio:</p>
<!-- /wp:paragraph -->

<!-- wp:embed {"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=dQw4w9WgXcQ
</div><figcaption class="wp-element-caption">YouTube embed — Rick Astley, Never Gonna Give You Up.</figcaption></figure>
<!-- /wp:embed -->

<!-- wp:paragraph -->
<p>A Vimeo embed demonstrating a different video provider:</p>
<!-- /wp:paragraph -->

<!-- wp:embed {"url":"https://vimeo.com/347119375","type":"video","providerNameSlug":"vimeo","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-vimeo wp-block-embed-vimeo wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://vimeo.com/347119375
</div><figcaption class="wp-element-caption">Vimeo embed — a short film showcasing cinematic landscape footage.</figcaption></figure>
<!-- /wp:embed -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Code Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A preformatted code snippet with syntax preserved. Uses a monospace font with a dark background for readability.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import { BlockContent } from &apos;@iwritec0de/blockbridge-react&apos;;

function App({ blocks }) {
  return (
    &lt;BlockContent
      blocks={blocks}
      renderContainer
    /&gt;
  );
}</code></pre>
<!-- /wp:code -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Verse Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Preformatted verse for poetry or lyrics that preserves line breaks and whitespace.</p>
<!-- /wp:paragraph -->

<!-- wp:verse -->
<pre class="wp-block-verse">Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

— Robert Frost, <em>The Road Not Taken</em></pre>
<!-- /wp:verse -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">File Block</h2>
<!-- /wp:heading -->

<!-- wp:file {"href":"https://example.com/documents/blockbridge-architecture-overview.pdf","fileName":"blockbridge-architecture-overview.pdf","displayPreview":false} -->
<div class="wp-block-file"><a href="https://example.com/documents/blockbridge-architecture-overview.pdf">blockbridge-architecture-overview.pdf</a><a href="https://example.com/documents/blockbridge-architecture-overview.pdf" class="wp-block-file__button wp-element-button" download>Download</a></div>
<!-- /wp:file -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Cover Block</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A cover with a background image, dark overlay at 70% opacity, and center-aligned content:</p>
<!-- /wp:paragraph -->

<!-- wp:cover {"url":"https://picsum.photos/seed/cover-mountain/1200/400","dimRatio":70,"overlayColor":"black","minHeight":350,"contentPosition":"center center"} -->
<div class="wp-block-cover" style="min-height:350px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-70 has-background-dim"></span><img class="wp-block-cover__image-background" alt="Dramatic mountain landscape with storm clouds" src="https://picsum.photos/seed/cover-mountain/1200/400" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":2,"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color">Full-Width Cover with Dark Overlay</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Cover blocks display text on top of a background image. The dim ratio controls the overlay opacity for readability against any photo.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"white","textColor":"black"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-black-color has-white-background-color has-text-color has-background wp-element-button" href="https://example.com">Learn More</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->

<!-- wp:paragraph -->
<p>A cover with bottom-left content positioning and a lighter overlay:</p>
<!-- /wp:paragraph -->

<!-- wp:cover {"url":"https://picsum.photos/seed/cover-city/1200/400","dimRatio":40,"overlayColor":"vivid-cyan-blue","minHeight":300,"contentPosition":"bottom left"} -->
<div class="wp-block-cover has-custom-content-position is-position-bottom-left" style="min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-vivid-cyan-blue-background-color has-background-dim-40 has-background-dim"></span><img class="wp-block-cover__image-background" alt="Aerial view of a city skyline at twilight" src="https://picsum.photos/seed/cover-city/1200/400" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"level":3,"textColor":"white"} -->
<h3 class="wp-block-heading has-white-color has-text-color">Bottom-Left Positioned Content</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"white"} -->
<p class="has-white-color has-text-color">The <code>contentPosition</code> attribute shifts inner content to any edge or corner of the cover.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover -->'

# ---------------------------------------------------------------------------
# Seed Posts
# ---------------------------------------------------------------------------
echo "[demo] Creating posts..."

# --- Post 1: Getting Started ---
$WP post create \
  --post_type=post \
  --post_status=publish \
  --post_title="Getting Started with Headless WordPress" \
  --post_content='<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Why Go Headless?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Traditional WordPress themes tightly couple your content with its presentation. A headless approach separates these concerns: WordPress becomes a powerful content management backend, and your front end is free to use React, Vue, or any framework that fits your team.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The trade-off has always been Gutenberg fidelity. Block-based content is rich and structured inside WordPress, but the REST API returns flat HTML — losing all that semantic information. BlockBridge solves this by serializing the block tree into JSON and providing React components that reconstruct the original layout.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Quick Start Checklist</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Install and activate the <strong>blockbridge-wp</strong> plugin on your WordPress site</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Verify the REST API returns a <code>serializedBlocks</code> field on posts and pages</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Add <code>@iwritec0de/blockbridge-parser</code> to your React project via npm or pnpm</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Import the <code>BlockContent</code> component and pass it your block data</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Apply the default stylesheet or write your own overrides</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>The fastest way to understand BlockBridge is to spin up the demo environment and inspect the rendered output alongside the raw JSON.</p>
<!-- /wp:paragraph --><cite>BlockBridge Documentation</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Minimal React Example</h2>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import { BlockContent } from "@iwritec0de/blockbridge-parser";
import { useEffect, useState } from "react";

function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/wp-json/wp/v2/posts/1")
      .then((r) => r.json())
      .then((post) => setBlocks(post.serializedBlocks));
  }, []);

  return &lt;BlockContent blocks={blocks} /&gt;;
}</code></pre>
<!-- /wp:code -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"vivid-cyan-blue"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-vivid-cyan-blue-background-color has-background wp-element-button" href="http://localhost:8080/block-explorer/">View All Block Types</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="https://github.com/iwritec0de/blockbridge-react">GitHub Repository</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->'

# --- Post 2: Building with Gutenberg Blocks ---
$WP post create \
  --post_type=post \
  --post_status=publish \
  --post_title="Building with Gutenberg Blocks" \
  --post_content='<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Block Architecture Fundamentals</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Every Gutenberg block has a name, a set of attributes, optional inner HTML, and an optional array of inner blocks. Understanding this structure is essential for both authoring content and building renderers.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Simple Blocks</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Blocks like paragraph, heading, and image have no inner blocks. They carry their content in the inner HTML and configure presentation through attributes like <code>textAlign</code>, <code>level</code>, or <code>sizeSlug</code>.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Container Blocks</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Blocks like group, columns, and buttons are containers. Their inner HTML is mostly structural — the real content lives in their inner blocks array, which the renderer must traverse recursively.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:group {"backgroundColor":"light-cyan-bluish-gray","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-light-cyan-bluish-gray-background-color has-background"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Serialized Block JSON Structure</h3>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{
  "blockName": "core/columns",
  "attrs": {},
  "innerBlocks": [
    {
      "blockName": "core/column",
      "attrs": {},
      "innerBlocks": [
        {
          "blockName": "core/paragraph",
          "attrs": {},
          "innerHTML": "&lt;p&gt;Column content here.&lt;/p&gt;",
          "innerBlocks": []
        }
      ]
    }
  ]
}</pre>
<!-- /wp:preformatted --></div>
<!-- /wp:group -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Block Attribute Reference</h2>
<!-- /wp:heading -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Attribute</th><th>Used By</th><th>Example Value</th></tr></thead><tbody><tr><td>level</td><td>core/heading</td><td>2</td></tr><tr><td>ordered</td><td>core/list</td><td>true</td></tr><tr><td>mediaType</td><td>core/media-text</td><td>"image"</td></tr><tr><td>columns</td><td>core/gallery</td><td>3</td></tr><tr><td>className</td><td>All blocks</td><td>"is-style-outline"</td></tr><tr><td>backgroundColor</td><td>Group, paragraph, etc.</td><td>"pale-cyan-blue"</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Custom Renderers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>BlockBridge ships default renderers for all 25 supported block types, but you can override any of them by passing a custom component map to <code>BlockContent</code>. This lets you integrate your own design system while still benefiting from the recursive rendering engine.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import { BlockContent } from "@iwritec0de/blockbridge-parser";
import MyCustomHeading from "./MyCustomHeading";

const overrides = {
  "core/heading": MyCustomHeading,
};

function Page({ blocks }) {
  return &lt;BlockContent blocks={blocks} customRenderers={overrides} /&gt;;
}</code></pre>
<!-- /wp:code -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/pipeline/800/300","alt":"Diagram of the block rendering pipeline"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/pipeline/800/300" alt="Diagram of the block rendering pipeline"/><figcaption class="wp-element-caption">The rendering pipeline: WordPress blocks to serialized JSON to React components.</figcaption></figure>
<!-- /wp:image -->'

# --- Post 3: Media Showcase ---
$WP post create \
  --post_type=post \
  --post_status=publish \
  --post_title="Media Showcase" \
  --post_content='<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Images</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>BlockBridge renders image blocks with full support for captions, alt text, size slugs, and link destinations. Responsive sizing is handled through standard WordPress CSS classes.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/featured-photo/800/450","alt":"A featured photograph rendered by BlockBridge"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/featured-photo/800/450" alt="A featured photograph rendered by BlockBridge"/><figcaption class="wp-element-caption">A single image block with caption support.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Gallery</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Galleries render as a grid of image blocks inside a figure wrapper. The column count and cropping behavior are controlled by block attributes.</p>
<!-- /wp:paragraph -->

<!-- wp:gallery {"columns":2,"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-2 is-cropped"><!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/landscape-a/600/400","alt":"Gallery landscape photo A"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/landscape-a/600/400" alt="Gallery landscape photo A"/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/landscape-b/600/400","alt":"Gallery landscape photo B"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/landscape-b/600/400" alt="Gallery landscape photo B"/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/landscape-c/600/400","alt":"Gallery landscape photo C"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/landscape-c/600/400" alt="Gallery landscape photo C"/></figure>
<!-- /wp:image -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none","url":"https://picsum.photos/seed/landscape-d/600/400","alt":"Gallery landscape photo D"} -->
<figure class="wp-block-image size-large"><img src="https://picsum.photos/seed/landscape-d/600/400" alt="Gallery landscape photo D"/></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Video</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The video block supports self-hosted files with native HTML5 controls. For third-party videos, use the embed block instead.</p>
<!-- /wp:paragraph -->

<!-- wp:video {"src":"https://example.com/media/product-demo.mp4","controls":true,"caption":"Product walkthrough video."} -->
<figure class="wp-block-video"><video controls src="https://example.com/media/product-demo.mp4"></video><figcaption class="wp-element-caption">Product walkthrough video.</figcaption></figure>
<!-- /wp:video -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Audio</h2>
<!-- /wp:heading -->

<!-- wp:audio {"src":"https://example.com/media/podcast-episode-12.mp3","caption":"Episode 12: Headless WordPress in Production."} -->
<figure class="wp-block-audio"><audio controls src="https://example.com/media/podcast-episode-12.mp3"></audio><figcaption class="wp-element-caption">Episode 12: Headless WordPress in Production.</figcaption></figure>
<!-- /wp:audio -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">File Download</h2>
<!-- /wp:heading -->

<!-- wp:file {"href":"https://example.com/documents/blockbridge-whitepaper.pdf","fileName":"blockbridge-whitepaper.pdf"} -->
<div class="wp-block-file"><a href="https://example.com/documents/blockbridge-whitepaper.pdf">blockbridge-whitepaper.pdf</a><a href="https://example.com/documents/blockbridge-whitepaper.pdf" class="wp-block-file__button wp-element-button" download>Download</a></div>
<!-- /wp:file -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">YouTube Embed</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Embed blocks wrap third-party content in a responsive container. The provider slug determines which styling is applied.</p>
<!-- /wp:paragraph -->

<!-- wp:embed {"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=dQw4w9WgXcQ
</div><figcaption class="wp-element-caption">A classic embed test.</figcaption></figure>
<!-- /wp:embed -->'

# --- Post 4: Design System Demo ---
$WP post create \
  --post_type=post \
  --post_status=publish \
  --post_title="Design System Demo" \
  --post_content='<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Typography Scale</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gutenberg provides named font size presets that map to CSS custom properties. BlockBridge preserves these class names so your theme styles apply correctly.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Heading Level 1</h1>
<!-- /wp:heading -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Heading Level 2</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Heading Level 3</h3>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">Heading Level 4</h4>
<!-- /wp:heading -->

<!-- wp:heading {"level":5} -->
<h5 class="wp-block-heading">Heading Level 5</h5>
<!-- /wp:heading -->

<!-- wp:heading {"level":6} -->
<h6 class="wp-block-heading">Heading Level 6</h6>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">This paragraph uses the <strong>small</strong> font size preset. Useful for captions, footnotes, and secondary text.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"medium"} -->
<p class="has-medium-font-size">This paragraph uses the <strong>medium</strong> font size preset. A comfortable reading size for body copy.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"large"} -->
<p class="has-large-font-size">This paragraph uses the <strong>large</strong> font size preset. Good for lead paragraphs and introductions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"x-large"} -->
<p class="has-x-large-font-size">This paragraph uses the <strong>x-large</strong> font size preset. Effective for hero text and major callouts.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Color Palette</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"backgroundColor":"pale-pink","textColor":"vivid-red"} -->
<p class="has-vivid-red-color has-pale-pink-background-color has-text-color has-background">Vivid red text on a pale pink background.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"backgroundColor":"pale-cyan-blue","textColor":"vivid-cyan-blue"} -->
<p class="has-vivid-cyan-blue-color has-pale-cyan-blue-background-color has-text-color has-background">Vivid cyan-blue text on a pale cyan-blue background.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"backgroundColor":"light-green-cyan","textColor":"vivid-green-cyan"} -->
<p class="has-vivid-green-cyan-color has-light-green-cyan-background-color has-text-color has-background">Vivid green-cyan text on a light green-cyan background.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"backgroundColor":"luminous-vivid-amber","textColor":"black"} -->
<p class="has-black-color has-luminous-vivid-amber-background-color has-text-color has-background">Black text on a luminous vivid amber background.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Pullquote</h2>
<!-- /wp:heading -->

<!-- wp:pullquote {"textColor":"vivid-purple","borderColor":"vivid-purple"} -->
<figure class="wp-block-pullquote has-vivid-purple-color has-text-color has-vivid-purple-border-color"><blockquote><p>Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects.</p><cite>Dieter Rams</cite></blockquote></figure>
<!-- /wp:pullquote -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Verse</h2>
<!-- /wp:heading -->

<!-- wp:verse -->
<pre class="wp-block-verse">The fog comes
on little cat feet.

It sits looking
over harbor and city
on silent haunches
and then moves on.</pre>
<!-- /wp:verse -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">— Carl Sandburg, <em>Fog</em></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Spacing with Spacer Blocks</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Spacer blocks insert vertical whitespace. Below are spacers of increasing height: 20px, 40px, and 80px.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"20px"} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph {"backgroundColor":"pale-cyan-blue"} -->
<p class="has-pale-cyan-blue-background-color has-background">After 20px spacer.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph {"backgroundColor":"pale-pink"} -->
<p class="has-pale-pink-background-color has-background">After 40px spacer.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph {"backgroundColor":"light-green-cyan"} -->
<p class="has-light-green-cyan-background-color has-background">After 80px spacer.</p>
<!-- /wp:paragraph -->'

# ---------------------------------------------------------------------------
# Set static front page
# ---------------------------------------------------------------------------
echo "[demo] Setting static front page..."
$WP option update show_on_front page
$WP option update page_on_front "$HOME_ID"

# ---------------------------------------------------------------------------
# Create navigation menu
# ---------------------------------------------------------------------------
echo "[demo] Creating navigation menu..."
MENU_ID=$($WP menu create "Primary Navigation" --porcelain 2>/dev/null || echo "")
if [ -n "$MENU_ID" ]; then
  $WP menu item add-post "$MENU_ID" "$HOME_ID" --title="Home"

  ABOUT_ID=$($WP post list --post_type=page --title="About" --field=ID --format=ids 2>/dev/null)
  if [ -n "$ABOUT_ID" ]; then
    $WP menu item add-post "$MENU_ID" "$ABOUT_ID" --title="About"
  fi

  EXPLORER_ID=$($WP post list --post_type=page --title="Block Explorer" --field=ID --format=ids 2>/dev/null)
  if [ -n "$EXPLORER_ID" ]; then
    $WP menu item add-post "$MENU_ID" "$EXPLORER_ID" --title="Block Explorer"
  fi

  $WP menu item add-custom "$MENU_ID" "Posts" "http://localhost:8080/posts/"

  $WP menu location assign "$MENU_ID" primary 2>/dev/null || true
fi

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo "[demo] Demo content imported successfully."
echo "[demo] WordPress admin: http://localhost:8080/wp-admin (admin / admin)"
echo "[demo] REST API:        http://localhost:8080/wp-json/wp/v2/posts"
echo "[demo] Pages API:       http://localhost:8080/wp-json/wp/v2/pages"
