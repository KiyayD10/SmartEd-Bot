import { Injectable } from '@nestjs/common';
import * as faqData from './dataset/faq.json';
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
    const documents = this.faqs.map(faq => faq.question);
    this.tfidfCalculator = new TFIDFCalculator(documents);

    console.log(`Loaded ${this.faqs.length} FAQ data`);
  }
}
