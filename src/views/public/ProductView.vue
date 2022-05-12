<template>
  <v-container>
    <v-row dense>
      <v-col class="col-12" :order="toolbarOrder">
        <product-view-toolbar />
      </v-col>
      <v-col class="col-12 mb-8" :order="imageOrder">
        <product-view-image/>
      </v-col>
      <v-col class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" :order="inquiryOrder">
        <inquiry-form  />
      </v-col>
      <v-col class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" :order="contentOrder">
        <product-view-content />
      </v-col>
      <v-col class="col-12 mt-8" :order="facilityOrder">
        <product-view-facility />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InquiryForm from "../../components/public/inquiry/InquiryForm";
import ProductViewToolbar from "../../components/public/product/view/ProductViewToolbar";
import ProductViewImage from "../../components/public/product/view/ProductViewImage";
import ProductViewContent from "../../components/public/product/view/ProductViewContent";
import ProductViewFacility from "../../components/public/product/view/ProductViewFacility";
export default {
  components: {ProductViewFacility, ProductViewContent, InquiryForm, ProductViewImage, ProductViewToolbar},
  computed:{
    toolbarOrder() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return 2;
        default:
          return 1;
      }
    },
    imageOrder() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return 1;
        default:
          return 2;
      }
    },
    inquiryOrder() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return 9;
        default:
          return 3;
      }
    },
    contentOrder() {
      return 4;
    },
    facilityOrder() {
      return 5;
    }
  }
}
</script>

<style scoped>

</style>