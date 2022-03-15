<template>
  <v-container>
    <hotel-toolbar />
    <hotel-image />
    <v-row dense>
      <v-col class="col-6">
        <inquiry-item />
      </v-col>
      <v-col class="col-6">
        d
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HotelToolbar from "../../components/public/hotel/HotelToolbar";
import HotelImage from "../../components/public/hotel/HotelImage";
import InquiryItem from "../../components/public/inquiry/InquiryItem";
export default {
  name: "HotelPage",
  components: {InquiryItem, HotelImage, HotelToolbar}
}
</script>

<style scoped>

</style>