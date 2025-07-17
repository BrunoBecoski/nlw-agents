import { GoogleGenAI } from "@google/genai";

interface GenerateAnswerProps {
	apiKey: string;
	game: string;
	question: string;
}

export async function generateAnswer({
	apiKey,
	game,
	question,
}: GenerateAnswerProps) {
	const gemini = new GoogleGenAI({
		apiKey,
	});
	const prompt = `
    Olha, tenho esse jogo ${game} e queria saber ${question}
  `.trim();

	const response = await gemini.models.generateContent({
		model: "gemini-2.5-flash",
		contents: [
			{
				text: prompt,
			},
		],
		config: {},
	});

	if (!response.text) {
		throw new Error("Falhar ao gerar resposta pelo Gemini");
	}

	return response.text;
}
