<template>
  <v-app class="admin-app">
    <admin-header />
    <v-main class="admin-main">
      <router-view />
    </v-main>
    <admin-footer />
  </v-app>
</template>

<script>

import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";

export default {
  name: "AdminPage",
  components: {AdminFooter, AdminHeader}
}
</script>

<style scoped>
  .admin-main {
    background-color: #f2f1f2;
  }
</style>