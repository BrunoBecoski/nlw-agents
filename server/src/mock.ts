const dbMock: {
  rooms: {
    id: string
    createdAt: string
    name: string
    description: string | undefined
    questionsCount: number
  }[]
  questions: {
    id: string
    createdAt: string
    roomId: string
    question: string
    answer: string | null
  }[]
} = {
  rooms: [
    {
      id: '881ac01c-237b-4fc7-b083-b5906247f896',
      createdAt: 'Mon Mar 09 2026 18:00:00 GMT-0300',
      name: 'Sala do Bruno',
      description: 'Descrição',
      questionsCount: 1,
    },
  ],

  questions: [
    {
      id: '9031a80d-c1fe-451b-a1da-bd03bb2efa53',
      createdAt: 'Mon Mar 09 2026 19:00:00 GMT-0300',
      roomId: '881ac01c-237b-4fc7-b083-b5906247f896',
      question: 'O que é react?',
      answer:
        "Com base no conteúdo da aula, 'React é ima biblioteca que serve para a construção de interfaces'. Conforme o contexto, ele constrói 'interfaces altamente componentizada' utilizando JSX, HTML e CSS.",
    },
  ],
}

export function getRoomsMock() {
  return dbMock.rooms
}

export function getQuestionsMock(roomId: string) {
  const questionsFiltered = dbMock.questions.filter(
    (question) => question.roomId === roomId
  )

  return questionsFiltered
}

export function createRoomMock({
  name,
  description,
}: {
  name: string
  description?: string
}) {
  const newRoom = {
    id: String(crypto.randomUUID()),
    createdAt: String(new Date()),
    name,
    description,
    questionsCount: 0,
  }

  dbMock.rooms = [...dbMock.rooms, newRoom]

  const roomId = newRoom.id

  return roomId
}

export function createQuestionMock({
  roomId,
  question,
}: {
  roomId: string
  question: string
}) {
  const newQuestion = {
    id: String(crypto.randomUUID()),
    createdAt: String(new Date()),
    roomId,
    question,
    answer: null,
  }

  dbMock.questions = [...dbMock.questions, newQuestion]

  const rooms = dbMock.rooms.map((room) => {
    if (room.id === roomId) {
      room.questionsCount += 1
    }

    return room
  })

  dbMock.rooms = rooms

  return {
    questionId: newQuestion.id,
    answer: newQuestion.answer,
  }
}
