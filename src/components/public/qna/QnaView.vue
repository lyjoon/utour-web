<template>
  <div>
    <v-row dense>
      <!-- title -->
      <v-col class="col-12">
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
      </v-col>

      <!-- content -->
      <v-col class="col-12">
        <!--
        <div style="min-height: 600px;" class="body-2 pa-1" v-html="command.content">
        </div>
        -->
        <div style="min-height: 500px;margin-top: 15px;margin-bottom: 30px">
          <toast-viewer ref="viewer"></toast-viewer>
        </div>
      </v-col>
      <!-- content -->
      <v-col class="col-12">
        <qna-reply ref="qna_reply" @updateRepliesCount="updateRepliesCount" />
      </v-col>
      <v-col class="col-12">
        <div class="d-flex flex-fill">

          <v-btn dark color="indigo" class="lighten-1" elevation="0" link @click="edit" v-if="notEmptyId">
            <v-icon class="mr-1" small>mdi-playlist-edit</v-icon><span>수정</span>
          </v-btn>
          <v-btn dark color="orange" class="darken-2 ml-2" elevation="0" link @click="deleteQna"  v-if="notEmptyId">
            <v-icon class="mr-1" small>mdi-delete</v-icon><span>삭제</span>
          </v-btn>

          <v-spacer />
          <v-btn dark color="apple" class="darken-1" elevation="0" link @click="list">
            <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="pwdDialog" width="420px" persistent >
      <v-card elevation="1">

        <v-alert
            class="ma-0"
            rounded="0"
            dismissible
            v-model="pwdAlert"
            type="error"
            title="Info">
          <div class="caption">
            비밀번호가 일치하지 않습니다.
          </div>
        </v-alert>

        <v-card-title class="subtitle-1 pt-8">
          비밀번호를 입력해주세요.
        </v-card-title>
        <v-card-subtitle class="pt-2">
          해당 게시글은 비밀 게시글입니다:)
        </v-card-subtitle>
        <v-card-text class="pt-0">
          <v-text-field prepend-inner-icon="mdi-lock" v-model="pwdVal"
                        dense
                        filled
                        hide-details
                        rounded class="rounded" type="password"
                        @keyup.enter="checkPwd"
                        label="비밀번호 입력"></v-text-field>
        </v-card-text>
        <v-card-actions class="align-center d-flex justify-center pb-8">
          <v-btn elevation="0" color="secondary" dark @click="checkPwd">입력</v-btn>
          <v-btn elevation="0" color="grey" class="darken-2" dark @click="list">취소</v-btn>
        </v-card-actions>


      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import QnaReply from "./QnaReply";
import QnaApi from "../../../api/QnaApi"
import ToastViewer from "@/components/common/ToastViewer";

export default {
  name: 'QnaView',
  components: {ToastViewer, QnaReply},
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
    pwdDialog:false,
    pwdInvalid:false,
    pwdVal:null,
    pwdAlert:false
  }),
  mounted() {
    let qId = this.$route.query.qnaId || this.$route.params.qnaId;
    this.search(qId);
  },
  methods:{
    search: function(qnaId) {
      QnaApi.get(qnaId).then(res => {
        console.log('qna_view.search.res', res);
        let result = res.data['result'];
        //this.command.content = result['content'].split('\n').join('<br>').split(' ').join('&nbsp;');
        if((result.access || false) && (result.exists || false)) {
          let qnaDto = result['qnaDto'];
          this.bind(qnaDto);
        } else {
          if(!result.access) {
            this.pwdDialog = true;
          }
        }
      })
    },
    list: function(){
      this.$router.push('/qna/list?page=1');
    },
    edit: function(){
      this.$router.push({name:'qna-edit', params:{qnaId: this.command.qnaId}});
    },
    deleteQna: function (){
      QnaApi.delete(this.command.qnaId, this.pwdVal).then(res => {
        console.log('qna_view.delete.res', res);
        this.$router.push('/qna/list?page=1');
      });
    },
    updateRepliesCount: function(repliesCount){
      this.command.replyCnt = repliesCount;
    },
    checkPwd: function() {
      let qId = this.$route.query.qnaId || this.$route.params.qnaId;
      QnaApi.get(qId, this.pwdVal).then(res => {
        let result = res.data['result'];
        //this.command.content = result['content'].split('\n').join('<br>').split(' ').join('&nbsp;');
        if(result.access) {
          let qnaDto = result['qnaDto'];
          this.bind(qnaDto);
          this.pwdInvalid = false;
          this.pwdDialog = false;
        } else {
          this.pwdAlert = true;
          this.pwdInvalid = true;

          setTimeout(() => {
            this.pwdAlert = false;
          }, 3000);
        }
      })
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
    }
  }
}
</script>

<style scoped>

</style>