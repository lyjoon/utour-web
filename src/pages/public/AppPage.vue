<template>
  <v-app class="app-main">
    <app-header />
    <app-navigator />
    <v-content class="mt-2">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

import AppHeader from "../../components/public/AppHeader";
import AppNavigator from "../../components/public/AppNavigator";
export default {
  name: "AppPage",
  components: {AppNavigator, AppHeader},
}
</script>

<style scoped>
  .app-main {
    background-color: white;
  }
</style>