import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Room() {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <h1 className="font-bold text-2xl ">Room Details</h1>

      <Link to="/">
        <Button className="cursor-pointer" variant={'link'}>
          Create Room
        </Button>
      </Link>
    </div>
  )
}
