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


    <!-- 첨부파일 -->
    <div v-if="attachments && attachments.length > 0" class="mt-4 mb-6">
      <v-divider />
      <v-sheet color="grey lighten-4" class="pa-4">
        <ul>
          <li v-for="(item, index) in attachments" :key="index" >
            <div class="pt-2 pb-2 cursor-pointer" @click="downloadFile(item)">{{ item.originName }} <v-icon>mdi-download</v-icon></div>
          </li>
        </ul>
      </v-sheet>
      <v-divider />
    </div>

    <v-divider />

    <div class="mt-4 mb-6">
      <div class="d-flex flex-fill justify-end">
        <v-btn large color="blue-grey lighten-2" dark elevation="0" link :to="`/admin/notice/edit?noticeId=${command.noticeId}`">
          <v-icon class="mr-1" small>mdi-pencil</v-icon> 수정
        </v-btn>
        <v-btn large color="ml-2 deep-orange darken-2" dark elevation="0" link @click="deleteNotice">
          <v-icon class="mr-1" small>mdi-delete</v-icon> 삭제
        </v-btn>
        <v-btn class="ml-6" large outlined elevation="0" link to="/admin/notice/list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
import noticeApi from "@/api/NoticeApi";
export default {
  components: {ToastViewer},
  data: ()=>({
    command: {
      noticeId:null,
      title:null,
      content:null,
      noticeYn:null,
      writer: '관리자',
      createAt:null,
    },
    searchNoticeId:null,
    attachments: []
  }),
  mounted() {
    let noticeId = this.$route.query.noticeId || this.$route.params.noticeId;
    this.searchNoticeId = noticeId;
    this.search();
  },
  methods:{
    deleteNotice: function(){
      if(confirm('확인을 누르면 해당 게시글은 삭제됩니다.')) {
        noticeApi.delete(this.command.noticeId)
            .then(res => {
              console.info('res', res);
              this.$router.push('/admin/notice/list?page=1');
            });
      }
    },
    search : function(){
      noticeApi.get(this.searchNoticeId).then(res => {
        console.log('res', res);
        let result = res.data.result;
        let keyList = Object.keys(this.command);
        keyList.forEach(k => {
          this.command[k] = result[k];
        });
        this.attachments = result.attachments;
        this.$refs.viewer.setMarkdown(this.command.content);
      })
    },
    downloadFile: function(item){
      noticeApi.download(item.noticeId, item.attachId, item.originName);
    }
  }
}
</script>

<style scoped>

</style>