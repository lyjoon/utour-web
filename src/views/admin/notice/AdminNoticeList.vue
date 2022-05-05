<template>
  <v-container>

    <v-card width="100%" elevation="0" class="pa-4">
      <v-layout column>
        <v-flex class="d-flex flex-fill">
          <v-text-field type="text" class="ml-2" outlined dense hide-details placeholder="검색 키워드를 입력해주세요."></v-text-field>
          <v-btn elevation="0" color="grey" class="darken-3 ml-4"  @click="onCreate" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn elevation="0" color="grey" class="ml-2 darken-3"  @click="onCreate" icon>
            <v-icon>mdi-file-document-edit</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>

    <admin-notice-list-table ref="admin_notice_list_table" class="mt-4 mb-4" @edit="edit" />

    <admin-notice-form-dialog ref="admin_notice_form_dialog" />
  </v-container>
</template>

<script>
import AdminNoticeFormDialog from "@/components/admin/notice/AdminNoticeFormDialog";
import AdminNoticeListTable from "@/components/admin/notice/AdminNoticeListTable";
export default {
  name: "AdminNoticeList",
  components: {AdminNoticeListTable, AdminNoticeFormDialog},
  data:() =>({
    query:null,
    items: [],
    pagination: {
      page: 1,
      pageCount : null
    }
  }),
  methods:{
    onCreate: function(){
      this.$refs.admin_notice_form_dialog.showDialog();
    },
    edit: function(item){
      //console.log('edit ', item);
      let frmData = {
        noticeId:  item.noticeId,
        noticeYn: item.noticeYn,
        title : item.title,
        pv:item.pv,
        attachment: item.attachment,
        writer: item.writer
      };
      this.$refs.admin_notice_form_dialog.edit(frmData);
    }
  }
}
</script>

<style scoped>

</style>