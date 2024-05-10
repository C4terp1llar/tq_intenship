<script setup lang="ts">
import AppListItem from "@/components/AppListItem.vue";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {WorkerArray} from "@/interfaces";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import {chunk} from 'lodash'
import AppAddWorker from "@/components/AppAddWorker.vue";

const store = useStore();
const isLoading = ref<boolean>(false)

// тут у чанка сложная структура
// по типу [0:[ 0:['uid',{workerProps}], 1:['uid',{workerProps}...] ,1:[0:['uid',{workerProps}], 1:['uid',{workerProps}...]]]
// первые число - страница, вторая - нумерация пары пропсов воркера и его юида
// поэтому такой дженерик [string, WorkerArray][][]
const dataChunked = computed((): [string, WorkerArray][][] => chunk(Object.entries(store.getters.getStateData), itemsPerPage))

const itemsPerPage = 9;
const currentPage = ref(1);

const paginateData = (page: number) => {
  currentPage.value = page;
};

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('getData');
  } catch (e: any) {
    console.error(e.message)
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <v-container>
    <skeleton-loader v-if="isLoading"/>
    <v-row v-else>
      <app-list-item :paginatedData="dataChunked[currentPage - 1]"/>
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