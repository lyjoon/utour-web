<template>
  <v-layout row class="_con">
    <v-flex class="col-4 pl-0">
      <v-text-field
          dense
          solo
          class="elevation-0"
          style="box-shadow: none"
          height="40px"
          hide-details
          prepend-inner-icon="mdi-earth" :autofocus="false"
          placeholder="필리핀으로"
      />
    </v-flex>
    <v-flex class="col-4"></v-flex>
    <v-flex class="col-4 pr-0">
<!--      <input style="background-color: #f0f0f0;height: 36px; border-radius: 2px;width: 400px;" type="text" />-->
      <div class="d-flex">
        <v-text-field
            dense
            solo
            height="40px"
            hide-details
            class="elevation-0"
            prepend-inner-icon="mdi-magnify"
            placeholder="검색어"
        />
        <v-btn dark elevation="0" top class="ml-2" height="40px">ok</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "ProductCondition"
}
</script>

<style scoped>
  ._con {
    /*border: 1px solid red;*/
  }
  .product_search_input_1 {
    background-color: #f0f0f0;
  }
  .v-text-field--outlined fieldset{
    border-style: none !important;
    border-bottom: 0px !important;
    border-top: red !important;
  }
</style>