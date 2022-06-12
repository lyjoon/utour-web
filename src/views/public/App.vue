<template>
  <v-app id="main" :style="{backgroundColor: $vuetify.theme.themes.light.default_background}">
    <app-header @app-navigator-open="showNavigator" />
    <app-navigator ref="app_navigator"
                   @open-inquiry-dialog="openInquiryDialog"
                   @open-service-terms-dialog="openServiceTermsDialog"
    />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <app-footer />
    <inquiry-form-dialog ref="inquiry_form_dialog" />
    <service-terms-dialog ref="service_terms_dialog" />
  </v-app>
</template>

<script>

import AppHeader from "../../components/public/AppHeader";
import AppNavigator from "../../components/public/AppNavigator";
import InquiryFormDialog from "@/components/public/inquiry/InquiryFormDialog";
import AppFooter from "@/components/public/AppFooter";
import ServiceTermsDialog from "@/components/public/terms/ServiceTermsDialog";
export default {
  name: "AppPage",
  components: {ServiceTermsDialog, AppFooter, AppNavigator, AppHeader, InquiryFormDialog},
  methods:{
    showNavigator: function (){
      this.$refs.app_navigator.showNavigator();
    },
    openInquiryDialog: function(){
      this.$refs.inquiry_form_dialog.showDialog();
    },
    openServiceTermsDialog: function (){
      this.$refs.service_terms_dialog.open();
    }
  }
}
</script>

<style scoped>
</style>