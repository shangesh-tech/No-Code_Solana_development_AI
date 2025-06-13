'use client';
import { useState } from 'react';
import axios from 'axios';
import FileTreeViewer from './FileTreeViewer';
import CodeViewer from './CodeViewer';

export default function Chat() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async () => {
        if (prompt.trim()) {
            setLoading(true);
            setError(null);
            setFiles(null);
            setSelectedFile(null);

            try {
                const response = await axios.post('/api/generate', { prompt });

                if (response.data.files) {
                    setFiles(response.data.files);
                    const firstFile = Object.keys(response.data.files)[0];
                    setSelectedFile(firstFile);
                } else {
                    setError('No files returned from AI');
                }
            } catch (err) {
                console.error('Generation error:', err);
                setError(err?.response?.data?.error || 'Error generating code');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if ((e.shiftKey || e.metaKey) && e.key === 'Enter') {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="space-y-4">

            {/* Input Section */}
            <div className="mb-8">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-white/90 mb-2">
                            Describe your Solana smart contract
                        </label>
                        <div className="relative">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="e.g., Create a token staking program with rewards distribution..."
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none backdrop-blur-sm"
                                rows={4}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-white/40">
                                shift+Enter for new line & Enter to Generate code
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-sm text-white/60">
                            ⚡ Powered by Groq llama 3.3 70b Model
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !prompt.trim()}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                    <span>Generate Code</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}
            </div>

            {files && (
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex h-[700px]">
                        {/* File Tree */}
                        <div className="w-80 border-r border-white/20 bg-white/5">
                            <FileTreeViewer
                                files={files}
                                selectedFile={selectedFile}
                                onSelectFile={setSelectedFile}
                            />
                        </div>

                        {/* Code Editor */}
                        <div className="flex-1 bg-white/5 flex flex-col overflow-hidden">
                            {selectedFile && files[selectedFile] ? (
                                <CodeViewer
                                    filename={selectedFile}
                                    code={files[selectedFile]}
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-white/60">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h8v8H6V6z" />
                                        </svg>
                                        <p>Select a file to view its contents</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}