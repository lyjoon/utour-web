<template>
  <v-container>
    <v-row>
      <v-col class="col-12 col-lg-6 col-xl-6">
        <admin-home-product />
        <br />
        <admin-home-config />
      </v-col>
      <v-col class="col-12 col-lg-6 col-xl-6">
        <admin-home-board />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminHomeProduct from "../../components/admin/home/AdminHomeProduct";
import AdminHomeBoard from "../../components/admin/home/AdminHomeBoard";
import AdminHomeConfig from "@/components/admin/home/AdminHomeConfig";
export default {
  components: {AdminHomeConfig, AdminHomeBoard, AdminHomeProduct}
}
</script>

<style scoped>
</style>