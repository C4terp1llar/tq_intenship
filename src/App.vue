<template>
  <v-app>
    <app-toolbar/>
    <app-list/>
    <notification />
  </v-app>
</template>

<script setup lang="ts">
import AppList from "@/components/AppList.vue";
import AppToolbar from "@/components/AppToolbar.vue";
import Notification from "@/components/Notification.vue";
</script>
