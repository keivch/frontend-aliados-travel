import apiBooks from './apiBooks'

export interface Book {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
}

export interface BookSearchResponse {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: Book[]
}

export const searchBooks = async (
  tittle?: string,
  author?: string,
): Promise<BookSearchResponse> => {
  const params: Record<string, string | number> = {
    fields: 'key,title,author_name,first_publish_year,cover_i',
    limit: 20,
  }

  if (tittle) {
    params.title = tittle
  }

  if (author) {
    params.author = author
  }

  const response = await apiBooks.get<BookSearchResponse>('/search.json', { params })

  if (!Array.isArray(response.data?.docs)) {
    throw new Error('La API de libros devolvió una respuesta con formato inesperado.')
  }

  return response.data
}
