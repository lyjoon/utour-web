<template>
  <v-container>
    <v-card width="100%" elevation="0" class="pa-4">
      <div class="flex-fill d-flex">

        <v-spacer />
        <v-btn elevation="0" color="grey" class="darken-3" dark @click="onCreate">
          <v-icon small class="mr-1">mdi-plus</v-icon>등록</v-btn>
      </div>
    </v-card>

    <admin-product-data-table class="mt-4 mb-4" />
    <admin-product-create-dialog ref="product_create_dialog" />
  </v-container>
</template>

<script>
import AdminProductDataTable from "@/components/admin/product/AdminProductListTable";
import AdminProductCreateDialog from "@/components/admin/product/AdminProductCreateDialog";
export default {
  components: {AdminProductCreateDialog, AdminProductDataTable},
  methods: {
    onCreate: function(){
      this.$refs.product_create_dialog.showDialog();
    }
  }
}
</script>

<style scoped>

</style>