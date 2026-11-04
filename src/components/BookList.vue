<script setup lang="ts">
import BookCard from './BookCard.vue'
import type { Book } from '../services/books.service.ts'

defineProps<{
  books: Book[]
}>()
</script>

<template>
  <section>
    <h2>Resultados de búsqueda</h2>

    <div class="display-grid gap-5">
      <BookCard v-for="book in books" :key="book.key" :book="book" />
    </div>
  </section>
</template>
