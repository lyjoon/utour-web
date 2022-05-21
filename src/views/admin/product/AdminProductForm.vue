<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-title title="여행컨텐츠" :site-map="['관리', '여행컨텐츠']" :show-div="true"/>
      </div>

      <div class="pa-4">
        <admin-product-form-base />
      </div>

    </v-card>

    <v-card class="mt-4" elevation="0" outlined>
      <div class="pa-4">
        <admin-product-form-image />
      </div>
    </v-card>

    <v-card class="mt-4" elevation="0" outlined>
      <div class="pa-4">
        <admin-product-form-view-component />
      </div>

    </v-card>

    <div class="ma-6 d-flex justify-center">
      <v-btn color="blue darken-2" large dark elevation="0">
        <v-icon small class="mr-1">mdi-content-save</v-icon> 저장
      </v-btn>

      <v-btn color="grey" large class="ml-4" dark elevation="0">
        <v-icon small class="mr-1">mdi-cancel</v-icon> 취소
      </v-btn>
    </div>

  </v-container>
</template>

<script>
import AdminTitle from "@/components/common/title/AdminTitle";
import AdminProductFormBase from "@/components/admin/product/AdminProductFormBase";
import AdminProductFormImage from "@/components/admin/product/AdminProductFormImage";
import AdminProductFormViewComponent from "@/components/admin/product/AdminProductFormViewComponent";
export default {
  name: "AdminNoticeForm",
  components: {AdminProductFormViewComponent, AdminProductFormImage, AdminProductFormBase, AdminTitle},
}
</script>

<style scoped>

</style>