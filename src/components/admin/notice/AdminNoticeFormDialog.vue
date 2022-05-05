<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mdAndDown"
            :width="$vuetify.breakpoint.mdAndDown ? '100%' : '1200px'"
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
        <v-form ref="frm" lazy-validation>
          <v-row dense class="pt-4">
          <v-col cols="12">
            <v-text-field v-model="command.title" dense outlined label="공지사항 제목" :rules="rules.title" placeholder="제목을 입력하세요" />
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-fill justify-start">
              <div class="d-inline-flex mr-4">
                <v-select class="hidden-md-and-up" label="공지(상단고정)유무"
                          outlined dense hide-details
                          v-model="command.noticeYn" :items="noticeYnItems" item-text="text" item-value="value">
                </v-select>

                <v-radio-group v-model="command.noticeYn" row class="mt-1 hidden-sm-and-down" >
                  <template v-slot:label>
                    <span class="mr-1">공지(상단고정)유무</span>
                  </template>
                  <v-radio color="secondary" value="Y" label="공지사항" >
                    <template v-slot:label>
                      <span class="body-2">상단고정</span>
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
            <v-sheet width="100%" :height="editorHeight">
              <toast-editor ref="editor" @onChange="onChangeEditor"></toast-editor>
            </v-sheet>
          </v-col>
        </v-row>

        </v-form>
        <div class="mt-4 mb-4">
          <div class="mb-2">
            첨부파일 <v-btn color="primary" dark elevation="0" @click="chooseFile" small class="ml-2 pl-1 pr-1"><v-icon small class="mdi-border-all">mdi-plus</v-icon> 등록</v-btn>
            <v-file-input @change="onChangeFile"
                          ref="fileUploadInput"
                          multiple
                          class="d-none"
                          denseaccept="image/png, image/jpeg, image/bmp"/>
          </div>
          <v-sheet height="100px" rounded class="pa-2 overflow-y-auto ma-0" outlined>
            <ul>
              <li v-for="item in attachments" :key="item.idx" class="body-2" :v-if="item.isModify">
                <span>{{item.originName}}</span>
                <v-btn class="ml-1" icon small color="deep-orange darken-2" @click="deleteFileItem(item)">
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </li>
            </ul>
          </v-sheet>
        </div>

      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-fill justify-end pa-2">
          <v-btn dark elevation="0" color="grey darken-2" @click="save"><v-icon small class="mr-1">mdi-content-save</v-icon>저장</v-btn>
          <v-btn elevation="0" color="grey lighten-1" @click="close" class="ml-2"><v-icon small class="mr-1">mdi-cancel</v-icon>닫기</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import ToastEditor from "@/components/common/ToastEditor";
import NoticeApi from "../../../api/NoticeApi";
export default {
  name: "AdminNoticeFormDialog",
  components: {ToastEditor},
  computed:{
    editorHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 500 : 600;
    },
    noticeYnItems(){
      return [{value:"Y", text:'상단고정'}, {value:"N", text:'일반'}]
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
    },
    rules: {
      title: [
          v => !!v || '제목을 입력해주세요.',
        v => (v && v.length <= 50) || '제목은 50자를 넘길 수 없습니다.',
      ]
    },
    attachments: []
  }),
  methods:{
    showDialog: function () {
      this.dialog = !this.dialog;
    },
    edit: function(notice){
      this.dialog = true;
      NoticeApi.get(notice.noticeId).then(res => {
        let result = res.data.result;
        this.command.noticeId = result.noticeId;
        this.command.title = result.title;
        this.command.content = result.content;
        this.command.noticeYn = result.noticeYn;
        this.command.writer = result.writer;
        this.command.createAt = result.createAt;

        if(this.$refs.editor) {
          this.$refs.editor.setMarkdown(this.command.content);
        }
        // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        this.$store.commit("snackMessage", {message : '공지 게시글을 정상적으로 불러오지 못했습니다.'});
        this.close();
      })
    },
    close: function() {
      this.$refs.frm.reset();
      this.$refs.editor.reset();
      this.$refs.frm.resetValidation();
      this.dialog = false;
    },
    onChangeEditor: function(markdown){
      this.command.content = markdown;
    },
    save: function(){
      let valid = this.$refs.frm.validate();
      if(valid) {
        let fileItems = this.attachments.filter(item => !!item.file).map(value => value['file']);
        // eslint-disable-next-line no-unused-vars
        NoticeApi.save(this.command, fileItems).then(res => {
          //this.$store.state.
          this.close();
        });
      }
    },
    chooseFile: function (){
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true });
      //this.$refs.uploader.click();
      this.$refs.fileUploadInput.$refs.input.click();
    },
    onChangeFile: function(files){
      // console.log(files);
      // eslint-disable-next-line no-unused-vars
      files.forEach((value, index) => {
        // console.log("["+index+"]", value);
        let fileItem = {
          idx: this.attachments.length,
          isModify: true,
          attachId:null,
          cmdType : 'C',
          originName: value.name,
          file: value,
        };
        this.attachments.push(fileItem);
      })
    },
    deleteFileItem: function(item) {
      this.attachments.forEach((value, index) => {
        if(item.idx == value.idx) {
          if((value.attachId || 0) > 0) {
            value.isModify = false;
            value.cmdType = 'D';
          } else {
            this.attachments.splice(index, 1);
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>