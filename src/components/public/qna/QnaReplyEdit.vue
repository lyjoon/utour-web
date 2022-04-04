<template>
  <div>
    <v-divider />
    <div class="grey lighten-4 pa-2">
      <v-layout row class="hidden-md-and-down">
        <v-flex class="d-flex flex-fill">

          <div class="d-inline-block pt-2 pb-2 pr-2 pl-4">
            <div class="d-block" style="width: 200px;">
              <v-text-field outlined hide-details dense placeholder="작성자명 또는 닉네임" v-model="command.writer" label="닉네임" background-color="white" class="font-size-14" />
            </div>
            <div class="d-block mt-4">
              <v-text-field type="password" outlined hide-details dense label="비밀번호" v-model="command.password" placeholder="댓글 비밀번호" background-color="white" class="font-size-14" />
            </div>
          </div>

          <div class="flex-fill pt-2 pb-2 pr-4 pl-2">
            <v-textarea rows="5" dense hide-details outlined no-resize background-color="white" v-model="command.content" label="댓글" placeholder="댓글" class="font-size-14" />
          </div>
        </v-flex>
      </v-layout>
      <v-layout row class="hidden-lg-and-up">
        <v-flex class="d-flex col-6 flex-fill">
          <v-text-field outlined hide-details dense label="작성자" v-model="command.writer" placeholder="작성자명 또는 닉네임" background-color="white" class="font-size-14" />
        </v-flex>
        <v-flex class="d-flex col-6 flex-fill">
          <v-text-field type="password" v-model="command.password" outlined hide-details dense label="댓글 비밀번호" placeholder="댓글 비밀번호" background-color="white" class="font-size-14" />
        </v-flex>
        <v-flex class="col-12">
          <v-textarea rows="5" v-model="command.content" dense hide-details outlined no-resize background-color="white" label="댓글" placeholder="댓글" class="font-size-14" />
        </v-flex>
      </v-layout>

      <div class="d-flex flex-fill justify-end pa-1">
        <v-btn dark color="deep-orange" class="darken-2" elevation="0" @click="save">
          <template v-slot:default>
            <v-icon small class="mr-1">mdi-message-reply-text</v-icon> 저장
          </template>
        </v-btn>
      </div>

    </div>
    <v-divider />
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
    }
  }),
  methods: {
    init: function (qnaId) {
      console.log('qna_reply_edit.init.qnaId', qnaId);
      this.command.qnaId = qnaId;
    },
    save: function (){
      Qna.saveReply(this.command).then(res => {
        console.log('qna_reply_edit.save.res', res);
        this.$emit('reloadReplies');
      });
    }
  }
}
</script>

<style scoped>

</style>
