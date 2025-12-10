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
        </div>
    );
}