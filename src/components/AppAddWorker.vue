<template>

    <v-btn color="primary" @click="showAlert = true">Добавить работника</v-btn>

    <v-dialog v-model="showAlert" max-width="400">
      <v-card>
        <v-card-title>Добавить работника</v-card-title>
        <circular-loader v-if="isLoading"/>
        <v-card-text v-else>
          <v-text-field v-model="name" label="Имя" :rules="nameRules"></v-text-field>
          <v-text-field min="18" v-model="age" type="number" label="Возраст" :rules="ageRules"></v-text-field>
          <v-text-field step="1000" min="0" v-model="salary" type="number" label="Зарплата" :rules="salaryRules" prefix="₽"></v-text-field>
          <v-text-field type="date" v-model="date" label="Дата устройства" :rules="dateRules"></v-text-field>
          <v-select v-model="technology" label="Специализация" :items="['Python', 'Java', 'JavaScript', 'Ruby', 'Php', 'Go']" :rules="technologyRules"></v-select>
          <v-checkbox v-model="remote" label="Удаленная работа"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="addWorker" :disabled="!isFormValid">Добавить</v-btn>
          <v-btn color="error" @click="showAlert = false" :disabled="isLoading">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import {sendAlert} from "@/helpers/alertHelper";
import CircularLoader from "@/components/CircularLoader.vue";

const isLoading = ref<boolean>(false);

const showAlert = ref(false);
const date = ref<string>("");
const remote = ref<boolean>(false);
const technology = ref<string>("");
const salary = ref<number>(0);
const age = ref<number>(18);
const name = ref<string>("");

const store = useStore();

const clearFields = () =>{
  showAlert.value = false
  date.value = ''
  remote.value = false
  technology.value = ''
  salary.value = 0
  age.value = 0
  name.value = ''
}
const addWorker = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("workersStore/addWorker", {
      name: name.value,
      age: age.value,
      hireDate: date.value,
      remoteWork: remote.value,
      salary: salary.value,
      technology: technology.value
    });
    clearFields();
    sendAlert('Работник успешно добавлен', 'success');
  } catch (e: any) {
    console.error(e.message);
    sendAlert('Ошибка при добавлении работника, попробуйте позже', 'error');
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
  (v: string) => new Date(v) <= new Date() || "Дата устройства не может быть позже сегодняшней",
];
const technologyRules = [
  (v: string) => !!v || "Специализация является обязательной",
];

const isFormValid = computed(() => {
  const userInputDate: Date = new Date(date.value);
  return name.value && age.value && salary.value && date.value && userInputDate < new Date() && technology.value;
});
</script>

<style scoped>
/* Ваш стиль */
</style>
