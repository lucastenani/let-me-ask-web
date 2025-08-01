import { ArrowLeft, Radio } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { QuestionForm } from '@/components/question-form'
import { QuestionItem } from '@/components/question-item'
import { Button } from '@/components/ui/button'
import { useRoomDetails } from '@/http/use-room-details'

type RoomParams = {
  roomId: string
}

export function Room() {
  const { roomId } = useParams<RoomParams>()
  const navigate = useNavigate()

  const { data, error } = useRoomDetails(roomId ?? '')

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
          <Link to={`/room/${roomId}/audio`}>
            <Button className="flex items-center gap-2" variant="secondary">
              <Radio className="size-4" />
              Record Audio
            </Button>
          </Link>
        </div>
        <h1 className="mb-2 font-bold text-3xl text-foreground">
          {data?.name ? data.name : 'Question Room'}
        </h1>
        <p className="text-muted-foreground">
          {data?.description
            ? data.description
            : 'Ask questions and receive AI answers'}
        </p>
      </div>

      <div className="mb-8">
        <QuestionForm roomId={roomId} />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl text-foreground">
            Questions & Answers
          </h2>
        </div>

        <QuestionItem
          question={{
            id: '1',
            question: 'Question 1',
            createdAt: new Date().toISOString(),
          }}
        />
      </div>
    </div>
  )
}
