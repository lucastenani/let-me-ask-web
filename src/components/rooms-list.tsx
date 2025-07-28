import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'

export function RoomsList() {
  const { data, isLoading } = useRooms()

  function renderRooms() {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: using the index in the Skeleton is OK
        <Skeleton className="h-12 w-full rounded-lg" key={index} />
      ))
    }

    if (data?.length) {
      return data.map((room) => (
        <Link
          className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-accent"
          key={room.id}
          to={`/rooms/${room.id}`}
        >
          <div className="flex-1 space-y-1">
            <h3 className="truncate font-medium">{room.name}</h3>

            <div className="flex items-center gap-2 ">
              <Badge>{dayjs(room.createdAt).toNow()}</Badge>
              <Badge>{room.questionsCount} question(s)</Badge>
            </div>
          </div>

          <span className="flex items-center gap-1 text-sm hover:text-primary">
            Join <ArrowRight className="size-3" />
          </span>
        </Link>
      ))
    }

    return (
      <p className="text-center text-muted-foreground">
        No recent rooms found.
      </p>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent rooms</CardTitle>
        <CardDescription>
          Quick access to recently created rooms
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">{renderRooms()}</CardContent>
    </Card>
  )
}
