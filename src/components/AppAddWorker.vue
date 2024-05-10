<template>
  <v-container>
    <v-btn @click="showAlert = true">Добавить</v-btn>

    <skeleton-loader v-if="isLoading" />

    <v-dialog v-else v-model="showAlert" max-width="500">
      <v-card>
        <v-card-title>Добавить работника</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Имя" :rules="nameRules"></v-text-field>
          <v-text-field v-model="age" type="number" label="Возраст" :rules="ageRules"></v-text-field>
          <v-text-field v-model="salary" type="number" label="Зарплата" :rules="salaryRules"></v-text-field>
          <v-text-field type="date" v-model="date" label="Дата устройства" :rules="dateRules"></v-text-field>
          <v-select v-model="technology" label="Специализация" :items="['Python', 'Java', 'JavaScript', 'Ruby', 'Php', 'Go']" :rules="technologyRules"></v-select>
          <v-checkbox v-model="remote" label="Удаленная работа"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="addWorker" :disabled="!isFormValid">Добавить</v-btn>
          <v-btn color="error" @click="showAlert = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SkeletonLoader from "../components/SkeletonLoader.vue";


const isLoading = ref<boolean>(false);

const showAlert = ref(false);
const date = ref<string>("");
const remote = ref<boolean>(false);
const technology = ref<string>("");
const salary = ref<number>(0);
const age = ref<number>(0);
const name = ref<string>("");

const store = useStore();

const addWorker = async () => {
  try {
    isLoading.value = true;

    await store.dispatch("addWorker", {
      name: name.value,
      age: age.value,
      hireDate: date.value,
      remoteWork: remote.value,
      salary: salary.value,
      technology: technology.value
    });
  } catch (e: any) {
    console.error(e.message);
  } finally {
    isLoading.value = false
  }
};

const nameRules = [
  (v: string) => !!v || "Имя является обязательным",
];
const ageRules = [
  (v: number) => !!v || "Возраст является обязательным",
];
const salaryRules = [
  (v: number) => !!v || "Зарплата является обязательной",
];
const dateRules = [
  (v: string) => !!v || "Дата устройства является обязательной",
];
const technologyRules = [
  (v: string) => !!v || "Специализация является обязательной",
];

const isFormValid = computed(() => {
  return name.value && age.value && salary.value && date.value && technology.value;
});
</script>

<style scoped>
/* Ваш стиль */
</style>
