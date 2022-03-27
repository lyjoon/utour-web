<template>
  <!-- 상품 -->
  <v-card class="fill-height" elevation="0">
    <v-list>
      <v-subheader>
        <sub-title title="여행관련"></sub-title>
      </v-subheader>

      <div class=" mt-2 mb-4 pr-4 pl-4"><v-divider class="mx-auto" /></div>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary">mdi-warehouse</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-1">여행 상품</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">호텔, 패키지여행, 스쿠버</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip color="secondary" small dark link to="/admin/hotel" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>

      <div class=" mt-2 mb-4 pr-4 pl-4"><v-divider class="mx-auto" /></div>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary">mdi-warehouse</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>공개관리</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">여행상품노출</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip color="secondary" small dark link to="/admin/hotel" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
import SubTitle from "../../common/SubTitle";
export default {
  components: {SubTitle}
}
</script>

<style scoped>

</style>