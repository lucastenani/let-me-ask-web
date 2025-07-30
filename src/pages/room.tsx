import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Room() {
  const { roomId } = useParams<{ roomId: string }>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="font-bold text-2xl ">Room Details</h1>
      <h2 className="mt-4 text-lg">{roomId}</h2>

      <Link to="/">
        <Button className="cursor-pointer" variant={'link'}>
          Back to Rooms
        </Button>
      </Link>
    </div>
  )
}
