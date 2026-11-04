<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-soft p-6 md:p-10">
    <h1 class="mb-2 text-center text-3xl font-bold text-primary">Prueba técnica</h1>
    <p class="mb-8 text-center text-gray-600">Selecciona uno de los puntos para continuar</p>

    <div class="flex w-full max-w-3xl flex-col gap-6 md:flex-row">
      <!-- Punto 1 -->
      <RouterLink
        to="/sorted"
        class="group flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
      >
        <span
          class="mb-3 inline-block rounded bg-soft px-2 py-1 text-xs font-semibold text-primary"
        >
          Punto 1
        </span>
        <h2 class="mb-2 flex items-center gap-2 text-xl font-bold text-primary">
          <Icon icon="mdi:language-python" class="text-2xl" />
          API Flask
        </h2>
        <p class="mb-4 text-sm text-gray-600">
          Ordenar números con merge sort y contar las mayúsculas de un archivo de texto.
        </p>
        <span class="flex items-center gap-1 text-sm font-semibold text-accent">
          Ir al punto 1
          <Icon icon="mdi:arrow-right" class="transition group-hover:translate-x-1" />
        </span>
      </RouterLink>

      <!-- Punto 2 -->
      <RouterLink
        to="/Books"
        class="group flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
      >
        <span
          class="mb-3 inline-block rounded bg-soft px-2 py-1 text-xs font-semibold text-primary"
        >
          Punto 2
        </span>
        <h2 class="mb-2 flex items-center gap-2 text-xl font-bold text-primary">
          <Icon icon="mdi:book-open-page-variant-outline" class="text-2xl" />
          API de libros
        </h2>
        <p class="mb-4 text-sm text-gray-600">Consulta los libros con la API.</p>
        <span class="flex items-center gap-1 text-sm font-semibold text-accent">
          Ir al punto 2
          <Icon icon="mdi:arrow-right" class="transition group-hover:translate-x-1" />
        </span>
      </RouterLink>
    </div>
  </main>
</template>
