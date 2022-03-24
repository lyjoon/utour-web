<template>
  <v-container>
    <home-carousel />
    <home-products class="mt-2" />
    <v-row dense>
      <v-col :order="inquiryOrder" :cols="breakCols">
        <inquiry-item />
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
import InquiryItem from "../../components/public/inquiry/InquiryItem";

export default {
  components: {HomeQna, InquiryItem, HomeProducts, HomeCarousel},
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