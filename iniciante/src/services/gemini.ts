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

  const tools = [{ googleSearch: {} }]

  const model = 'gemini-2.5-flash'

  const systemInstruction = `
    Sua tarefa é dupla:

    Os resultados DEVEM ser formatado como um único bloco de código JSON Markdown, **SEM NENHUM OUTRO TEXTO FORA DELE**.
    O formato do JSON deve ser:
      json {
        "answer": "A resposta completa e formatada em Markdown para a pergunta.",
        "context": "O novo resumo da conversa completa."
      }

    1) Responda à pergunta ("question") usando o "contextConversation" como contexto.
      ## Especialidade
      - Você é um especialista assistente de meta para o jogo ${game}.

      ## Tarefa
      - Você deve usar o Google Search para pesquisar o patch atual (baseado na data ${new Date().toLocaleDateString()}) para dar a resposta mais coerente e atualizada.
      - A resposta deve seguir as regras de formatação listadas na descrição do campo "answer" do JSON.

      ## Regras
      - Se você não sabe a resposta, responda APENAS com 'Não sei' (dentro do campo "answer").
      - Se a pergunta não está relacionada ao jogo, responda APENAS com 'Essa pergunta não está relacionada ao jogo' (dentro do campo "answer").
      - Nunca responda com mecânicas que você não tenha certeza de que existe no patch atual.
      - Não faça saudações ou despedidas.
      - Máximo de 500 palavras.

    2) Gere o novo resumo da conversa (campo "context" do JSON).
      ##  Regras
      - A versão concisa de toda a conversa até agora.
      - Máximo de 150 palavras.
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
      tools,
      systemInstruction,
    },
  })

  if (!response.text) {
    throw new Error('Falhar ao gerar resposta pelo Gemini')
  }

  const match = response.text.match(/```json\s*([\s\S]*?)\s*```/)
  const jsonString = match[1].trim()
  const parsedObject = JSON.parse(jsonString)

  const { answer, context } = parsedObject

  return { answer, context }
}
