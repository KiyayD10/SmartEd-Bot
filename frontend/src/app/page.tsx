'use client';

import ChatContainer from '@/components/ChatContainer';
import ChatInput from '@/components/ChatInput';

export default function Home() {
  const messages = [
    {
      id: '1',
      text: 'Halo! Ini tampilan awal Chatbot.',
      isUser: false,
      timestamp: new Date(),
    }
  ];
  const isLoading = false;

  const handleSendMessage = (text: string) => {
    console.log('User ngetik:', text);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl h-[90vh] max-h-[800px] glass-effect rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative bg-linear-to-r from-purple-600 to-blue-600 px-8 py-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl animate-bounce-slow">
              🤖
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">TF-IDF Chatbot</h1>
              <p className="text-sm text-white/80">Powered by NestJS & AI</p>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="absolute top-6 right-8 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/80">Online</span>
          </div>
        </div>

        {/* Chat Container */}
        <ChatContainer messages={messages} isLoading={isLoading} />

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />

        {/* Footer */}
        <div className="px-6 py-3 bg-white/5 border-t border-white/10">
          <p className="text-xs text-white/60 text-center">
            💡 <span className="text-white/80">Tip:</span> Tanya tentang "TF-IDF", "NestJS", "Cosine Similarity", atau topik NLP lainnya
          </p>
        </div>
      </div>
    </main>
  );
}