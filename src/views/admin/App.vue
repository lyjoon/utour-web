<template>
  <v-app class="admin-app">
    <admin-header ref="admin_header" @show-admin-navigator="showNavigator" />
    <admin-navigator ref="admin_navigator" />

    <v-main class="admin-main mt-2">
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
  methods: {
    showNavigator: function (){
      this.$refs.admin_navigator.showNavigator();
    }
  }
}
</script>

<style scoped>
  .admin-main {
    background-color: #f2f1f2;
  }
</style>