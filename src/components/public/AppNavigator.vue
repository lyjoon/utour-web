<template>
  <v-navigation-drawer color="grey"
                       class="lighten-4"
                       app
                       fixed
                       permanent
                       mini-variant
                       mini-variant-width="56px"
                       disable-resize-watcher>

    <v-list nav dense>

      <v-list-item link>
        <v-icon>mdi-menu</v-icon>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link>
        <v-list-item-icon @click="showInquiry">
          <v-icon>mdi-file-document-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Starred</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-airplane-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Files</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Shared with me</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-arrow-up-bold</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Starred</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-arrow-down-bold</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Files</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-dialog v-model="model.inquiryDialog" width="1100px" eager persistent>
      <inquiry-form @close="closeInquiry"></inquiry-form>
    </v-dialog>

  </v-navigation-drawer>
</template>

<script>
import InquiryForm from "./inquiry/InquiryForm";
export default {
  name: "AppNavigator",
  components: {InquiryForm},
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