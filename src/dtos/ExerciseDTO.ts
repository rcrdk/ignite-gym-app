import type { GroupDTO } from './GroupDTO'

export type ExerciseDTO = {
  id: string
  group: GroupDTO
  demo: string
  name: string
  repetitions: number
  series: number
  thumb: string
}
