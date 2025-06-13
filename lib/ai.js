export function buildPrompt(userPrompt) {
    return `You are a Solana smart contract generator. Generate a Solana Anchor (Rust) project based on the following user request.
Your response must be ONLY valid JSON with no additional text, following this exact format:
{
    "files": {
        "path/to/file.rs": "code content",
        "another/path/file.rs": "more code"
    }
}
Do not include any explanations, notes, or text outside of the JSON structure.

User request: "${userPrompt}"`;
}

export function parseAIResponse(text) {
    try {
        let jsonText = text.trim();

        // remove markdown code block , if needed

        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        // Parse the JSON
        const obj = JSON.parse(jsonText);


        if (!obj.files || typeof obj.files !== 'object') {
            throw new Error('Invalid response format from AI');
        }

        for (const [path, content] of Object.entries(obj.files)) {
            if (typeof content !== 'string') {
                throw new Error(`There is empty content for file ${path}`);
            }
        }

        return obj.files;
    } catch (e) {
        console.error('Failed to parse JSON from AI response:', e.message);
        return {};
    }
}