import { GoogleGenAI } from '@google/genai'

interface GenerateAnswerRequest {
  apiKey: string
  game: string
  question: string
  contextConversation: string
}

interface GenerateAnswerResponse {
  successfully: boolean
  answer?: string
  context?: string
}

const regex = /```json\s*([\s\S]*?)\s*```/

export async function generateAnswer({
  apiKey,
  game,
  question,
  contextConversation,
}: GenerateAnswerRequest): Promise<GenerateAnswerResponse> {
  const gemini = new GoogleGenAI({
    apiKey,
  })

  const tools = [{ googleSearch: {} }]

  const model = 'gemini-2.5-flash'

  const systemInstruction = `
    Sua tarefa é dupla, e **o resultado final DEVE SER APENAS UM ÚNICO BLOCO DE CÓDIGO JSON MARKDOWN**.

    NÃO gere NENHUM TEXTO, introduções, explicações, ou qualquer outro conteúdo FORA do bloco JSON.
    
    O formato do JSON é obrigatório:
      json {
        "answer": "O conteúdo da resposta, formatado em Markdown.",
        "context": "O novo resumo conciso de toda a conversa."
      }

    1) Defina o conteúdo do campo "answer".
      ## Especialidade
      - Você é um especialista assistente de meta para o jogo ${game}.

      ## Tarefa
     - O conteúdo DEVE ser a resposta à "question", usando o "contextConversation" como contexto.
     - Você deve usar o Google Search para pesquisar o patch atual (baseado na data ${new Date().toLocaleDateString()}) para dar a resposta mais coerente e atualizada.

      ## Regras do Conteúdo "answer"
      - O conteúdo deve ser formatado em Markdown.
      - Máximo de 500 palavras.
      - Se você não sabe a resposta, o conteúdo DEVE ser APENAS 'Não sei'.
      - Se a pergunta não está relacionada ao jogo, o conteúdo DEVE ser APENAS 'Essa pergunta não está relacionada ao jogo'.
      - Nunca responda com mecânicas que você não tenha certeza de que existe no patch atual.
      - Não faça saudações ou despedidas.

    2) Defina o conteúdo do campo "context".
      ##  Regras do Conteúdo "context"
      - O conteúdo DEVE ser a versão concisa de toda a conversa até agora (contextConversation + question + resposta gerada).
      - Máximo de 150 palavras.
  `.trim()

  try {
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
      return {
        successfully: false,
      }
    }

    const match = response.text.match(regex)

    if (match?.[1]) {
      const jsonString = match[1].trim()
      const parsedObject = JSON.parse(jsonString)

      if (
        typeof parsedObject.answer === 'string' &&
        typeof parsedObject.context === 'string'
      ) {
        const { answer, context } = parsedObject

        return { successfully: true, answer, context }
      }
      return { successfully: false }
    }
    return { successfully: false }
  } catch {
    return { successfully: false }
  }
}
