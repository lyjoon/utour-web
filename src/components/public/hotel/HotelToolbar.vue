<template>
  <v-layout row>
    <v-flex class="d-flex col-12 flex-fill justify-end">
      <div>
        <div class="title font-montserrat-300">로빈슨 클럽</div>
        <div class="subtitle-2 grey--text">카오락 어디냐</div>
      </div>
      <v-toolbar-title>미노아</v-toolbar-title>

      <v-spacer />
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