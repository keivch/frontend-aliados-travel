<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Book } from '../services/books.service'

defineProps<{
  book: Book
}>()
</script>

<template>
  <article class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
    <img
      v-if="book.cover_i"
      :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
      :alt="book.title"
      class="h-48 w-full bg-soft object-contain"
    />

    <div v-else class="flex h-48 items-center justify-center bg-soft text-primary">
      <Icon icon="mdi:book-open-page-variant-outline" class="text-4xl" />
    </div>

    <div class="border-l-4 border-accent p-4">
      <h3 class="mb-3 font-bold text-primary">{{ book.title }}</h3>

      <p class="text-sm font-semibold text-primary">Autor</p>
      <p class="mb-2">{{ book.author_name?.join(', ') || 'Desconocido' }}</p>

      <p class="text-sm font-semibold text-primary">Año</p>
      <p>{{ book.first_publish_year || 'Desconocido' }}</p>
    </div>
  </article>
</template>
