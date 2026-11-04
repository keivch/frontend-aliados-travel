<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/sort">Ordenar números</RouterLink>
    |
    <RouterLink to="/uppercase">Procesar archivo</RouterLink>
  </nav>

  <RouterView />
</template>
