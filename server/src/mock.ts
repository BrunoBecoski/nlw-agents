import rawData from './data.json' with { type: 'json' }

type dbMockProps = {
  id: string
  name: string
  description?: string
  questions: {
    id: string
    question: string
    answer: string | null
  }[]
}[]

let dbMock: dbMockProps = rawData

export function getRoomsMock() {
  const rooms = dbMock.map((room) => ({
    id: room.id,
    name: room.name,
    description: room.description,
    questionsCount: room.questions.length,
  }))

  return rooms
}

export function getQuestionsMock(roomId: string) {
  const roomFound = dbMock.find((room) => room.id === roomId)

  if (roomFound === undefined) {
    return
  }

  const questionsFiltered = roomFound.questions

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
    questions: [],
  }

  dbMock = [...dbMock, newRoom]

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

  const roomFound = dbMock.find((room) => room.id === roomId)

  if (roomFound === undefined) {
    return
  }

  roomFound.questions = [...roomFound.questions, newQuestion]

  const roomIndex = dbMock.findIndex((room) => room.id === roomId)

  dbMock.splice(roomIndex, 1, roomFound)

  return {
    questionId: newQuestion.id,
    answer: newQuestion.answer,
  }
}
