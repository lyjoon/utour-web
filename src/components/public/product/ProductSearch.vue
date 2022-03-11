<template>
  <v-layout row class="product_search">
    <v-flex class="col-4">
      <v-text-field
          solo
          hide-details
          class="elevation-0"
          readonly
          placeholder="필리핀으로"
      >
        <template v-slot:prepend-inner>
          <v-icon left>mdi-earth</v-icon>
        </template>
      </v-text-field>
    </v-flex>
    <v-flex class="col-4"></v-flex>
    <v-flex class="col-4">
      <div class="d-flex">
        <v-text-field
            solo
            hide-details
            class="elevation-0"
            placeholder="키워드 검색">
          <template v-slot:prepend-inner>
            <v-icon left>
              mdi-magnify
            </v-icon>
          </template>
          <template v-slot:append-outer>
            <v-btn height="48px" dark color="red darken-2" class="v_btn_search" elevation="0" >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>

        </v-text-field>
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
</style>