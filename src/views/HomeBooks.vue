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
  <main class="min-h-screen bg-soft p-6 md:p-10">
    <h1 class="mb-2 text-center text-2xl font-bold text-primary">Buscar libros</h1>
    <p class="mb-8 text-center text-gray-600">Busca libros por título o autor</p>

    <nav class="mb-8 flex justify-center gap-4">
      <RouterLink
        to="/"
        class="mr-4 rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
      >
        Inicio
      </RouterLink>
    </nav>

    <div class="mx-auto flex max-w-5xl flex-col gap-6">
      <BookSearch :loading="loading" @search="handleSearch" />

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <p
        v-if="searched && !loading && !error && books.length === 0"
        class="rounded border-l-4 border-accent bg-white p-4 text-sm text-gray-600"
      >
        No se encontraron libros.
      </p>

      <BookList v-if="!loading && books.length > 0" :books="books" />
    </div>
  </main>
</template>
