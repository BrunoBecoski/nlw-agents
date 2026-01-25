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
  'Para fazer uma picareta no Minecraft, você precisará de uma bancada de trabalho e dos materiais apropriados. A receita básica para qualquer picareta é a seguinte:\n\n### Materiais Necessários:\n*   **2 Gravetos**\n*   **3 Unidades do Material da Picareta** (tábuas de madeira, pedregulho, lingotes de cobre, lingotes de ferro, lingotes de ouro, diamantes ou lingotes de Netherite)\n\n### Passos para Criar uma Picareta:\n1.  **Crie Gravetos:** Se você não tiver gravetos, pode criá-los a partir de tábuas de madeira. Coloque duas tábuas de madeira (qualquer tipo) uma acima da outra em qualquer espaço da grade de criação do seu inventário ou da bancada de trabalho para obter 4 gravetos.\n2.  **Abra a Bancada de Trabalho:** Interaja com uma bancada de trabalho para abrir a grade de criação 3x3.\n3.  **Posicione os Itens:**\n    *   Coloque 3 unidades do material escolhido (por exemplo, tábuas de madeira para uma picareta de madeira, pedregulho para uma picareta de pedra) na linha superior da grade de criação.\n    *   Coloque 1 graveto no quadrado central da segunda linha.\n    *   Coloque 1 graveto no quadrado central da terceira linha.\n\n    A disposição ficará assim:\n\n    ```\n    [Material] [Material] [Material]\n    [Vazio]    [Graveto]  [Vazio]\n    [Vazio]    [Graveto]  [Vazio]\n    ```\n\n4.  **Pegue a Picareta:** A picareta será exibida no slot de resultado. Arraste-a para o seu inventário.\n\n### Tipos de Picaretas e Seus Materiais:\nVocê pode fazer picaretas de diferentes materiais, cada uma com durabilidade e velocidade de mineração variadas:\n*   **Madeira:** 3 Tábuas de Madeira (de qualquer tipo de madeira)\n*   **Pedra:** 3 Pedregulho (ou variantes de pedra como *cobblestone*, *blackstone*, *andesite*, *diorite*, *granite*)\n*   **Cobre:** 3 Lingotes de Cobre\n*   **Ferro:** 3 Lingotes de Ferro\n*   **Ouro:** 3 Lingotes de Ouro\n*   **Diamante:** 3 Diamantes\n*   **Netherite:** Uma picareta de Netherite não é criada diretamente. Você precisa de uma picareta de diamante e um lingote de Netherite para melhorá-la em uma mesa de ferraria.'

const context =
  'O usuário perguntou como fazer uma picareta no Minecraft. A resposta detalha os passos e materiais necessários para criar diferentes tipos de picaretas (madeira, pedra, cobre, ferro, ouro, diamante e Netherite) usando uma bancada de trabalho, conforme as mecânicas atuais do jogo. As informações são baseadas em pesquisas que indicam que o método de criação de picaretas permanece consistente.'

export async function fakeGenerateAnswer({
  successfully,
  delay = 5000,
}: FakeGenerateAnswerRequest): Promise<FakeGenerateAnswerResponse> {
  await new Promise((resolve) => setTimeout(resolve, delay))

  return { successfully, answer, context }
}
