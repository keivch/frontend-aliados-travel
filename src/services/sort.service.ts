import api from './api'

export interface SortRequest {
  numbers: number[]
}

export interface SortResponse {
  original: number[]
  sorted: number[]
  algoritmo: string
}

export const sortNumbers = async (data: SortRequest): Promise<SortResponse> => {
  const response = await api.post<SortResponse>('/sort', data)
  console.log(response.data)
  return response.data
}
