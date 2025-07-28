import lib from 'dayjs'
import 'dayjs/locale/pt-BR'
import relativeTime from 'dayjs/plugin/relativeTime'

lib.extend(relativeTime)

export const dayjs = lib
