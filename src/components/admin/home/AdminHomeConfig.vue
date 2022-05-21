<template>
  <!-- 상품 -->
  <v-card elevation="0" outlined>
    <v-list>
      <v-subheader>
        <v-icon :color="color" class="mr-4">mdi-cog</v-icon>
        <strong class="title font-weight-regular">설정</strong>
      </v-subheader>

      <v-divider :class="`mt-2 ml-4 mr-4 ${color}`" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">mdi-account-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-1">사용자 관리</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">나의 직원</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip :color="color" small dark link to="/admin/config/user" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>



      <!--
      <v-divider class="mt-2 ml-4 mr-4" />
      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">mdi-earth-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-1">지역관리</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">여행상품의 국가 및 도시지역정보</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip disabled :color="color" small dark link to="/admin/code/location" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
      -->

      <v-divider class="mt-2 ml-4 mr-4" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">mdi-view-grid</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>메인화면설정</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">캐로셀, 커머스 유형 상품노출..</v-list-item-subtitle>
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
      return "indigo lighten-1";
    }
  }
}
</script>

<style scoped>

</style>