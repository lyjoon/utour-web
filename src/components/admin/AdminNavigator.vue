<template>
  <v-navigation-drawer app
                       fixed
                       temporary
                       v-model="navigatorDrawer"
                       width="30vh"
                       color="grey"
                       class="lighten-3 elevation-0"
                       disable-resize-watcher>

    <v-list nav dense>

      <v-list-item link href="/admin/home">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>HOME</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-subheader class="text-truncate d-flex flex-fill">게시판</v-subheader>

      <v-list-item link href="/admin/notice/list">
        <v-list-item-icon>
          <v-icon>mdi-information-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">공지사항</v-list-item-title>
      </v-list-item>

      <v-list-item link href="/admin/qna/list">
        <v-list-item-icon>
          <v-icon>mdi-comment-question-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">질문과답변</v-list-item-title>
      </v-list-item>

      <v-list-item link href="/admin/inquiry/list">
        <v-list-item-icon>
          <v-icon>mdi-file-document-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">여행문의</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-subheader class="text-truncate d-flex flex-fill">여행</v-subheader>

      <v-list-item link href="/admin/product/list">
        <v-list-item-icon>
          <v-icon>mdi-airplane</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">상품관리</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />


      <v-subheader class="text-truncate d-flex flex-fill">설정</v-subheader>


      <v-list-item link href="/admin/user/list">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">사용자관리</v-list-item-title>
      </v-list-item>


      <v-list-item link href="/admin/config/display">
        <v-list-item-icon>
          <v-icon>mdi-view-grid</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">화면관리</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  data: () =>({
    navigatorDrawer : false
  }),
  methods: {
    showNavigator: function(){
      this.navigatorDrawer = !this.navigatorDrawer;
    }
  }
}
</script>

<style scoped>

</style>