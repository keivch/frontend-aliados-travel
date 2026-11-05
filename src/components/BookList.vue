<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BookCard from './BookCard.vue'
import type { Book } from '../services/books.service.ts'

defineProps<{
  books: Book[]
}>()
</script>

<template>
  <section>
    <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
      <Icon icon="mdi:bookshelf" class="text-2xl" />
      Resultados
    </h2>

    <div class="grid gap-5 md:grid-cols-2">
      <BookCard v-for="book in books" :key="book.key" :book="book" />
    </div>
  </section>
</template>
