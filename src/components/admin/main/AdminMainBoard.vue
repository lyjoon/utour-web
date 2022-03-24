<template>
  <!-- 상품 -->
  <v-card class="fill-height" elevation="0">
    <v-list>
      <v-subheader>
        <scope-title title="게시글"></scope-title>
      </v-subheader>

      <div class=" mt-2 mb-4 pr-4 pl-4"><v-divider class="mx-auto" /></div>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary">mdi-warehouse</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>질문과 답변</v-list-item-title>
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
          <v-list-item-title>견적문의</v-list-item-title>
          <v-list-item-subtitle>ㅁㄴㅇ</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip color="secondary" small dark link to="/admin/hotel" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
import ScopeTitle from "../../common/ScopeTitle";
export default {
  components: {ScopeTitle}
}
</script>

<style scoped>

</style>