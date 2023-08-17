<script setup lang="ts">
import {  RouterView, RouterLink } from 'vue-router'

</script>

<template>
  <nav>
    <RouterLink to ="/Model1"> Model1 </RouterLink>
    <RouterLink to ="/Model2"> Model2 </RouterLink>
    <RouterLink to ="/Model3"> Model3 </RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>

</style>
