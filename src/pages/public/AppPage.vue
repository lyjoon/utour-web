<template>
  <v-app class="app-main">
    <app-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import AppHeader from "../../components/public/AppHeader";
export default {
  name: "AppPage",
  components: {AppHeader},
}
</script>

<style scoped>
  .app-main {
    background-color: #f2f1f2;
  }
</style>