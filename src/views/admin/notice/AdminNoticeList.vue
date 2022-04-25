<template>
  <v-container>

    <v-card width="100%" elevation="0" class="pa-4">
      <v-layout row>
        <v-flex class="col-4 col-lg-3 col-xl-3">
          <v-select placeholder="검색항목"
                    v-model="queryType"
                    :items="queryTypeItems"
                    item-value="val"
                    item-text="txt"
                    class="shrink"
                    hide-details
                    dense
                    outlined></v-select>
        </v-flex>
        <v-flex class="col-8 col-lg-7 col-xl-7">
          <v-text-field type="text" class="ml-2" outlined dense hide-details placeholder="키워드를 입력해주세요."></v-text-field>
        </v-flex>
        <v-flex class="col-12 col-lg-2 col-xl-2 text-right">
          <v-btn elevation="0" color="grey" class="darken-3" dark @click="onCreate">
            <v-icon @click="onCreate" small class="mr-1">mdi-plus</v-icon>등록</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <admin-notice-form-dialog ref="admin_notice_form_dialog" />
  </v-container>
</template>

<script>
import AdminNoticeFormDialog from "@/components/admin/notice/AdminNoticeFormDialog";
export default {
  name: "AdminNoticeList",
  components: {AdminNoticeFormDialog},
  data:() =>({
    queryTypeItems: [
      {val:'ALL', txt:'제목+내용'},
      {val:'TITLE', txt:'제목'},
      {val:'WRITER', txt:'작성자'},
      {val:'CONTENT', txt:'내용'},
    ],
    queryType: {val:'ALL', txt:'제목+내용'},
    query:null,
    items: [],
    pagination: {
      page: 1,
      pageCount : null
    }
  }),
  methods:{
    onCreate: function(){
      this.$refs.admin_notice_form_dialog.showDialog()
    }
  }
}
</script>

<style scoped>

</style>