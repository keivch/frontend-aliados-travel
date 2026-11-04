<script setup lang="ts">
import { ref } from 'vue'
import { sortNumbers } from '../services/sort.service'
import { convertToUpperCase } from '../services/upper.service'

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
    errorMessageNumbers.value = 'Por favor, ingrese solo números válidos separados por comas o espacios.'
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
    errorMessageNumbers.value = error instanceof Error ? error.message : 'Error al ordenar los números.'
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
    errorMessageUpper.value = error instanceof Error ? error.message : 'Error al procesar el archivo.'
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
  <main class="flex">
    <div class="w-1/2 flex flex-col items-center justify-center p-8">
      <h2 class="text-2xl font-bold mb-4">Ordenar Números</h2>
      <input
        v-model="numbersInput"
        type="text"
        placeholder="Ingrese números separados por comas o espacios"
        class="border p-2 mb-4 w-full"
      />
      <button
        @click="handleSubmitNumbers"
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Ordenar
      </button>
      <div v-if="loading" class="mt-4">Cargando...</div>
      <div v-if="errorMessageNumbers" class="mt-4 text-red-500">{{ errorMessageNumbers }}</div>
      <div v-if="sortedNumbers.length > 0" class="mt-4">
        <h3 class="text-xl font-semibold">Números Originales:</h3>
        <p>{{ originalNumbers.join(', ') }}</p>
        <h3 class="text-xl font-semibold mt-2">Números Ordenados:</h3>
        <p>{{ sortedNumbers.join(', ') }}</p>
        <h3 class="text-xl font-semibold mt-2">Algoritmo Utilizado:</h3>
        <p>{{ algorithm }}</p>
      </div>
    </div>
    <div class="w-1/2 flex flex-col items-center p-8">
      <h2 class="text-2xl font-bold mb-4">Contar Mayúsculas de un Archivo</h2>
      <input
        type="file"
        accept=".txt"
        class="border p-2 mb-4"
        @change="handleFileChange"
      />
      <button
        @click="handleFileUpload"
        class="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Procesar Archivo
      </button>
      <div v-if="errorMessageUpper" class="mt-4 text-red-500">{{ errorMessageUpper }}</div>
      <div v-if="upperCaseCount !== null" class="mt-4">
        <h3 class="text-xl font-semibold">Archivo Procesado:</h3>
        <p>Nombre del Archivo: {{ filename }}</p>
        <p>Cantidad de Mayúsculas: {{ upperCaseCount }}</p>
      </div>
    </div>
  </main>
</template>
