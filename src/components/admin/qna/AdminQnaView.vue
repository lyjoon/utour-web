<template>
  <div class="pa-4">
    <div>
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


    <div>
      <admin-qna-view-reply-list ref="qna_reply_list" />
      <admin-qna-view-reply-edit ref="qna_reply_edit" @updateQnaReply="updateQnaReply" />
    </div>


    <div class="mt-4 mb-6">
      <div class="d-flex flex-fill justify-end">
        <v-btn large color="deep-orange darken-2" dark elevation="0" @click="deleteItem">
          <v-icon class="mr-1" small>mdi-delete</v-icon> 삭제
        </v-btn>
        <v-btn class="ml-2" large outlined elevation="0" link to="/admin/qna/list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
import QnaApi from "@/api/QnaApi";
import AdminQnaViewReplyList from "@/components/admin/qna/AdminQnaViewReplyList";
import AdminQnaViewReplyEdit from "@/components/admin/qna/AdminQnaViewReplyEdit";

export default {
  components: {AdminQnaViewReplyEdit, AdminQnaViewReplyList, ToastViewer},
  data: ()=>({
    command: {
      qnaId:null,
      title:null,
      content:null,
      replyCnt: 0,
      writer: null,
      pv:0,
      privateYn:null,
      createAt:null,
    },
    searchQnaId:null,
  }),
  mounted() {
    let qnaId = this.$route.query.qnaId || this.$route.params.qnaId;
    this.searchQnaId = qnaId;
    this.search();
  },
  methods:{
    search : function(){
      QnaApi.get(this.searchQnaId).then(res => {
        let result = res.data['result'];
        if((result.access || false) && (result.exists || false)) {
          let qnaDto = result['qnaDto'];
          this.bind(qnaDto);
        }
      });
    },

    bind: function(dto) {
      this.command.content = dto['content'];//.split('\n').join('<br>').split(' ').join('&nbsp;');
      this.command.title = dto['title'];
      this.command.createAt = dto['createAt'];
      this.command.writer = dto['writer'];
      this.command.pv = dto['pv'];
      this.command.privateYn = dto['privateYn'];
      this.command.replyCnt = dto['replyCnt'];
      this.command.qnaId = dto['qnaId'];
      this.$refs.viewer.setMarkdown(this.command.content);
      this.$refs['qna_reply_list'].init(this.command.qnaId);
      this.$refs['qna_reply_edit'].init(this.command.qnaId);
    },
    deleteItem: function() {
      if(confirm('확인을 누르면 해당 게시글은 삭제됩니다.')) {
        // eslint-disable-next-line no-unused-vars
        QnaApi.delete(this.command.qnaId).then(res => {
          //this.back();
          this.$router.push("/admin/qna/list?page=1");
        });
      }
    },
    updateQnaReply: function(){
      this.$refs['qna_reply_list'].search();
    }
  }
}
</script>

<style scoped>

</style>