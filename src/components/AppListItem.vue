<script setup lang="ts">
import {WorkerArray} from "@/interfaces";
import {useStore} from "vuex";
import {ref} from "vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const isLoading = ref<boolean>(false)

defineProps<{
  paginatedData: [string, WorkerArray][] //дженерик страницы
}>();

const store = useStore();

const deleteWorker = async (id: string) => {
  try {
    isLoading.value = true;
    await store.dispatch("deleteWorker", id);
  } catch (e: any) {
    console.error(e.message);
  }finally {
    isLoading.value = false
  }
}
</script>

<template>
  <skeleton-loader v-if="isLoading"/>
<!--  Тут индекс 0 - всегда по дженерику строка с юидом, а индекс 1 - пропсы воркера -->
  <v-col v-else v-for="worker in paginatedData" :key="worker[0]" cols="12" sm="6" md="4">
    <v-card class="worker-card" elevation="5">
      <v-card-title>{{ worker[1].name }}</v-card-title>
      <v-card-text>
        <div>Возраст: {{ worker[1].age }}</div>
        <div>Дата устройства: {{ worker[1].hireDate }}</div>
        <div>Удаленный работник: {{ worker[1].remoteWork ? 'Да' : 'Нет' }}</div>
        <div>Зарплата: ${{ worker[1].salary }}</div>
        <div>Специализация: {{ worker[1].technology }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="deleteWorker(worker[0])">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>