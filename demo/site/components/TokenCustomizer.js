import { useState, useCallback } from 'react';
import CodeBlock from './CodeBlock';

const DEFAULT_TOKENS = {
  '--bb-color-primary': '#4f46e5',
  '--bb-color-text': '#1a1a1a',
  '--bb-color-bg': '#ffffff',
  '--bb-font-size-base': '16px',
  '--bb-block-margin': '28px',
  '--bb-spacing-md': '16px',
  '--bb-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--bb-radius-sm': '4px',
};

const FONT_OPTIONS = [
  { label: 'System Default', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  { label: 'Georgia (Serif)', value: 'Georgia, "Times New Roman", Times, serif' },
  { label: 'Courier (Mono)', value: '"Courier New", Courier, monospace' },
  { label: 'Verdana', value: 'Verdana, Geneva, Tahoma, sans-serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
];

export default function TokenCustomizer({ onTokenChange }) {
  const [tokens, setTokens] = useState({ ...DEFAULT_TOKENS });

  const updateToken = useCallback((name, value) => {
    setTokens((prev) => {
      const next = { ...prev, [name]: value };
      onTokenChange(next);
      return next;
    });
  }, [onTokenChange]);

  const handleReset = () => {
    setTokens({ ...DEFAULT_TOKENS });
    onTokenChange({ ...DEFAULT_TOKENS });
  };

  const generateCSS = () => {
    const lines = Object.entries(tokens)
      .map(([key, val]) => `  ${key}: ${val};`)
      .join('\n');
    return `:root {\n${lines}\n}`;
  };

  return (
    <div className="customizer">
      <div className="customizer__section">
        <h3 className="customizer__heading">Colors</h3>

        <label className="customizer__field">
          <span className="customizer__label">Primary Color</span>
          <div className="customizer__color-row">
            <input
              type="color"
              value={tokens['--bb-color-primary']}
              onChange={(e) => updateToken('--bb-color-primary', e.target.value)}
              className="customizer__color-input"
            />
            <code className="customizer__value">{tokens['--bb-color-primary']}</code>
          </div>
        </label>

        <label className="customizer__field">
          <span className="customizer__label">Text Color</span>
          <div className="customizer__color-row">
            <input
              type="color"
              value={tokens['--bb-color-text']}
              onChange={(e) => updateToken('--bb-color-text', e.target.value)}
              className="customizer__color-input"
            />
            <code className="customizer__value">{tokens['--bb-color-text']}</code>
          </div>
        </label>

        <label className="customizer__field">
          <span className="customizer__label">Background Color</span>
          <div className="customizer__color-row">
            <input
              type="color"
              value={tokens['--bb-color-bg']}
              onChange={(e) => updateToken('--bb-color-bg', e.target.value)}
              className="customizer__color-input"
            />
            <code className="customizer__value">{tokens['--bb-color-bg']}</code>
          </div>
        </label>
      </div>

      <div className="customizer__section">
        <h3 className="customizer__heading">Typography</h3>

        <label className="customizer__field">
          <span className="customizer__label">
            Font Size Base
            <code className="customizer__value">{tokens['--bb-font-size-base']}</code>
          </span>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={parseInt(tokens['--bb-font-size-base'])}
            onChange={(e) => updateToken('--bb-font-size-base', `${e.target.value}px`)}
            className="customizer__range"
          />
        </label>

        <label className="customizer__field">
          <span className="customizer__label">Font Family</span>
          <select
            value={tokens['--bb-font-family']}
            onChange={(e) => updateToken('--bb-font-family', e.target.value)}
            className="customizer__select"
          >
            {FONT_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="customizer__section">
        <h3 className="customizer__heading">Spacing &amp; Shape</h3>

        <label className="customizer__field">
          <span className="customizer__label">
            Block Margin
            <code className="customizer__value">{tokens['--bb-block-margin']}</code>
          </span>
          <input
            type="range"
            min="0"
            max="56"
            step="4"
            value={parseInt(tokens['--bb-block-margin'])}
            onChange={(e) => updateToken('--bb-block-margin', `${e.target.value}px`)}
            className="customizer__range"
          />
        </label>

        <label className="customizer__field">
          <span className="customizer__label">
            Spacing Medium
            <code className="customizer__value">{tokens['--bb-spacing-md']}</code>
          </span>
          <input
            type="range"
            min="8"
            max="32"
            step="2"
            value={parseInt(tokens['--bb-spacing-md'])}
            onChange={(e) => updateToken('--bb-spacing-md', `${e.target.value}px`)}
            className="customizer__range"
          />
        </label>

        <label className="customizer__field">
          <span className="customizer__label">
            Border Radius
            <code className="customizer__value">{tokens['--bb-radius-sm']}</code>
          </span>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={parseInt(tokens['--bb-radius-sm'])}
            onChange={(e) => updateToken('--bb-radius-sm', `${e.target.value}px`)}
            className="customizer__range"
          />
        </label>
      </div>

      <div className="customizer__actions">
        <button className="btn btn--secondary" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      <div className="customizer__section">
        <h3 className="customizer__heading">Generated CSS</h3>
        <CodeBlock code={generateCSS()} language="css" title="CSS Custom Properties" />
      </div>
    </div>
  );
}
