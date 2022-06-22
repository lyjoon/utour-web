<template>
  <div>
    <v-layout column class="mb-2">
      <v-flex class="caption">※ 비밀번호는 향후 수정 또는 삭제 시 필요하며, 쉬운 비밀번호를 입력하면 타인의 수정 또는 삭제가 될 수 있습니다.</v-flex>
      <v-flex class="caption">※ 욕설 및 혐오 등 게시물은 관리자에 의해 게시글이 삭제될 수 있습니다.</v-flex>
    </v-layout>

    <v-form ref="frm" lazy-validation>
      <v-row dense>
        <!-- title -->
        <v-col class="col-12">
          <v-text-field placeholder="제목" label="글제목" dense outlined class="rounded" v-model="command.title" :rules="rules.title"></v-text-field>
        </v-col>

        <v-col class="col-6 col-lg-5 col-xl-5">
          <v-text-field placeholder="작성자" label="작성자명" dense outlined class="rounded" v-model="command.writer" :rules="rules.writer"></v-text-field>
        </v-col>

        <v-col class="col-6 col-lg-4 col-xl-4">
          <v-text-field type="password" label="게시글 비밀번호" prepend-inner-icon="mdi-lock" placeholder="비밀번호" dense outlined class="rounded" v-model="command.password"  :rules="rules.password"></v-text-field>
        </v-col>

        <v-col class="col-12">
          <div class="d-flex mt-2 mb-2">
            <div class="d-flex subtitle-2 align-center mr-4 pl-1 pt-1 text--secondary">
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
          <div class="d-block caption pl-1 pr-1 pb-1 deep-orange--text" v-if="command.privateYn =='Y'">
            비공개로 지정할 경우 비밀번호를 반드시 숙지하셔야 합니다.
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
          <div class="d-flex flex-fill justify-center pt-4 pb-4">
            <v-btn dark large color="deep-orange darken-1" elevation="0" link @click="save">
              <v-icon class="mr-1" small>mdi-content-save</v-icon><span>저장</span>
            </v-btn>
            <v-btn dark large color="grey2" class="ml-4" elevation="0" link @click="back">
              <v-icon class="mr-1" small>mdi-cancel</v-icon><span>취소</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>

  </div>

</template>

<script>
import QnaApi from "../../../api/QnaApi";
import ToastEditor from "@/components/common/ToastEditor";

export default {
  components: {ToastEditor},
  computed: {
    editorHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 500 : 600;
    }
  },
  data: ()=>({
    command: {
      qnaId : null,
      title : null,
      content : null,
      privateYn : 'N',
      password : null,
      writer : null
    },
    passwordSuccess: false,
    password:null,
    rules: {
      title: [
          v => !!v || '제목을 입력해주세요.',
          v => (v && v.length <= 50) || '제목은 50자를 넘길 수 없습니다.',
      ],
      password: [
        v => !!v || '비밀번호는 필수값입니다.',
        v => (v && v.length <= 20) || '비밀번호는 20자를 넘길 수 없습니다.',
      ],
      writer: [
        v => !!v || '작성자명을 입력해주세요.',
        v => (v && v.length <= 10) || '작성자 길이는 10자를 넘길 수 없습니다.',
      ]
    },
  }),
  methods: {
    save: function (){
      let valid = this.$refs.frm.validate();
      if(valid) {
        // eslint-disable-next-line no-unused-vars
        QnaApi.save(this.command).then(res => {
          this.$router.push("/qna/list");
        });
      }
    },
    back: function (){
      this.$router.push("/qna/list?page=1");
    },
    onChangeEditor: function (markdown) {
      this.command.content = markdown;
    },
  }
}
</script>

<style scoped>
</style>