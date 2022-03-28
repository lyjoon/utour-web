<template>
  <v-app class="app-main">
    <app-navigator ref="app_navigator" />
    <app-header @app-navigator-open="showNavigator" />
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
  methods:{
    showNavigator: function (){
      this.$refs.app_navigator.showNavigator();
    }
  }
}
</script>

<style scoped>
  .app-main {
    background-color: white;
  }
</style>