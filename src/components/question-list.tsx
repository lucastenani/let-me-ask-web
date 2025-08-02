import { useParams } from 'react-router-dom'
import { useRoomQuestions } from '@/http/use-room-questions'
import type { RoomParams } from '@/pages/room'
import { QuestionItem } from './question-item'

export function QuestionList() {
  const { roomId } = useParams<RoomParams>()
  const { data: questions } = useRoomQuestions(roomId ?? '')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Questions & Answers
        </h2>
      </div>

      {questions &&
        questions.length > 0 &&
        questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
    </div>
  )
}
