<template>
  <v-app class="app-main">
    <app-header @app-navigator-open="showNavigator" />
<!--    <app-navigator ref="app_navigator" @open-inquiry-dialog="openInquiryDialog"/>-->
    <v-main class="mt-2">
      <router-view />
    </v-main>
    <inquiry-form-dialog ref="inquiry_form_dialog" />
  </v-app>
</template>

<script>

import AppHeader from "../../components/public/AppHeader";
import AppNavigator from "../../components/public/AppNavigator";
import InquiryFormDialog from "@/components/public/inquiry/InquiryFormDialog";
export default {
  name: "AppPage",
  components: {AppNavigator, AppHeader, InquiryFormDialog},
  methods:{
    showNavigator: function (){
      this.$refs.app_navigator.showNavigator();
    },
    openInquiryDialog: function(){
      this.$refs.inquiry_form_dialog.showDialog();
    }
  }
}
</script>

<style scoped>
  .app-main {
    background-color: white;
  }
</style>