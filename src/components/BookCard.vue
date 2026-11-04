<script setup lang="ts">
import type { Book } from '../services/books.service'

defineProps<{
  book: Book
}>()
</script>

<template>
  <article class="book-card">
    <img
      v-if="book.cover_i"
      :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
      :alt="book.title"
    />

    <div v-else class="no-cover">Sin portada</div>

    <h3>{{ book.title }}</h3>

    <p>Autor: {{ book.author_name?.join(', ') || 'Desconocido' }}</p>

    <p>Año de publicación: {{ book.first_publish_year || 'Desconocido' }}</p>
  </article>
</template>
