<template>
  <div>
    <v-sheet color="grey lighten-4" outlined class="pr-2 pl-2 pt-2 pb-2">
      <div class="rounded-lg d-block pt-1 pb-1">
        <v-form lazy-validation ref="frm">
          <div>
            <v-textarea rows="3" v-model="command.content" :rules="rules.content"
                        outlined no-resize
                        dense
                        hide-details
                        background-color="white" label="댓글" placeholder="댓글" class="font-size-14" />
          </div>

          <div class="d-flex flex-fill pt-2">
            <div class="d-flex" style="width: 200px">
              <v-text-field hide-details
                            outlined
                            dense label="작성자" v-model="command.writer" :rules="rules.writer"
                            placeholder="관리자"
                            background-color="white" class="font-size-14" />
            </div>


            <v-spacer />

            <div class="d-flex justify-end">
              <v-btn color="blue-grey lighten-1" dark small height="39px" elevation="0" @click="save">
                <template v-slot:default>
                  댓글저장
                </template>
              </v-btn>
            </div>
          </div>

        </v-form>
      </div>
    </v-sheet>
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
      writer:'관리자',
      password:null,
      adminYn: 'Y',
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
      this.command.qnaId = qnaId;
    },
    save: function (){
      let avail = this.$refs.frm.validate();
      if(avail) {
        Qna.saveReply(this.command).then(res => {
          if(res.status == 200) {
            this.$refs.frm.reset();
            this.$emit("updateQnaReply");
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
