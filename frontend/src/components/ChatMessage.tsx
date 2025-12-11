'use client';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatMessageProps {
    message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const { text, isUser } = message;

    // Logic tampilan pesan USER (Kanan)
    if (isUser) {
        return (
            <div className="flex justify-end animate-slide-up">
                <div className="max-w-[80%] group">
                    <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl rounded-tr-sm shadow-lg">
                        <p className="text-sm leading-relaxed">{text}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-white/50">
                            {message.timestamp.toLocaleTimeString('id-ID', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Logic tampilan pesan BOT (Kiri)
    return (
        <div className="flex justify-start animate-slide-up">
            <div className="max-w-[85%] group">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-sm">🤖</span>
                    </div>
                    <div className="flex-1">
                        <div className="glass-effect text-white px-5 py-3 rounded-2xl rounded-tl-sm shadow-xl">
                            <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-white/50">
                                {message.timestamp.toLocaleTimeString('id-ID', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </span>
                            <span className="text-xs text-white/40">• Bot</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}