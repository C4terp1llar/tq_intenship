<template>

    <v-btn color="primary">
      Сортировка
      <v-menu activator="parent">
        <v-list>
          <v-list-item
              v-for="(item, index) in sortOptions"
              :key="index"
              :value="index"
              @click="router.push({query: {sortBy: item.value}})"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {TypeOfSort} from "@/interfaces";

const router = useRouter();

const sortOptions: TypeOfSort[] = [
  {
    value: '',
    title: 'Нет'
  },
  {
    value: 'date',
    title: 'Дата устройства (по возрастанию)'
  },
  {
    value: 'salary',
    title: 'Зарплата (по возрастанию)'
  },
  {
    value: 'date-desc',
    title: 'Дата устройства (по убыванию)'
  },
  {
    value: 'salary-desc',
    title: 'Зарплата (по убыванию)'
  },
  {
    value: 'remote_workers',
    title: 'Удаленные работники'
  },
  {
    value: 'office_workers',
    title: 'Офисные работники'
  }
];
</script>

<style scoped>

</style>