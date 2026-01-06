import { 
  Injectable, 
  BadRequestException,   // 400: Bad Request 
} from '@nestjs/common';
import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const SYSTEM_PROMPT = `
  入力された単語あるいは文章に対して、そこから連想される絵文字を3つ提案してください。
  3つの絵文字はそれぞれ、以下の要素を持つ JSON 形式のリストで返してください。

  - body: 絵文字本体（例: '🌸'）
  - name: 絵文字名（例: '桜'）
  - description: 絵文字推薦理由（例: '春らしいイメージから連想'）

  出力は必ず次のJSONオブジェクト1つで返してください:
  {
    "emojis": [
      { "body": "...", "name": "...", "description": "..." },
      ...
    ]
  }

  - body/name は空文字禁止
  - description は空でもよい
`;

const Emoji = z.object({
  body: z.string(),
  name: z.string(),
  description: z.string(),
});

const ExpectResponseFormat = z.object({
  emojis: z.array(Emoji).length(3),
});

@Injectable()
export class AppService {
  private client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async emojiSuggest(text: string) {
    // 入力が空文字または文字列でない場合はエラー
    if (!text || typeof text !== "string") {
      throw new BadRequestException("text is required");
    } 

    const response = await this.client.responses.parse({
      model: "gpt-4o-mini",
      instructions: SYSTEM_PROMPT,
      input: text,
      text: {
        format: zodTextFormat(ExpectResponseFormat, "expect_response_format")
      },
    });

    return response.output_parsed;
  }
}
