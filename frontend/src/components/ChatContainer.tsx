'use client'

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatContainerProps {
    messages: Message[];
    isLoading: boolean;
}

export default function ChatContainer({ messages, isLoading }: ChatContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Logic Auto scroll ke bawah saat ada message baru
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isLoading]);
    return (
        <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin"
        >
            {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}

            {/* State kosong */}
            {messages.length === 0 && !isLoading && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                        <div className="text-6xl mb-4 animate-bounce">🤖</div>
                        <h2 className="text-xl font-semibold text-white/90">
                            Selamat Datang di TF-IDF Chatbot
                        </h2>
                        <p className="text-white/60 max-w-md">
                            Ajukan pertanyaan Anda dan saya akan memberikan jawaban terbaik menggunakan algoritma TF-IDF
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}