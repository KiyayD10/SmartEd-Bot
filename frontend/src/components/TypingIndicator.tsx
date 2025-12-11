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
                    <span className="text-xs text-white/50">Typing...</span>
                </div>
            </div>
        </div>
    );
}