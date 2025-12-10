import { Injectable } from '@nestjs/common';
import faqData from './dataset/faq.json';
import { TFIDFCalculator } from './utils/tfidf';

interface FAQ {
  question: string;
  answer: string;
}

@Injectable()
export class ChatbotService {
  private faqs: FAQ[];
  private tfidfCalculator: TFIDFCalculator;

  constructor() {
    // Load dataset FAQ dari file JSON
    this.faqs = faqData as FAQ[];

    // Inisialisasi TF-IDF Calculator dengan dataset
    const documents = this.faqs.map((faq) => faq.question);
    this.tfidfCalculator = new TFIDFCalculator(documents);

    console.log(`Loaded ${this.faqs.length} FAQ data`);
  }

  getAnswer(userQuestion: string): { answer: string; score: number } {
    // Hitung similarity antara pertanyaan user dengan semua FAQ
    const scores = this.tfidfCalculator.getSimilarityScores(userQuestion);

    // Cari index dengan score tertinggi
    let maxScore = 0;
    let bestIndex = 0;

    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
        bestIndex = i;
      }
    }

    // Threshold untuk menentukan apakah jawaban relevan
    const THRESHOLD = 0.1;

    if (maxScore < THRESHOLD) {
      return {
        answer:
          'Maaf, saya tidak memahami pertanyaan Anda. Bisakah Anda mengajukan pertanyaan lain?',
        score: 0,
      };
    }

    return {
      answer: this.faqs[bestIndex].answer,
      score: maxScore,
    };
  }
}
