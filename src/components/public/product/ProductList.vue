<template>
  <v-layout row>
    <v-flex class="col-4">
      <product-list-item />
    </v-flex>

    <v-flex class="col-4">
      <v-card height="200px">
        <v-card-title>헤헷</v-card-title>
      </v-card>
    </v-flex>

    <v-flex class="col-4">
      <v-card height="200px">
        <v-card-title>존나하기싫다</v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductListItem from "./ProductListItem";
export default {
  name: "ProductList",
  components: {ProductListItem}
}
</script>

<style scoped>

</style>