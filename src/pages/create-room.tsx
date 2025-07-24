import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type GetRoomsAPIResponse = Array<{ id: string; name: string }>

export function CreateRoom() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const data: GetRoomsAPIResponse = await response.json()
      return data
    },
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <h1 className="font-bold text-2xl ">Create a New Room</h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading && rooms && (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      )}

      <Link to="/room">
        <Button className="cursor-pointer" variant={'link'}>
          Room
        </Button>
      </Link>
    </div>
  )
}
