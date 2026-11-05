import axios from 'axios'

const apiBooks = axios.create({
  baseURL: import.meta.env.VITE_API_BOOKS_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiBooks
