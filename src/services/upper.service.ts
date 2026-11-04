import api from './api'

export interface UpperCaseResponse {
  filename: string
  count: number
  status: string
}

export const convertToUpperCase = async (file: File): Promise<UpperCaseResponse> => {
  const formData = new FormData()

  formData.append('file', file)

  const response = await api.post<UpperCaseResponse>('/uppercase', formData)

  return response.data
}
