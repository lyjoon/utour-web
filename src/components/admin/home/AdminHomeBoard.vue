<template>
  <!-- 상품 -->
  <v-card elevation="0" outlined>
    <v-list>
      <v-subheader>
        <v-icon :color="color" class="mr-4">mdi-playlist-check</v-icon>
        <strong class="title font-weight-regular">게시글</strong>
      </v-subheader>

      <v-divider class="mt-2 ml-4 mr-4 indigo lighten-1" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color" >mdi-earth</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>공지사항</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">대국민 공지사항</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip :color="color" small dark link to="/admin/notice/list" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>


      <v-divider class="mt-2 ml-4 mr-4" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color" >mdi-help</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>질문과 답변</v-list-item-title>
          <v-list-item-subtitle class="caption mt-1">공개여부 상관없이~ 마음대로~ 볼 수 있는 Q&A</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip :color="color" small dark link to="/admin/qna/list">관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>


      <v-divider class="mt-2 ml-4 mr-4" />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color" >mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>견적문의</v-list-item-title>
          <v-list-item-subtitle  class="caption mt-1">얼마에요?</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip :color="color" small dark link to="/admin/inquiry/list">관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
export default {
  computed:{
    color(){
      return "blue-grey";
    }
  }
}
</script>

<style scoped>

</style>