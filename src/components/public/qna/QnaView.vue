<template>
  <div>

    <div>
      <div class="title text-h6">{{ command.title || '-' }}</div>
      <div class="mt-2 mb-2 body-2 grey--text">
        <div class="d-flex flex-fill">
          <div>작성자 : {{ command.writer || '-' }} </div>
          <div><span class="mx-auto mr-2 ml-2">|</span> 등록일 : {{ $moment(command.createAt).format('YYYY.MM.DD') || '-' }}</div>
          <div><span class="mx-auto mr-2 ml-2">|</span> 조회 : {{ command.pv || '-' }}</div>
        </div>
      </div>
      <v-divider class="grey lighten-2" />
    </div>

    <div>
      <v-sheet min-height="550px">
        <toast-viewer ref="viewer" />
      </v-sheet>
    </div>

    <div>
      <qna-reply ref="qna_reply" @updateRepliesCount="updateRepliesCount" />
    </div>

    <div class="mt-4 mb-4">

      <div class="d-flex flex-fill">
        <div class="d-flex">

          <v-btn color="deep-orange darken-1" dark elevation="0" link @click="edit" v-if="notEmptyId">
            <v-icon class="mr-1">mdi-playlist-edit</v-icon><span>수정</span>
          </v-btn>

          <v-btn color="grey2"  dark class="ml-2" elevation="0" link @click="deleteContent" v-if="notEmptyId">
            <v-icon class="mr-1">mdi-delete</v-icon><span>삭제</span>
          </v-btn>

        </div>
        <v-spacer />
        <div class="d-flex justify-end">
          <v-btn color="grey2"  dark elevation="0" link @click="back">
            <v-icon class="mr-1">mdi-format-list-bulleted</v-icon><span>글목록</span>
          </v-btn>
        </div>
      </div>
    </div>

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
        }).catch(error => {
          let response = error.response;
          if(response.status == 401 && response.data && response.data.message) {
            this.$store.commit('alert', {message : response.data.message});
          }
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
          // this.back();
          this.deleteContent();
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