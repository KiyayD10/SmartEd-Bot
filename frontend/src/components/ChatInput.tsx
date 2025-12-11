'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="px-6 py-4 bg-white/5 border-t border-white/10">
            <div className="flex items-center gap-3">

                {/* Input Field */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={disabled}
                        placeholder={disabled ? "Bot sedang mengetik..." : "Ketik pertanyaan Anda..."}
                        className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {input.length > 0 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <span className="text-xs text-white/40">{input.length}</span>
                        </div>
                    )}
                </div>

                {/* Tombol Send */}
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className="group relative w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg hover:scale-110 active:scale-95"
                >
                    {disabled ? (
                        // Loading spinner
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        // Send icon
                        <svg 
                            className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    )}

                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
            </div>
        </div>
    );
}