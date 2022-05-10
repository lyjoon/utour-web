<template>
  <!-- 상품 -->
  <v-card elevation="0">
    <v-list>
      <v-subheader>
        <v-icon :color="color" class="mr-4">mdi-cog</v-icon>
        <strong class="title font-weight-regular">설정</strong>
      </v-subheader>

      <div class=" mt-2 mb-4 pr-4 pl-4"><v-divider class="mx-auto" /></div>

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">mdi-account-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-1">사용자 관리</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">나의 직원</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip disabled :color="color" small dark link to="/admin/hotel" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>

    </v-list>
  </v-card>

</template>

<script>
export default {
  computed:{
    color(){
      return "indigo";
    }
  }
}
</script>

<style scoped>

</style>