'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as darkStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

export default function CodeViewer({ filename, code }) {
    const [copied, setCopied] = useState(false);

    const getLanguage = () => {
        const extensionMap = {
            '.rs': 'rust',
            '.toml': 'toml',
            '.js': 'javascript',
            '.jsx': 'jsx',
            '.ts': 'typescript',
            '.tsx': 'tsx',
            '.json': 'json',
            '.md': 'markdown',
            '.py': 'python',
            '.html': 'html',
            '.css': 'css',
            '.sol': 'solidity'
        };

        const extension = Object.keys(extensionMap).find(ext => filename.endsWith(ext));
        return extension ? extensionMap[extension] : 'text';
    };

    const lang = getLanguage();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="mb-2 flex justify-between items-center">
                <div className="text-xl font-mono text-white">{filename}</div>
                <button
                    onClick={copyToClipboard}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                    title="Copy code"
                >
                    {copied ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="overflow-auto flex-1 border border-white/20 rounded-lg">
                <SyntaxHighlighter
                    language={lang}
                    style={darkStyle}
                    customStyle={{
                        borderRadius: '4px',
                        margin: 0,
                        height: '100%',
                        overflow: 'auto'
                    }}
                    showLineNumbers={true}
                    wrapLines={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}