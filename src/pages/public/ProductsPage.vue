<template>
  <v-container>
    <product-search />
    <product-list />
  </v-container>
</template>

<script>
import ProductSearch from "../../components/public/product/ProductSearch";
import ProductList from "../../components/public/product/ProductList";
export default {
  name: "ProductPage",
  components: {ProductList, ProductSearch}
}
</script>

<style scoped>
  ._container {
    border: 1px solid blue;
  }
</style>