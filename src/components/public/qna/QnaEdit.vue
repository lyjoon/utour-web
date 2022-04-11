<template>
  <div>
    <v-layout column class="mt-4 mb-2">
      <v-flex class="caption">※ 비밀번호는 향후 수정 또는 삭제 시 필요하며, 쉬운 비밀번호를 입력하면 타인의 수정 또는 삭제가 될 수 있습니다.</v-flex>
      <v-flex class="caption">※ 욕설 및 혐오 등 게시물은 관리자에 의해 게시글이 삭제될 수 있습니다.</v-flex>
    </v-layout>

    <v-row dense>
      <!-- title -->
      <v-col class="col-12">
        <v-text-field placeholder="제목" hide-details dense outlined class="rounded" v-model="command.title"></v-text-field>
      </v-col>

      <v-col class="col-6 col-lg-5 col-xl-5">
        <v-text-field placeholder="작성자" hide-details dense outlined class="rounded" v-model="command.writer"></v-text-field>
      </v-col>

      <v-col class="col-6 col-lg-4 col-xl-4">
        <v-text-field type="password" placeholder="비밀번호" hide-details dense outlined class="rounded" v-model="command.password"></v-text-field>
      </v-col>

      <v-col class="col-12">
        <div class="d-flex mt-2 mb-2">
          <div class="d-flex subtitle-2 align-center mr-4 pa-1 text--secondary">
            게시글 공개여부
          </div>
          <div class="d-flex">
            <v-radio-group v-model="command.privateYn" row dense hide-details class="mt-0">
              <v-radio value="N" >
                <template v-slot:label><span class="body-2">공개</span></template>
              </v-radio>
              <v-radio value="Y" label="비공개" color="deep-orange">
                <template v-slot:label><span class="body-2">비공개</span></template>
              </v-radio>
            </v-radio-group>
          </div>
        </div>
      </v-col>

      <!-- content -->
      <v-col class="col-12">
        <v-sheet :height="editorHeight">
          <toast-editor ref="editor" @onChange="onChangeEditor"></toast-editor>
        </v-sheet>
      </v-col>

      <!-- button -->
      <v-col class="col-12">
        <div class="d-flex flex-fill justify-end">
          <v-btn large dark color="deep-orange" class="darken-1 mr-3" elevation="0" link @click="save">
            <v-icon class="mr-1" small>mdi-content-save</v-icon><span>저장</span>
          </v-btn>
          <v-btn large dark color="grey" class="darken-1" elevation="0" link @click="back">
            <v-icon class="mr-1" small>mdi-cancel</v-icon><span>취소</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import QnaApi from "../../../api/QnaApi";
import ToastEditor from "@/components/common/ToastEditor";

export default {
  components: {ToastEditor},
  computed: {
    defaultTextRow(){
      return this.$vuetify.breakpoint.smAndDown ? 15 : 20;
    },
    editorHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 500 : 600;
    }
  },
  data: ()=>({
    command: {
      qnaId : null,
      title : null,
      content : null,
      privateYn : 'Y',
      password : null,
      writer : null
    }
  }),
  mounted() {
    let qnaId = this.$route.params['qnaId'];
    if((qnaId || 0) > 0) this.search(qnaId);
  },
  methods: {
    search: function(qnaId){
      QnaApi.get(qnaId).then(res => {
        let result = res.data.result;
        this.command.writer = result.writer;
        this.command.title = result.title;
        this.command.content = result.content;
        this.command.privateYn = result.privateYn;
        this.command.password = result.password;
        this.command.qnaId = result.qnaId;

        this.$refs.editor.setMarkdown(this.command.content);
      });
    },
    save: function (){
      QnaApi.save(this.command);
      this.$router.push("/qna/list");
    },
    back: function (){
      if((this.command.qnaId || 0) > 0) {
        this.$router.push({name:'qna-view', params:{qnaId: this.command.qnaId}});
      } else this.$router.push("/qna/list?page=1");
    },
    onChangeEditor: function (markdown) {
      this.command.content = markdown;
    }
  }
}
</script>

<style scoped>
</style>