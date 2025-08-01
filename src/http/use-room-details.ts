import { useQuery } from '@tanstack/react-query'
import type { GetRoomDetailsResponse } from './types/get-room-details-response'

export function useRoomDetails(id: string) {
  return useQuery({
    queryKey: ['get-room-details', id],
    queryFn: async ({ queryKey }) => {
      const [, roomId] = queryKey
      const response = await fetch(`http://localhost:3333/rooms/${roomId}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Room not found')
        }
        throw new Error('Server error')
      }

      return (await response.json()) as GetRoomDetailsResponse
    },
    enabled: !!id,
    retry: false,
  })
}
