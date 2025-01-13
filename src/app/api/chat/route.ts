import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Utwórz nowy wątek
    const thread = await openai.beta.threads.create();

    // Dodaj wiadomość do wątku
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Uruchom asystenta
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID!
    });

    // Czekaj na odpowiedź (z timeoutem)
    let response;
    while (true) {
      const runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      
      if (runStatus.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(thread.id);
        response = messages.data[0].content[0].text.value;
        break;
      }
      
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed');
      }
      
      // Czekaj sekundę przed kolejnym sprawdzeniem
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}