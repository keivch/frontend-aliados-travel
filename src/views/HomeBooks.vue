<script setup lang="ts">
import { ref } from 'vue'

import BookSearch from '../components/BookSearch.vue'
import BookList from '@/components/BookList.vue'

import { searchBooks } from '@/services/books.service.ts'

import type { Book } from '@/services/books.service.ts'

interface SearchFilters {
  title: string
  author: string
}

const books = ref<Book[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searched = ref(false)

const handleSearch = async (filters: SearchFilters) => {
  loading.value = true
  error.value = null
  searched.value = true
  books.value = []

  try {
    const response = await searchBooks(filters.title, filters.author)

    books.value = response.docs
  } catch (err) {
    error.value = 'Error al buscar libros. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <h1>Buscar Libros</h1>

    <p>Busca libros por título o autor</p>

    <BookSearch @search="handleSearch"></BookSearch>

    <p v-if="loading">Cargando resultados...</p>

    <p v-if="error">{{ error }}</p>

    <p v-if="searched && !loading && !error && books.length === 0">No se encontraron libros.</p>

    <BookList v-if="!loading && books.length > 0" :books="books" />
  </main>
</template>
