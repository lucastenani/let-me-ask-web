import { CreateRoomForm } from '@/components/create-room-form'
import { RoomsList } from '@/components/rooms-list'

export function CreateRoom() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-6">
      <CreateRoomForm />
      <RoomsList />
    </div>
  )
}
