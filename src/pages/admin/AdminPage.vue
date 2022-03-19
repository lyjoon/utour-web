<template>
  <v-app class="admin-app">
    <admin-header />
    <admin-navigator v-if="delegateNavigator" />
    <v-main class="admin-main">
      <router-view />
    </v-main>
    <admin-footer />
  </v-app>
</template>

<script>

import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminNavigator from "../../components/admin/AdminNavigator";

export default {
  name: "AdminPage",
  components: {AdminNavigator, AdminFooter, AdminHeader},
  computed: {
    delegateNavigator(){
      // TODO : check token
      return false;
    }
  }
}
</script>

<style scoped>
  .admin-main {
    background-color: #f2f1f2;
  }
</style>