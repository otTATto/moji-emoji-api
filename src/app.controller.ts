import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

class SuggestDto {
  text!: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("emoji-suggest")
  async suggest(@Body() dto: SuggestDto) {
    return this.appService.emojiSuggest(dto.text);
  }
}
