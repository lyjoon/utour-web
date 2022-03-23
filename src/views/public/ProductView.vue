<template>
  <v-container>
    <product-view-toolbar />
    <product-view-image />
    <v-row dense>
      <v-col class="col-6">
        <inquiry-item />
      </v-col>
      <v-col class="col-6">
        <product-view-content />
      </v-col>
    </v-row>

    <div class="mt-4 mb-4">
      <v-divider class="mx-auto" />
    </div>

    <v-layout column>
      <v-flex>
        <product-view-facility />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InquiryItem from "../../components/public/inquiry/InquiryItem";
import ProductViewToolbar from "../../components/public/product/view/ProductViewToolbar";
import ProductViewImage from "../../components/public/product/view/ProductViewImage";
import ProductViewContent from "../../components/public/product/view/ProductViewContent";
import ProductViewFacility from "../../components/public/product/view/ProductViewFacility";
export default {
  components: {ProductViewFacility, ProductViewContent, InquiryItem, ProductViewImage, ProductViewToolbar}
}
</script>

<style scoped>

</style>