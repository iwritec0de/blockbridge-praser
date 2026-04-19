import { useState } from 'react';

export default function CodeBlock({ code, language, title }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement('textarea');
			textarea.value = code;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="code-block">
			{title && (
				<div className="code-block__header">
					<span className="code-block__title">{title}</span>
					<button className="code-block__copy" onClick={handleCopy}>
						{copied ? 'Copied!' : 'Copy'}
					</button>
				</div>
			)}
			<pre className="code-block__pre">
				<code className={language ? `language-${language}` : ''}>{code}</code>
			</pre>
		</div>
	);
}
