import { useQuery } from '@tanstack/react-query'
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
import { dayjs } from '@/lib/dayjs'

type GetRoomsAPIResponse = Array<{
  id: string
  name: string
  createdAt: string
  questionsCount: number
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsAPIResponse = await response.json()
      return result
    },
  })

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
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 ">
          <Card>
            <CardHeader>
              <CardTitle>Recent rooms</CardTitle>
              <CardDescription>
                Quick access to recently created rooms
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">{renderRooms()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
