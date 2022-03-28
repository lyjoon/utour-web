<template>
  <v-navigation-drawer color="grey"
                       class="lighten-4"
                       :permanent="$vuetify.breakpoint.lgAndUp"
                       :expand-on-hover="$vuetify.breakpoint.lgAndUp"
                       fixed
                       v-model="navigatorDrawer"
                       disable-resize-watcher
                       disable-route-watcher
                       >

    <v-list nav dense>

      <v-list-item link href="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>HOME</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link @click="showInquiry">
        <v-list-item-icon>
          <v-icon>mdi-file-document-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>견적문의</v-list-item-title>
      </v-list-item>
      <v-list-item link disabled>
        <v-list-item-icon>
          <v-icon disabled>mdi-airplane-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-title>여행약관</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link to="/notice/list">
        <v-list-item-icon>
          <v-icon>mdi-information-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>공지사항</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/qna/list">
        <v-list-item-icon>
          <v-icon>mdi-comment-question-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>질문과 답변</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-arrow-up-bold</v-icon>
        </v-list-item-icon>
        <v-list-item-title>위로</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-arrow-down-bold</v-icon>
        </v-list-item-icon>
        <v-list-item-title>아래로</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-dialog v-model="inquiryDialog" width="1100px" eager persistent>
      <inquiry-view @close="closeInquiry"></inquiry-view>
    </v-dialog>

  </v-navigation-drawer>
</template>

<script>
import InquiryView from "./inquiry/InquiryView";
export default {
  name: "AppNavigator",
  components: {InquiryView},
  data: ()=>({
    inquiryDialog: false,
    navigatorDrawer: false
  }),
  methods: {
    showInquiry: function (){
      this.inquiryDialog = true;
    },
    closeInquiry: function () {
      this.inquiryDialog = false;
    },
    showNavigator: function () {
      this.navigatorDrawer = !this.navigatorDrawer;
    }
  }
}
</script>

<style scoped>

</style>