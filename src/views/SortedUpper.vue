<script setup lang="ts">
import { ref } from 'vue'
import { sortNumbers } from '../services/sort.service'
import { convertToUpperCase } from '../services/upper.service'
import { Icon } from '@iconify/vue'

//variables ordenar numeros
const numbersInput = ref('')
const sortedNumbers = ref<number[]>([])
const originalNumbers = ref<number[]>([])
const errorMessageNumbers = ref('')
const algorithm = ref('')

//variables contar mayusculas
const fileInput = ref<File | null>(null)
const upperCaseCount = ref<number | null>(null)
const filename = ref<string | null>(null)
const errorMessageUpper = ref('')

const loading = ref(false)

async function handleSubmitNumbers() {
  loading.value = true
  errorMessageNumbers.value = ''
  sortedNumbers.value = []
  originalNumbers.value = []

  const numbersArray = numbersInput.value
    .trim()
    .split(/[\s,]+/)
    .map((num) => parseFloat(num))

  if (numbersArray.some(isNaN)) {
    errorMessageNumbers.value =
      'Por favor, ingrese solo números válidos separados por comas o espacios.'
    sortedNumbers.value = []
    originalNumbers.value = []
    loading.value = false
    return
  }

  originalNumbers.value = numbersArray

  try {
    const result = await sortNumbers({ numbers: numbersArray })
    sortedNumbers.value = result.sorted
    loading.value = false
    algorithm.value = result.algoritmo
  } catch (error) {
    errorMessageNumbers.value =
      error instanceof Error ? error.message : 'Error al ordenar los números.'
    sortedNumbers.value = []
    originalNumbers.value = []
    loading.value = false
  }
}

async function handleFileUpload() {
  if (!fileInput.value) {
    errorMessageUpper.value = 'Por favor, seleccione un archivo.'
    return
  }

  upperCaseCount.value = null
  filename.value = null
  errorMessageUpper.value = ''

  try {
    const result = await convertToUpperCase(fileInput.value)
    upperCaseCount.value = result.count
    filename.value = fileInput.value.name
    errorMessageUpper.value = ''
  } catch (error) {
    errorMessageUpper.value =
      error instanceof Error ? error.message : 'Error al procesar el archivo.'
  }
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  fileInput.value = input.files?.[0] ?? null
  upperCaseCount.value = null
  filename.value = null
  errorMessageUpper.value = ''
}
</script>

<template>
  <main class="min-h-screen bg-soft p-6 md:p-10">
    <h1 class="text-center text-2xl font-bold text-primary mb-8">Primer Punto</h1>

    <div class="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row">
      <!-- Ordenar números -->
      <section class="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
          <Icon icon="mdi:sort-numeric-ascending" class="text-2xl" />
          Ordenar números
        </h2>

        <input
          v-model="numbersInput"
          type="text"
          placeholder="Ej: 5, 3, 8, 1"
          class="mb-4 w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <button
          @click="handleSubmitNumbers"
          :disabled="loading"
          class="flex items-center gap-2 rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          <Icon icon="mdi:sort" />
          {{ loading ? 'Ordenando...' : 'Ordenar' }}
        </button>

        <p v-if="errorMessageNumbers" class="mt-4 text-sm text-red-600">
          {{ errorMessageNumbers }}
        </p>

        <div
          v-if="sortedNumbers.length > 0"
          class="mt-5 rounded border-l-4 border-accent bg-soft p-4"
        >
          <p class="text-sm font-semibold text-primary">Originales</p>
          <p class="mb-2">{{ originalNumbers.join(', ') }}</p>

          <p class="text-sm font-semibold text-primary">Ordenados</p>
          <p class="mb-2">{{ sortedNumbers.join(', ') }}</p>

          <p class="text-sm font-semibold text-primary">Algoritmo</p>
          <p>{{ algorithm }}</p>
        </div>
      </section>

      <!-- Contar mayúsculas -->
      <section class="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
          <Icon icon="mdi:format-letter-case-upper" class="text-2xl" />
          Contar mayúsculas
        </h2>

        <input
          type="file"
          accept=".txt"
          @change="handleFileChange"
          class="mb-4 block w-full rounded border border-gray-300 p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-soft file:px-3 file:py-1 file:text-primary"
        />

        <button
          @click="handleFileUpload"
          class="flex items-center gap-2 rounded bg-accent px-4 py-2 text-white transition hover:bg-accent/90"
        >
          <Icon icon="mdi:file-upload-outline" />
          Procesar archivo
        </button>

        <p v-if="errorMessageUpper" class="mt-4 text-sm text-red-600">
          {{ errorMessageUpper }}
        </p>

        <div
          v-if="upperCaseCount !== null"
          class="mt-5 rounded border-l-4 border-accent bg-soft p-4"
        >
          <p class="text-sm font-semibold text-primary">Archivo</p>
          <p class="mb-2">{{ filename }}</p>

          <p class="text-sm font-semibold text-primary">Mayúsculas</p>
          <p>{{ upperCaseCount }}</p>
        </div>
      </section>
    </div>
  </main>
</template>
