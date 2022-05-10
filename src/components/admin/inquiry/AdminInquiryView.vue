<template>
  <div class="pa-4">
    <div class="">
      <div class="title text-h6">{{ command.title || '-' }}</div>
      <div class="mt-2 mb-6 body-2 grey--text">
        <div class="d-flex flex-fill">
          <div>작성자 : {{ command.writer || '-' }} </div>
          <div><span class="mx-auto mr-2 ml-2">|</span> 등록일 : {{ $moment(command.createAt).format('YYYY.MM.DD') || '-' }}</div>
          <div><span class="mx-auto mr-2 ml-2">|</span> 조회 : {{ command.pv || '-' }}</div>
        </div>
      </div>
    </div>

    <v-divider />

    <div>
      <v-sheet min-height="550px">
        <toast-viewer ref="viewer" />
      </v-sheet>
    </div>

    <v-divider />

    <div class="mt-4 mb-6">
      <div class="d-flex flex-fill justify-end">
        <v-btn class="ml-6" large outlined elevation="0" link to="/admin/inquiry/list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
import inquiryApi from "@/api/InquiryApi";
export default {
  components: {ToastViewer},
  data: ()=>({
    command: {
      inquiryId:null,
      title:null,
      content:null,
      noticeYn:null,
      writer: null,
      contact: null,
      email: null,
      status: null,
      createAt:null,
    },
    searchInquiryId:null,
    attachments: []
  }),
  mounted() {
    let inquiryId = this.$route.query.inquiryId || this.$route.params.inquiryId;
    this.searchInquiryId = inquiryId;
    this.search();
  },
  methods:{
    search : function(){
      inquiryApi.get(this.searchInquiryId).then(res => {
        let result = res.data.result;
        let keyList = Object.keys(this.command);
        keyList.forEach(k => {
          this.command[k] = result[k];
        });
        this.attachments = result.attachments;
        this.$refs.viewer.setMarkdown(this.command.content);
      })
    }
  }
}
</script>

<style scoped>

</style>