<template>
  <v-container>
    <home-carousel class="pt-4"/>
    <home-products class="pt-4 pb-4" />
    <v-row class="pt-4">
      <v-col :order="inquiryOrder" :cols="breakCols">
        <home-inquiry />
      </v-col>
      <v-col order="2" :cols="breakCols">
        <home-qna />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeCarousel from "../../components/public/home/HomeCarousel";
import HomeProducts from "../../components/public/home/HomeProduct";
import HomeQna from "../../components/public/home/HomeQna";
import HomeInquiry from "@/components/public/home/HomeInquiry";


export default {
  components: {HomeInquiry, HomeQna, HomeProducts, HomeCarousel},
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