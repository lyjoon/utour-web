<template>
  <v-layout row>
    <v-flex class="d-flex col-12 flex-fill justify-end">
      <v-btn large elevation="0"  color="blue-grey" dark to="/products">
        <v-icon>mdi-dots-grid</v-icon>
        <span class="ml-1">목록으로</span>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "HotelToolbar"
}
</script>

<style scoped>

</style>