import { buildPrompt, parseAIResponse } from '@/lib/ai';
import Groq from 'groq-sdk';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return Response.json({ error: 'Missing prompt' }, { status: 400 });
        }

        const aiPrompt = buildPrompt(prompt);

        const client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const completion = await client.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an AI that generates Solana Anchor Rust code in JSON format. Always respond with valid JSON only.' },
                { role: 'user', content: aiPrompt }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.2,
            max_tokens: 4000,
            response_format: { type: "json_object" }
        });


        if (!completion.choices?.[0]?.message?.content) {
            console.error('No content in AI response');
            return Response.json({ error: 'AI returned empty response' }, { status: 500 });
        }

        const text = completion.choices[0].message.content;

        const files = parseAIResponse(text);

        return Response.json({ files });

    } catch (e) {
        console.error('Groq API error:', e);
        return Response.json({
            error: 'AI generation failed',
            details: e.message
        }, { status: 500 });
    }
}