'use client';

import { useState, useEffect } from 'react';
import ChatContainer from '@/components/ChatContainer';
import ChatInput from '@/components/ChatInput';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Welcome message saat pertama load
  useEffect(() => {
    const welcomeMessages: Message[] = [
      {
        id: '1',
        text: "Halo! Saya chatbot berbasis TF-IDF. Saya siap menjawab pertanyaan Anda tentang kampus.",
        isUser: false,
        timestamp: new Date(),
      },
      {
        id: '2',
        text: "Saya menggunakan algoritma TF-IDF untuk memahami pertanyaan Anda dan memberikan jawaban yang paling relevan. Silakan ajukan pertanyaan!",
        isUser: false,
        timestamp: new Date(),
      },
    ];
    
    setMessages(welcomeMessages);
  }, []);

  const handleSendMessage = async (text: string) => {
    // Tambahkan pesan user
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Kirim request ke backend
      const response = await fetch('http://localhost:3001/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: text }),
      });

      const data = await response.json();

      // Simulasi delay untuk efek natural
      await new Promise(resolve => setTimeout(resolve, 800));

      // Tambahkan jawaban bot
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.success ? data.answer : "Maaf, terjadi kesalahan pada server",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Tidak dapat terhubung ke server",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
              <h1 className="text-2xl font-bold text-white">SmartEd-Bot</h1>
              <p className="text-sm text-white/80">Project Sederhana Dibuat Oleh: Robani Diansyah</p>
            </div>
          </div>
          
          <div className="absolute top-6 right-8 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/80">Online</span>
          </div>
        </div>

        <ChatContainer messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />

        <div className="px-6 py-3 bg-white/5 border-t border-white/10">
          <p className="text-xs text-white/60 text-center">
            💡 <span className="text-white/80">Tip:</span> Tanya tentang informasi kampus, TF-IDF, atau cara kerja chatbot.
          </p>
        </div>
      </div>
    </main>
  );
}