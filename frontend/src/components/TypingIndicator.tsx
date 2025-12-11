'use client';

export default function TypingIndicator() {
    return (
        <div className="flex justify-start animate-fade-in">
            <div className="flex items-start gap-3">
                {/* Bot Avatar */}
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                    <span className="text-sm">🤖</span>
                </div>
                {/* Placeholder buat gelembung ketik */}
                <div className="glass-effect px-5 py-4 rounded-2xl rounded-tl-sm shadow-xl">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}