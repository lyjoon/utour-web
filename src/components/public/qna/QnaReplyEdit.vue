<template>
  <div>
    <div class="grey lighten-4 rounded-lg d-block pt-4 pb-2">
      <v-form lazy-validation ref="frm">

        <v-container>
          <v-layout row class="hidden-md-and-down pt-2">
            <v-flex class="d-flex flex-fill">
              <div class="d-inline-block pr-2 pl-4">
                <div class="d-block" style="width: 200px;">
                  <v-text-field outlined dense placeholder="작성자명 또는 닉네임" v-model="command.writer" label="닉네임" :rules="rules.writer" background-color="white" class="font-size-14" />
                </div>
                <div class="d-block">
                  <v-text-field type="password" outlined dense label="비밀번호" v-model="command.password" :rules="rules.password" placeholder="댓글 비밀번호" background-color="white" class="font-size-14" />
                </div>
              </div>

              <div class="flex-fill pr-4 pl-2">
                <v-textarea rows="5" dense :rules="rules.content" outlined no-resize background-color="white" v-model="command.content" label="댓글" placeholder="댓글" class="font-size-14" />
              </div>
            </v-flex>
          </v-layout>

          <v-row dense class="hidden-lg-and-up">
            <v-col class="col-6">
              <v-text-field outlined dense label="작성자" v-model="command.writer" :rules="rules.writer" placeholder="작성자명 또는 닉네임" background-color="white" class="font-size-14" />
            </v-col>
            <v-col class="col-6">
              <v-text-field type="password" v-model="command.password" :rules="rules.password" outlined dense label="댓글 비밀번호" placeholder="댓글 비밀번호" background-color="white" class="font-size-14" />
            </v-col>
            <v-col class="col-12">
              <v-textarea rows="5" v-model="command.content" dense :rules="rules.content" outlined no-resize background-color="white" label="댓글" placeholder="댓글" class="font-size-14" />
            </v-col>

          </v-row>
        </v-container>

        <div class="d-flex flex-fill justify-end pb-2 pl-2 pr-4">
          <v-btn dark color="deep-orange" class="darken-2" elevation="0" @click="save">
            <template v-slot:default>
              <v-icon small class="mr-1">mdi-message-reply-text</v-icon> 저장
            </template>
          </v-btn>
        </div>

      </v-form>
    </div>
  </div>
</template>

<script>
import Qna from "../../../api/QnaApi";

export default {
  data: () => ({
    command: {
      qnaId:null,
      qnaReplyId:null,
      content:null,
      writer:null,
      password:null,
    },
    rules:{
      password: [
        v => !!v || '비밀번호를 입력해주세요.',
        v => (v && v.length <= 10) || '최대 10자 제한입니다.',
      ],
      writer: [
        v => !!v || '작성자명을 입력해주세요.',
        v => (v && v.length <= 10) || '최대 10자 제한입니다.',
      ],
      content:[
        v => !!v || '내용을 입력해주세요.',
      ]
    }
  }),
  methods: {
    init: function (qnaId) {
      console.log('qna_reply_edit.init.qnaId', qnaId);
      this.command.qnaId = qnaId;
    },
    save: function (){
      let avail = this.$refs.frm.validate();
      if(avail) {
        Qna.saveReply(this.command).then(res => {
          if(res.status == 200) {
            this.$refs.frm.reset();
            this.$emit('reloadReplies');
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
