<script setup lang="ts">
import {WorkerArray} from "@/interfaces";
import {ref} from "vue";

const showDialog = ref<boolean>(false)
const workerUidForDelete = ref<string>('')

defineProps<{
  paginatedData: [string, WorkerArray][] //дженерик страницы
  //ts ругается, что поступает андефайнд
  // видимо потому что пропc с датой передается до того как промис вышел из пендинга
  // --> добавил перед отправкой пропса проверку на существование dataChunked[currentPage - 1]
}>();

defineEmits(['delete-worker'])
</script>

<template>
  <v-dialog v-model="showDialog" max-width="400">
    <v-card>
      <v-card-title>Подтвердите удаление</v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить работника?
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="$emit('delete-worker', workerUidForDelete)">Удалить</v-btn>
        <v-btn @click="showDialog = false">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

<!--  Тут индекс 0 - всегда по дженерику строка с юидом, а индекс 1 - пропсы воркера -->
  <v-col v-for="worker in paginatedData" :key="worker[0]" cols="12" sm="6" md="4">
    <v-card class="worker-card" elevation="5">
      <v-card-title>{{ worker[1].name }}</v-card-title>
      <v-card-text>
        <div>Возраст: {{ worker[1].age }}</div>
        <div>Дата устройства: {{ worker[1].hireDate }}</div>
        <div>Удаленный работник: {{ worker[1].remoteWork ? 'Да' : 'Нет' }}</div>
        <div>Зарплата: {{ worker[1].salary }} ₽</div>
        <div>Специализация: {{ worker[1].technology }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="showDialog = true; workerUidForDelete = worker[0]">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>