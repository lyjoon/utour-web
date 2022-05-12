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

      <v-subheader class="text-truncate d-flex flex-fill">여행</v-subheader>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-island</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">몰디브</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-smoking</v-icon>
        </v-list-item-icon>
        <v-list-item-title>칸쿤</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-kitesurfing</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">하와이</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-eiffel-tower</v-icon>
        </v-list-item-icon>
        <v-list-item-title>유럽</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-noodles</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">베트남</v-list-item-title>
      </v-list-item>


      <v-list-item link>
        <v-list-item-icon>
         <v-icon>mdi-human-female-dance</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">태국</v-list-item-title>
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
        <v-list-item-title>
          질문과 답변
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link disabled>
        <v-list-item-icon>
          <v-icon disabled>mdi-thumb-up</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          회사소개
        </v-list-item-title>
      </v-list-item>

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


    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppNavigator",
  data: ()=>({
    navigatorDrawer: false
  }),
  methods: {
    showInquiry: function (){
      this.$emit('open-inquiry-dialog');
    },
    showNavigator: function () {
      this.navigatorDrawer = !this.navigatorDrawer;
    }
  }
}
</script>

<style scoped>

</style>