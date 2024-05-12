<script setup lang="ts">
import AppListItem from "@/components/AppListItem.vue";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {WorkerArray} from "@/interfaces";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import {chunk, sortBy} from 'lodash'
import {sendAlert} from "@/helpers/alertHelper";
import {useRoute} from "vue-router";

const store = useStore();
const route = useRoute();
const isLoading = ref<boolean>(false)

const sortByQuery = computed(() => route.query.sortBy)

// тут у чанка сложная структура
// по типу [0:[ 0:['uid',{workerProps}], 1:['uid',{workerProps}...] ,1:[0:['uid',{workerProps}], 1:['uid',{workerProps}...]]]
// первые число - страница, вторая - нумерация пары пропсов воркера и его юида
// поэтому такой дженерик [string, WorkerArray][][]

const dataChunked = computed((): [string, WorkerArray][][] => {
  const originalData: [string, WorkerArray][] = Object.entries(store.getters["workersStore/getStateData"]);

  if (!sortByQuery.value) {
    return chunk(originalData, itemsPerPage) as [string, WorkerArray][][];
  }

  let sortedData: [string, WorkerArray][] = [];

  if (sortByQuery.value?.includes('date')) {
    sortedData = sortBy(originalData, entry => new Date(entry[1].hireDate)) as [string, WorkerArray][];
  } else if (sortByQuery.value?.includes('salary')) {
    sortedData = sortBy(originalData, entry => entry[1].salary) as [string, WorkerArray][];
  } else if (sortByQuery.value?.includes('remote_workers')){
    sortedData = originalData.filter(entry => entry[1].remoteWork);
  } else if(sortByQuery.value?.includes('office_workers')){
    sortedData = originalData.filter(entry => !entry[1].remoteWork);
  }

  // если в квери роута есть 'desc', тогда реверсим массив (пустым он быть не может тк ретерн на этот случай сверху)
  if(sortedData && sortByQuery.value?.includes('desc')){
    sortedData = sortedData.reverse()
  }

  return chunk(sortedData, itemsPerPage);
})

const itemsPerPage = 9;
const currentPage = ref(1);

const paginateData = (page: number) => {
  currentPage.value = page;
};

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('workersStore/getData');
  } catch (e: any) {
    console.error(e.message)
    sendAlert('Ошибка при получении данных о работниках, попробуйте позже', 'error');
  } finally {
    isLoading.value = false;
  }
})
const deleteWorker = async (workerUid: string) => {
  try {
    isLoading.value = true;
    await store.dispatch("workersStore/deleteWorker", workerUid);
    sendAlert('Работник успешно удален', 'success');
  } catch (e: any) {
    console.error(e.message);
    sendAlert('Ошибка при удалении работника, попробуйте позже', 'error');
  }finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-container>
    <skeleton-loader v-if="isLoading"/>
    <v-row v-else>
      <v-container class="d-flex justify-center" v-if="!dataChunked">
        <h3>Записей пока нет</h3>
      </v-container>
      <app-list-item @delete-worker="deleteWorker" v-else :paginatedData="dataChunked[currentPage - 1] ? dataChunked[currentPage - 1] : []"/>
      <!--
        берется чанк по индексу (в чанке верний уровень массивов - страницы), где индекс - номер актуальной страницы - 1, тк нумерация с 0
        и получается что предидущий выше дженерик ([string, WorkerArray][][]) уменешается на 1 массив и становится [string, WorkerArray][], как дальше в пропсах
       -->
    </v-row>
    <v-pagination class="pa-3" v-model="currentPage" :length="dataChunked.length" @input="paginateData"></v-pagination>
  </v-container>
</template>

<style scoped>

</style>