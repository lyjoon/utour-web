<template>
  <v-container>
    <home-carousel />
    <home-products />
  </v-container>
</template>

<script>
import HomeCarousel from "../../components/public/home/HomeCarousel";
import HomeProducts from "../../components/public/home/HomeProducts";
export default {
  components: {HomeProducts, HomeCarousel}
}
</script>

<style scoped>

</style>