<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  search: [filters: { title: string; author: string }]
}>()

const title = ref('')
const author = ref('')

const handleSearch = () => {
  if (!title.value.trim() && !author.value.trim()) {
    return
  }

  emit('search', {
    title: title.value.trim(),
    author: author.value.trim(),
  })
}
</script>

<template>
  <form @submit.prevent="handleSearch">
    <div>
      <label for="title">Title:</label>
      <input id="title" v-model="title" type="text" placeholder="Ej: Harry Potter" />
    </div>

    <div>
      <label for="author">Author:</label>
      <input id="author" v-model="author" type="text" placeholder="Ej: J.K. Rowling" />
    </div>

    <button type="submit">Buscar libros</button>
  </form>
</template>
