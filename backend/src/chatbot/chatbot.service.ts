import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  getAnswer(question: string) {
    const lowerQuestion = question.toLowerCase();

    // Default jawaban
    let answer = 'Maaf, saya belum mengerti pertanyaan itu.';
    let score = 0.1;

    // Logika sederhana (Rule-based)
    if (lowerQuestion.includes('halo') || lowerQuestion.includes('hai')) {
      answer = 'Halo! Ada yang bisa saya bantu mengenai pelajaran hari ini?';
      score = 0.9;
    } else if (lowerQuestion.includes('siapa kamu')) {
      answer = 'Saya adalah SmartEd Bot, asisten pintar untuk membantumu belajar.';
      score = 1.0;
    } else if (lowerQuestion.includes('jam berapa')) {
      answer = `Sekarang jam ${new Date().toLocaleTimeString('id-ID')}`;
      score = 1.0;
    }

    return {
      answer,
      score,
    };
  }
}
