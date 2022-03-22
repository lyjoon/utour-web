<template>
  <v-container>
    <hotel-toolbar />
    <hotel-image />
    <v-row dense>
      <v-col class="col-6">
        <inquiry-item />
      </v-col>
      <v-col class="col-6">
        <hotel-remark />
      </v-col>
    </v-row>

    <div class="mt-4 mb-4">
      <v-divider class="mx-auto" />
    </div>

    <v-layout column>
      <v-flex>
        <hotel-facility />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HotelToolbar from "../../components/public/hotel/HotelToolbar";
import HotelImage from "../../components/public/hotel/HotelImage";
import InquiryItem from "../../components/public/inquiry/InquiryItem";
import HotelRemark from "../../components/public/hotel/HotelRemark";
import HotelFacility from "../../components/public/hotel/HotelFacility";
export default {
  name: "HotelPage",
  components: {HotelFacility, HotelRemark, InquiryItem, HotelImage, HotelToolbar}
}
</script>

<style scoped>

</style>