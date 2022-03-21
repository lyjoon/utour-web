<template>
  <v-navigation-drawer color="grey"
                       class="lighten-4 hidden-lg-and-down"
                       permanent
                       expand-on-hover
                       fixed
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
          <v-icon>mdi-file-document-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>여행문의작성</v-list-item-title>
      </v-list-item>
      <v-list-item link disabled>
        <v-list-item-icon>
          <v-icon>mdi-airplane-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-title>약관</v-list-item-title>
      </v-list-item>
      <v-list-item link disabled>
        <v-list-item-icon>
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Q&A</v-list-item-title>
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

    <v-dialog v-model="model.inquiryDialog" width="1100px" eager persistent>
      <inquiry-view @close="closeInquiry"></inquiry-view>
    </v-dialog>

  </v-navigation-drawer>
</template>

<script>
import InquiryView from "./inquiry/InquiryView";
export default {
  name: "AppNavigator",
  components: {InquiryView},
  computed: {
    drawer() {
      return true;
    }
  },
  data: ()=>({
    model : {
      inquiryDialog: false
    }
  }),
  methods: {
    showInquiry: function (){
      this.model.inquiryDialog = true;
    },
    closeInquiry: function () {
      console.log('closeInquiryDialog');
      this.model.inquiryDialog = false;
    }
  }
}
</script>

<style scoped>

</style>