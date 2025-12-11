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
                {/* Input Field Dasar */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={disabled}
                    placeholder="Ketik pertanyaan..."
                    className="flex-1 px-4 py-2 bg-white/10 rounded-full text-white focus:outline-none"
                />

                {/* Tombol Send Dasar */}
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className="p-3 bg-blue-600 rounded-full text-white disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
}