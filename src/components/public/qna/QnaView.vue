<template>
  <div>
    <v-layout column>
      <!-- title -->
      <v-flex>
        <div class="d-block mt-4 mb-2">
          <div>
            <div class="subtitle-1 font-weight-light">{{command.title || '...'}}</div>
            <div class="d-flex flex-fill">
              <div class="d-flex caption grey--text">{{command.writer || '-'}} <span class="mx-auto mr-1 ml-1 caption">|</span> {{ command.createAt ? $moment(command.createAt).format("YYYY.MM.DD") : '-' }}</div>
              <v-spacer />
              <div class="d-flex caption grey--text">조회 {{ command.pv || 0 }} <span class="mx-auto mr-1 ml-1 caption">|</span> 댓글 {{ command.replyCnt || 0 }}</div>
            </div>
          </div>
        </div>
        <v-divider />
      </v-flex>

      <!-- content -->
      <v-flex>
        <!--
        <div style="min-height: 600px;" class="body-2 pa-1" v-html="command.content">
        </div>
        -->
        <div style="min-height: 500px;margin-top: 15px;margin-bottom: 30px">
          <toast-viewer ref="viewer"></toast-viewer>
        </div>
      </v-flex>

      <!-- content -->
      <v-flex class="pb-2">
        <qna-reply ref="qna_reply" @updateRepliesCount="updateRepliesCount" />
      </v-flex>

      <v-flex class="mt-4">
        <div class="d-flex flex-fill">
          <v-btn dark color="grey" class="darken-3" elevation="0" link @click="edit" v-if="notEmptyId">
            <v-icon class="mr-1" small>mdi-playlist-edit</v-icon><span>수정</span>
          </v-btn>
          <v-btn dark color="grey" class="darken-3 ml-2" elevation="0" link @click="deleteContent"  v-if="notEmptyId">
            <v-icon class="mr-1" small>mdi-delete</v-icon><span>삭제</span>
          </v-btn>

          <v-spacer />
          <v-btn dark color="grey" class="darken-1" elevation="0" link @click="back">
            <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <qna-password-dialog ref="passwordDialog" @success="passwordDialogSuccess" @cancel="passwordDialogCancel" />
  </div>

</template>

<script>
import QnaReply from "./QnaReply";
import QnaApi from "../../../api/QnaApi"
import ToastViewer from "@/components/common/ToastViewer";
import QnaPasswordDialog from "@/components/public/qna/QnaPasswordDialog";

export default {
  name: 'QnaView',
  components: {QnaPasswordDialog, ToastViewer, QnaReply},
  computed:{
    notEmptyId(){
      return (this.command.qnaId || -1) > -1;
    },
  },
  data: () => ({
    command: {
      qnaId:null,
      title:null,
      content:null,
      createAt:null,
      writer:null,
      pv:null,
      privateYn:null,
      replyCnt:null,
    },
    passwordSuccess: false,
    password:null,
  }),
  mounted() {
    let qId = this.$route.query.qnaId || this.$route.params.qnaId;
    let pwd = this.$route.params.password;
    this.search(qId, pwd);
  },
  methods:{
    search: function(qnaId, password) {
      QnaApi.get(qnaId, password).then(res => {
        let result = res.data['result'];
        if((result.access || false) && (result.exists || false)) {
          let qnaDto = result['qnaDto'];
          this.bind(qnaDto);
          if(password) {
            this.password = password;
          }
        } else {
          if(!result.access) {
            this.$refs.passwordDialog.open(qnaId, 'get');
          }
        }
      })
    },
    back: function(){
      this.$router.push('/qna/list?page=1');
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
      this.$refs['qna_reply'].init(this.command.qnaId);
    },
    edit: function(){
      if(this.passwordSuccess) {
        let _password = this.password;
        this.$router.push({name:'qna-edit-form', params:{qnaId: this.command.qnaId, password: _password}});
      } else {
        this.$refs.passwordDialog.open(this.command.qnaId, 'edit');
      }
    },
    deleteContent: function () {
      if(this.passwordSuccess) {
        // eslint-disable-next-line no-unused-vars
        QnaApi.delete(this.command.qnaId, this.password).then(res => {
          this.back();
        });
      } else {
        this.$refs.passwordDialog.open(this.command.qnaId, 'delete');
      }
    },
    updateRepliesCount: function(repliesCount){
      this.command.replyCnt = repliesCount;
    },
    passwordDialogSuccess: function(type) {
      this.passwordSuccess = this.$refs.passwordDialog.isSuccess();

      if(this.passwordSuccess) {
        this.password = this.$refs.passwordDialog.getPassword();
        if(type == 'get') {
          let qId = this.$route.query.qnaId || this.$route.params.qnaId;
          this.search(qId, this.password);
        } else if (type == 'delete') {
          this.back();
        } else if (type == 'edit'){
          let pwd = this.password;
          this.$router.push({name:'qna-edit-form', params:{qnaId: this.command.qnaId, password: pwd}});
        }
      }
    },
    passwordDialogCancel: function(type){
      if(type == 'get') {
        this.back();
      }
    }
  }
}
</script>

<style scoped>

</style>