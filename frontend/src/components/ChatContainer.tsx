'use client'

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
    return (
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin">
            {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
        </div>
    );
}