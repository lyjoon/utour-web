<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mdAndDown"
            width="1200px"
            persistent
            v-model="dialog">
    <v-toolbar>
      <div class="d-flex flex-fill align-center">
        <v-toolbar-title>상품등록 - 기본개요</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" color="#999999" outlined tile class="rounded toolbar-btn-outlined" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card tile>
      <v-card-text class="pt-4">
        <admin-product-basic />
      </v-card-text>
      <v-card-actions>
        <div class="pa-2 d-flex flex-fill justify-end">
          <v-btn dark elevation="0">저장</v-btn>
          <v-btn color="grey" elevation="0" dark class="ml-2" @click="close">취소</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AdminProductBasic from "@/components/admin/product/AdminProductBasic";
export default {
  components: {AdminProductBasic},
  data:()=>({
    dialog: false
  }),
  methods:{
    showDialog: function () {
      this.dialog = !this.dialog;
    },
    close: function() {
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>