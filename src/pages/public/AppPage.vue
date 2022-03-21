<template>
  <v-app class="app-main">
    <app-navigator />
    <app-header />
    <v-main class="mt-2">
      <router-view />
    </v-main>
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