import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  askQuestion(@Body('question') question: string) {
    if (!question || question.trim() === '') {
      throw new BadRequestException('Pertanyaan tidak boleh kosong');
    }

    const answer = this.chatbotService.getAnswer(question);

    return {
      success: true,
      question,
      answer: answer.answer,
      confidence: answer.score,
    };
  }
}
