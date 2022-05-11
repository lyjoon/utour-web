<template>
  <!-- 상품 -->
  <v-card elevation="0">
    <v-list>
      <v-subheader>
        <v-icon :color="color" class="mr-4">mdi-gift</v-icon>
        <strong class="title font-weight-regular">여행상품</strong>
      </v-subheader>

      <v-divider :class="`mt-2 ml-4 mr-4 lighten-2 ${color}`" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">mdi-beach</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-1">여행상품</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">호텔, 패키지여행(준비중)</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip :color="color" small dark link to="/admin/product" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>

      <v-divider class="mt-2 ml-4 mr-4" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">mdi-view-grid</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>메인화면 노출관리</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">노출..</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip :color="color" small dark link disabled >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
export default {
  computed:{
    color(){
      return "deep-orange";
    }
  }
}
</script>

<style scoped>

</style>