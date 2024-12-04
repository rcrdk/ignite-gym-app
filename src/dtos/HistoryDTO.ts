export type HistoryDTO = {
  id: string
  name: string
  group: string
  hour: string
}

export type HistoryGroupDTO = {
  title: string
  data: HistoryDTO[]
}
