<template>
  <v-container>
    <home-carousel />
    <home-products />
    <v-row dense>
      <v-col order-sm="2" order-md="2" order-lg="1" order-xl="1" class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
        <inquiry-item />
      </v-col>
      <v-col order-sm="1" order-md="1" order-lg="2" order-xl="2" class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
        <home-qn-a />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeCarousel from "../../components/public/home/HomeCarousel";
import HomeProducts from "../../components/public/home/HomeProduct";
import HomeQnA from "../../components/public/home/HomeQnA";
import InquiryItem from "../../components/public/inquiry/InquiryItem";

export default {
  components: {HomeQnA, InquiryItem, HomeProducts, HomeCarousel}
}
</script>

<style scoped>

</style>