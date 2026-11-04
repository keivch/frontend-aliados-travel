<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps<{
  loading?: boolean
}>()

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
  <form
    @submit.prevent="handleSearch"
    class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
  >
    <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
      <Icon icon="mdi:book-search-outline" class="text-2xl" />
      Buscar
    </h2>

    <div class="mb-4">
      <label for="title" class="mb-1 block text-sm font-semibold text-primary">Título</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Ej: Harry Potter"
        class="w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>

    <div class="mb-4">
      <label for="author" class="mb-1 block text-sm font-semibold text-primary">Autor</label>
      <input
        id="author"
        v-model="author"
        type="text"
        placeholder="Ej: J.K. Rowling"
        class="w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="flex items-center gap-2 rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/90 disabled:opacity-60"
    >
      <Icon icon="mdi:magnify" />
      {{ loading ? 'Buscando...' : 'Buscar libros' }}
    </button>
  </form>
</template>
