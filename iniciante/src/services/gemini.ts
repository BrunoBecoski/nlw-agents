import { GoogleGenAI } from '@google/genai'

interface GenerateAnswerProps {
  apiKey: string
  game: string
  question: string
  contextConversation: string
}

export async function generateAnswer({
  apiKey,
  game,
  question,
  contextConversation,
}: GenerateAnswerProps) {
  const gemini = new GoogleGenAI({
    apiKey,
  })

  // const tools = [{ googleSearch: {} }]

  const model = 'gemini-2.5-flash'

  const systemInstruction = `
		## Especialidade
		- Você é um especialista assistente de meta para o jogo ${game}.

		## Tarefa
		- Você deve responser as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas.

		## Regras
		- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
		- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relaciona ao jogo'.
		- Considere a data atual ${new Date().toLocaleDateString()}
		- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
		- Nunca responda com mecânicas que você não tenha certeza de que existe no patch atual.
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Histórico simplificado anterior: ${contextConversation}`,
          },
          {
            text: `Pergunta atual: ${question}`,
          },
        ],
      },
    ],
    config: {
      // tools,
      systemInstruction,
      responseMimeType: 'application/json',
      responseJsonSchema: {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
            description:
              'A responta em markdown, seja direto e responsa no máximo 500 palavras. Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.',
          },
          context: {
            type: 'string',
            description:
              'A versão concisa de toda a conversa até agora, com no máximo 150 palavras.',
          },
        },
        required: ['answer', 'context'],
      },
    },
  })

  if (!response.text) {
    throw new Error('Falhar ao gerar resposta pelo Gemini')
  }

  const { answer, context } = JSON.parse(response.text)

  return { answer, context }
}
