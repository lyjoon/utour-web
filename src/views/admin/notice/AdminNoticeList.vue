<template>
  <v-container>

    <v-card width="100%" elevation="0">

      <div class="pa-4">
        <page-title title="공지사항 관리" :site-map="['게시판', '공지사항']" :show-div="false"/>
      </div>
      <admin-notice-list-table ref="admin_notice_list_table" class="mt-4 mb-4" @edit="edit" @create="onCreate" />
    </v-card>

    <admin-notice-form-dialog ref="admin_notice_form_dialog" @complete="search" />
  </v-container>
</template>

<script>
import AdminNoticeFormDialog from "@/components/admin/notice/AdminNoticeFormDialog";
import AdminNoticeListTable from "@/components/admin/notice/AdminNoticeListTable";
import PageTitle from "@/components/common/PageTitle";
export default {
  name: "AdminNoticeList",
  components: {PageTitle, AdminNoticeListTable, AdminNoticeFormDialog},
  data:() =>({
    items: [],
    pagination: {
      page: 1,
      pageCount : null
    },
    query:null,
    queryTypeItems: [
      {value:'ALL', text:'제목+내용'},
      {value:'TITLE', text:'제목'},
      {value:'WRITER', text:'작성자'},
      {value:'CONTENT', text:'내용'},
    ],
    queryType: {value:'ALL', text:'제목+내용'},
  }),
  methods:{
    onCreate: function(){
      this.$refs.admin_notice_form_dialog.showDialog();
    },
    search: function (){
      this.$refs.admin_notice_list_table.searchQuery(this.query);
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