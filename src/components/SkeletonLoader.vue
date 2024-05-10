<script setup lang="ts">

</script>

<template>
<v-row>
  <v-col v-for="index in 9" :key="index" cols="12" sm="6" md="4">
    <v-skeleton-loader
        class="skeleton-loader"
        max-width="300"
        max-height="200"
        type="card"
        elevation="5"
    ></v-skeleton-loader>
  </v-col>
</v-row>
</template>

<style scoped>

</style>