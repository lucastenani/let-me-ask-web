import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array<{ id: string; name: string }>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsAPIResponse = await response.json()
      return result
    },
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      {isLoading && <p>Loading...</p>}

      {data ? (
        <ul>
          {data.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/room/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rooms</p>
      )}
    </div>
  )
}
