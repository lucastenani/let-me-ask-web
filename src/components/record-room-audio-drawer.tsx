/** biome-ignore-all lint/nursery/noNestedComponentDefinitions: dev */
import { Mic, StopCircleIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

const isRecordingSupported: boolean =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudioDrawer() {
  const { roomId } = useParams<{ roomId: string }>()

  const [isRecording, setIsRecording] = useState<boolean>(false)
  const recorder = useRef<MediaRecorder | null>(null)

  function handleStopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }

  async function UploadAudioFile(audioStream: Blob) {
    const formData = new FormData()

    formData.append('audio', audioStream, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()
    console.log(result)
  }

  async function handleStartRecording() {
    if (!isRecordingSupported) {
      return toast.error('Recording is not supported in this browser.')
    }

    setIsRecording(true)

    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      })

      recorder.current = new MediaRecorder(audioStream, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      })

      recorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          toast.success('Audio recorded successfully!')
          UploadAudioFile(event.data)
        }
      }

      recorder.current.onstart = () => {
        console.log('Recording started')
      }

      recorder.current.onstop = () => {
        console.log('Recording stopped')
      }

      recorder.current.start()
    } catch {
      toast.error('Failed to start recording. Please try again.')
      setIsRecording(false)
    }
  }

  return (
    <DrawerContent className="flex h-screen min-w-full flex-col items-center justify-center gap-4 p-5 md:min-w-md">
      <DrawerHeader>
        <DrawerTitle>Ask with your voice</DrawerTitle>
        <DrawerDescription>
          Don’t feel like typing? Tap the button below and start speaking — your
          voice will be converted into text and sent straight to LetMeAsk.
          Perfect for live streams or quick thoughts you want the AI to catch.
        </DrawerDescription>
      </DrawerHeader>
      <Button
        onClick={() =>
          isRecording ? handleStopRecording() : handleStartRecording()
        }
        variant={isRecording ? 'destructive' : 'default'}
      >
        {isRecording ? (
          <>
            <StopCircleIcon className="mr-2 h-4 w-4" />
            Listening...
          </>
        ) : (
          <>
            <Mic className="mr-2 h-4 w-4" />
            Start speaking
          </>
        )}
      </Button>
      <DrawerFooter className="grid w-full grid-cols-2 gap-2">
        <DrawerClose asChild>
          <Button variant="destructive">Cancel</Button>
        </DrawerClose>
        <Button>Send</Button>
      </DrawerFooter>
    </DrawerContent>
  )
}
