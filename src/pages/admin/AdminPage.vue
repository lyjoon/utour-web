<template>
  <v-app class="admin-app">
    <admin-header />
    <v-main style="background-color: #f7f7f7">
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

</style>