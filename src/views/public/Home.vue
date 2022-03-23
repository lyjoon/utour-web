<template>
  <v-container>
    <home-carousel />
    <home-products />
    <v-row dense>
      <v-col :order="inquiryOrder" :cols="breakCols">
        <inquiry-item />
      </v-col>
      <v-col order="2" :cols="breakCols">
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
  components: {HomeQnA, InquiryItem, HomeProducts, HomeCarousel},
  computed: {
    breakCols(){
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
          return 6;
        default:
          return 12;
      }
    },
    inquiryOrder(){
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
          return 1;
        default:
          return 9;
      }
    }
  }
}
</script>

<style scoped>

</style>