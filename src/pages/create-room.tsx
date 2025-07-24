import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function CreateRoom() {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <h1 className="font-bold text-2xl ">Create a New Room</h1>

      <Link to="/room">
        <Button className="cursor-pointer" variant={'link'}>
          Room
        </Button>
      </Link>
    </div>
  )
}
