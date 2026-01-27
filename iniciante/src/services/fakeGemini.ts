interface FakeGenerateAnswerRequest {
  successfully: boolean
  delay?: number
}

interface FakeGenerateAnswerResponse {
  successfully: boolean
  answer?: string
  context?: string
}

const answer =
  'Para fazer uma picareta no Minecraft, você precisará de uma bancada de trabalho e dos materiais apropriados. A receita básica para qualquer picareta é a seguinte:### Materiais Necessários:*   **2 Gravetos***   **3 Unidades do Material da Picareta** (tábuas de madeira, pedregulho, lingotes de cobre, lingotes de ferro, lingotes de ouro, diamantes ou lingotes de Netherite)  **Abra a Bancada de Trabalho:** Interaja com uma bancada de trabalho para abrir a grade de criação 3x3.3.  **Posicione os Itens:**    *   Coloque 3 unidades do material escolhido (por exemplo, tábuas de madeira para uma picareta de madeira, pedregulho para uma picareta de pedra) na linha superior da grade de criação.    *   Coloque 1 graveto no quadrado central da segunda linha.    *   Coloque 1 graveto no quadrado central da terceira linha.    A disposição ficará assim:\n  [Material] [Material] [Material]\n    [Vazio]    [Graveto]  [Vazio]\n    [Vazio]    [Graveto]  [Vazio]\n .  **Pegue a Picareta:** A picareta será exibida no slot de resultado. Arraste-a para o seu inventário.'

const context =
  'O usuário perguntou como fazer uma picareta no Minecraft. A resposta detalha os passos e materiais necessários para criar diferentes tipos de picaretas (madeira, pedra, cobre, ferro, ouro, diamante e Netherite) usando uma bancada de trabalho, conforme as mecânicas atuais do jogo. As informações são baseadas em pesquisas que indicam que o método de criação de picaretas permanece consistente.'

export async function fakeGenerateAnswer({
  successfully,
  delay = 5000,
}: FakeGenerateAnswerRequest): Promise<FakeGenerateAnswerResponse> {
  await new Promise((resolve) => setTimeout(resolve, delay))

  return { successfully, answer, context }
}
