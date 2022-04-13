<template>
  <div>
    <v-layout column class="mt-4 mb-2">
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
          <v-text-field placeholder="작성자" label="작성자명" dense outlined class="rounded" v-model="command.writer"  :rules="rules.writer"></v-text-field>
        </v-col>

        <v-col class="col-6 col-lg-4 col-xl-4">
          <v-text-field type="password" label="게시글 비밀번호" prepend-inner-icon="mdi-lock" placeholder="비밀번호" dense outlined class="rounded" v-model="command.password" :rules="rules.password"></v-text-field>
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
    </v-form>
    <qna-password-dialog ref="passwordDialog" @success="passwordDialogSuccess" @cancel="passwordDialogCancel" />

  </div>

</template>

<script>
import QnaApi from "../../../api/QnaApi";
import ToastEditor from "@/components/common/ToastEditor";
import QnaPasswordDialog from "@/components/public/qna/QnaPasswordDialog";

export default {
  components: {ToastEditor, QnaPasswordDialog},
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
      privateYn : 'Y',
      password : null,
      writer : null
    },
    passwordSuccess: false,
    password:null,
    rules: {
      title: [
        v => !!v || '제목을 입력해주세요.',
        v => (v && v.length < 50) || '제목은 50자를 넘길 수 없습니다.',
      ],
      password: [
        v => !!v || '비밀번호는 필수값입니다.',
      ],
      writer: [
        v => !!v || '작성자명을 입력해주세요.',
        v => (v && v.length < 10) || '작성자 길이는 10자를 넘길 수 없습니다.',
      ]
    },
  }),
  mounted() {
    let params = this.$route.params;
    if((params['qnaId'] || -1) > 0) {
      this.search(params['qnaId'], params['password']);
    } else {
      this.$router.go(-1);
      this.$store.state.snackbar.message = "[만료된 페이지] 찾고 있는 페이지에서 사용자가 입력한 정보가 사용되어 이전페이지로 이동합니다.";
      this.$store.state.snackbar.flag = true;
    }
  },
  methods: {
    search: function(qnaId, password){
      QnaApi.get(qnaId || -1, password).then(res => {
        let result = res.data.result;

        if((result.access || false) && (result.exists || false)) {
          let dto = result['qnaDto'];
          this.command.content = dto['content'];//.split('\n').join('<br>').split(' ').join('&nbsp;');
          this.command.title = dto['title'];
          this.command.createAt = dto['createAt'];
          this.command.writer = dto['writer'];
          this.command.pv = dto['pv'];
          this.command.privateYn = dto['privateYn'];
          this.command.replyCnt = dto['replyCnt'];
          this.command.qnaId = dto['qnaId'];
          this.command.password = password;
          this.$refs.editor.setMarkdown(this.command.content);
        } else {
          if(!result.access) {
            this.$refs.passwordDialog.open(qnaId, 'get');
          }
        }
      });
    },
    save: function (){
      // eslint-disable-next-line no-unused-vars
      let valid = this.$refs.frm.validate();
      if(valid) {
        // eslint-disable-next-line no-unused-vars
        QnaApi.save(this.command).then(res => {
          this.back();
        });
      }

    },
    back: function (){
      if((this.command.qnaId || 0) > 0) {
        this.$router.push({name:'qna-view', params:{qnaId: this.command.qnaId, password: this.command.password}});
      } else this.$router.push("/qna/list?page=1");
    },
    onChangeEditor: function (markdown) {
      this.command.content = markdown;
    },
    // eslint-disable-next-line no-unused-vars
    passwordDialogSuccess: function(type) {
      this.search(this.$route.params['qnaId'], this.passwordSuccess = this.$refs.passwordDialog.getPassword())
    },
    // eslint-disable-next-line no-unused-vars
    passwordDialogCancel: function(type) {
      this.back();
    },
  }
}
</script>

<style scoped>
</style>