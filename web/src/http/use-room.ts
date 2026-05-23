import { useQuery } from '@tanstack/react-query'

import type { GetRoomResponse } from './types/get-room-response'

export function useRoom(id: string) {
  return useQuery({
    queryKey: ['get-room'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/room/${id}`)
      const result: GetRoomResponse = await response.json()

      return result
    },
  })
}
