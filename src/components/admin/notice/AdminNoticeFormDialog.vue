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
            <v-text-field v-model="command.title" dense outlined label="공지사항 제목" class="ime-mode-active" :rules="rules.title" placeholder="제목을 입력하세요" />
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-fill justify-start">
              <div class="d-inline-flex mr-4">
                <v-select label="공지(상단고정)유무"
                          outlined
                          dense
                          hide-details
                          placeholder="일반공지"
                          v-model="command.noticeYn" :items="noticeYnItems" item-text="text" item-value="value">
                </v-select>
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
          <v-sheet height="100px" rounded class="pa-2 overflow-y-auto ma-0" color="grey lighten-4" v-if="attachments.length > 0">
            <ul>
              <li v-for="item in attachments" :key="item.idx" class="body-2" :v-if="item.isModify">
                <span :style="{'text-decoration': (!item.isModify ? 'line-through' : 'none')}">{{item.originName}}</span>
                <v-btn class="ml-1" icon small :color="`${item.isModify ? 'deep-orange':'primary'}`" @click="deleteFileItem(item)">
                  <v-icon small>{{item.isModify ? 'mdi-close':'mdi-check'}}</v-icon>
                </v-btn>
              </li>
            </ul>
          </v-sheet>
        </div>

      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-fill justify-end pa-2">
          <v-btn dark elevation="0" color="grey darken-2" @click="save"><v-icon small class="mr-1">mdi-content-save</v-icon>저장</v-btn>
          <v-btn dark elevation="0" color="grey lighten-1" @click="close" class="ml-2"><v-icon small class="mr-1">mdi-cancel</v-icon>닫기</v-btn>
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
      return [{value:"Y", text:'상단고정'}, {value:"N", text:'일반공지'}]
    },
    getNoticeYn(){
      return this.command.noticeYn || 'N';
    }
  },
  data: ()=>({
    dialog: false,
    command: {
      noticeId:null,
      title:null,
      content:null,
      noticeYn:null,
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
    clear: function(){
      this.command.noticeId = null;
      this.command.title = null;
      this.command.content = null;
      this.command.noticeYn = null;
      this.command.writer = '관리자';
      this.command.createAt = null;
      this.attachments = [];
      if(this.$refs.frm) {
        this.$refs.frm.reset();
        this.$refs.frm.resetValidation();
      }
      if(this.$refs.editor) {
        this.$refs.editor.reset();
      }
    },
    showDialog: function () {
      this.clear();
      this.dialog = !this.dialog;
      if(this.$refs.editor) this.$refs.editor.setMarkdown(this.command.content);
    },
    edit: function(notice){
      this.clear();
      this.dialog = true;
      NoticeApi.get(notice.noticeId).then(res => {
        let result = res.data.result;
        this.command.noticeId = result.noticeId;
        this.command.title = result.title;
        this.command.content = result.content;
        this.command.noticeYn = result.noticeYn;
        this.command.writer = result.writer;
        this.command.createAt = result.createAt;

        // this.attachments = result.attachments;
        result.attachments.forEach(attach => {
          let item = {
            idx: this.attachments.length,
            attachId: attach.attachId,
            isModify: true,
            originName: attach.originName,
            size: attach.size,
            cmdType : 'R',
            file: null
          };
          this.attachments.push(item);
        })

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
      this.clear();
      this.dialog = false;
    },
    onChangeEditor: function(markdown){
      this.command.content = markdown;
    },
    save: function(){
      let valid = this.$refs.frm.validate();
      if(valid) {
        let fileItems = [];// = this.attachments.filter(item => !!item.file).map(value => value['file']);
        let deleteAttachIdList = [];//this.attachments.
        this.attachments.forEach(item => {
          if(item.file) {
            fileItems.push(item.file);
          }
          if((item.attachId || 0) > 0 && !item.isModify ) {
            deleteAttachIdList.push(item.attachId);
          }
        })
        // eslint-disable-next-line no-unused-vars
        NoticeApi.save({command : this.command, deleteAttachId : deleteAttachIdList}, fileItems).then(res => {
          //this.$store.state.
          this.close();
          this.$emit("complete");
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
          if(item.isModify) {
            if((value.attachId || 0) > 0) {
              item.isModify = false;
              item.cmdType = 'D';
            } else {
              this.attachments.splice(index, 1);
            }
          } else {
            item.isModify = true;
            item.cmdType = 'R';
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>