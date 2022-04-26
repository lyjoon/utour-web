<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mdAndDown"
            width="1200px"
            persistent
            v-model="dialog">
    <v-toolbar>
      <div class="d-flex flex-fill align-center">
        <v-toolbar-title>공지사항 - 등록</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close" color="#999999" outlined tile class="rounded toolbar-btn-outlined" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card tile>
      <v-card-text >
        <v-row dense class="pt-4">
          <v-col cols="12">
            <v-text-field v-model="command.title" dense outlined label="공지사항 제목" placeholder="제목을 입력하세요" />
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-fill justify-start">
              <div class="d-inline-flex mr-8">
                <v-radio-group v-model="command.noticeYn" row class="mt-1">
                  <template v-slot:label>
                    <span class="mr-1">공지글</span>
                  </template>
                  <v-radio color="secondary" value="Y" label="공지사항" >
                    <template v-slot:label>
                      <span class="body-2">고정</span>
                    </template>
                  </v-radio>
                  <v-radio value="N" label="일반" >
                    <template v-slot:label>
                      <span class="body-2">일반</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
              <div class="d-inline-flex">
                <div style="min-width: 220px">
                  <v-text-field class="shrink" label="작성자" placeholder="작성자" v-model="command.writer" dense outlined disabled />
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12">
            <v-sheet :height="editorHeight">
              <toast-editor ref="editor" @onChange="onChangeEditor"></toast-editor>
            </v-sheet>
          </v-col>
        </v-row>


        <div class="mt-4 mb-4">
          <v-sheet height="150px" rounded class="pa-2 overflow-y-auto" outlined="1">
            파일첨부
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
            파일첨부<br />
          </v-sheet>
        </div>

      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-fill justify-end pa-2">
          <v-btn dark elevation="0" color="grey darken-2"><v-icon small class="mr-1">mdi-content-save</v-icon>저장</v-btn>
          <v-btn elevation="0" color="grey lighten-1" @click="close" class="ml-2"><v-icon small class="mr-1">mdi-cancel</v-icon>닫기</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import ToastEditor from "@/components/common/ToastEditor";
export default {
  name: "AdminNoticeFormDialog",
  components: {ToastEditor},
  computed:{
    editorHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 500 : 600;
    }
  },
  data: ()=>({
    dialog: false,
    command: {
      noticeId:null,
      title:null,
      content:null,
      noticeYn:'N',
      writer: '관리자',
      createAt:null,
    }
  }),
  methods:{
    showDialog: function () {
      this.dialog = !this.dialog;
    },
    close: function() {
      this.dialog = false;
    },
    onChangeEditor: function(markdown){
      this.command.content = markdown;
    }
  }
}
</script>

<style scoped>

</style>