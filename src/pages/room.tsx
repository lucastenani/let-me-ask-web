import { ArrowLeft, Radio } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { useRoomDetails } from '@/http/use-room-details'
import { RecordRoomAudioDrawer } from '../components/record-room-audio-drawer'

export type RoomParams = {
  roomId: string
}

export function Room() {
  const { roomId } = useParams<RoomParams>()
  const navigate = useNavigate()

  const { data: roomDetails, error } = useRoomDetails(roomId ?? '')

  useEffect(() => {
    if (error) {
      if (error.message === 'Room not found') {
        toast.error('Room not found')
      } else {
        toast.error('Something went wrong')
      }

      navigate('/')
    }
  }, [error, navigate])

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Button>
          </Link>
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Record Audio
              </Button>
            </DrawerTrigger>

            <RecordRoomAudioDrawer />
          </Drawer>
        </div>
        <h1 className="mb-2 font-bold text-3xl text-foreground">
          {roomDetails?.name ? roomDetails.name : 'Question Room'}
        </h1>
        <p className="text-muted-foreground">
          {roomDetails?.description
            ? roomDetails.description
            : 'Ask questions and receive AI answers'}
        </p>
      </div>

      <div className="mb-8">
        <QuestionForm roomId={roomId} />
      </div>

      <QuestionList />
    </div>
  )
}
