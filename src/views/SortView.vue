<script setup lang="ts">
import { ref } from 'vue'
import { sortNumbers } from '../services/sort.service'

const numbers = ref('')
const loading = ref(false)
const error = ref('')
const result = ref<number[]>([])
const algoritmo = ref('')
const original = ref<number[]>([])

async function handleSubmit() {
  error.value = ''
  const parsed = numbers.value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part !== '')
    .map((part) => Number(part))

  if (parsed.length === 0 || parsed.some((value) => Number.isNaN(value))) {
    error.value = 'Ingresa números válidos separados por comas.'
    result.value = []
    return
  }

  loading.value = true
  try {
    const response = await sortNumbers({ numbers: parsed })
    result.value = response.sorted
    algoritmo.value = response.algoritmo
    original.value = response.original
  } catch {
    error.value = 'No se pudo ordenar los números.'
    result.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <main class="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 class="text-2xl font-bold mb-4">Ordenar números</h1>

        <form @submit.prevent="handleSubmit" class="flex flex-col items-center">
            <input v-model="numbers" placeholder="Ingrese los números separados por comas" class="border border-gray-300 rounded px-4 py-2 mb-4 w-64" />

            <button type="submit" :disabled="loading" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
            {{ loading ? 'Ordenando...' : 'Ordenar' }}
            </button>
        </form>

        <p v-if="error">{{ error }}</p>
        <div v-if="result.length" class="mt-4">
      <h2 class="text-xl font-semibold mb-2">Resultado:</h2>
      <p class="mb-4">{{ result.join(', ') }}</p>
      <h2 class="text-xl font-semibold mb-2">Original:</h2>  
      <p class="mb-4">{{ original.join(', ') }}</p>
      <h2 class="text-xl font-semibold mb-2">Algoritmo:</h2>
      <p class="mb-4">{{ algoritmo }}</p>
    </div>
    </main>
</template>
