<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mdAndDown"
            width="1200px"
            persistent
            v-model="dialog">
    <v-toolbar>
      <div class="d-flex flex-fill align-center">
        <v-toolbar-title>공지사항 - 등록</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" color="#999999" outlined tile class="rounded toolbar-btn-outlined" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card tile>
      <v-card-text class="pt-4">
        제목 & 게시글
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "AdminNoticeFormDialog",
  data: ()=>({
    dialog: false,
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