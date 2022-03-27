<template>
  <v-container>
    <v-row>
      <v-col class="col-12 col-lg-6 col-xl-6">
        <admin-main-product />
      </v-col>
      <v-col class="col-12 col-lg-6 col-xl-6">
        <admin-main-board />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminMainProduct from "../../components/admin/main/AdminMainProduct";
import AdminMainBoard from "../../components/admin/main/AdminMainBoard";
export default {
  components: {AdminMainBoard, AdminMainProduct}
}
</script>

<style scoped>
</style>