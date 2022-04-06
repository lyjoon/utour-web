<template>
  <v-container>
    <page-title title="상품관리" />
    <admin-product-data-table class="mt-4 mb-4" />
    <div class="d-flex flex-fill justify-end">
      <v-btn elevation="0" color="grey" class="darken-3" dark>
        <v-icon small class="mr-1">mdi-plus</v-icon>등록</v-btn>
    </div>
  </v-container>
</template>

<script>
import PageTitle from "@/components/common/PageTitle";
import AdminProductDataTable from "@/components/admin/product/AdminProductDataTable";
export default {
  name: "AdminProductList",
  components: {AdminProductDataTable, PageTitle}
}
</script>

<style scoped>

</style>