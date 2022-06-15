<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" :class="`${$vuetify.breakpoint.smAndDown ? 'pl-0 pr-0' :''}`">
    <home-carousel />
    <home-products class="mt-4" />
    <v-row class="mt-4 mb-4" no-gutters dense>
      <v-col :class="`d-flex justify-start ${$vuetify.breakpoint.lgAndUp ? 'pr-3' : 'mt-4'}`" :order="inquiryOrder" :cols="breakCols">
        <home-inquiry />
      </v-col>
      <v-col :class="`d-flex justify-end flex-fill ${$vuetify.breakpoint.lgAndUp ? 'pl-3' :''}}`" order="2" :cols="breakCols">
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