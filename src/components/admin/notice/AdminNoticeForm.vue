<template>
  <div class="pa-4">
    <v-form ref="frm" lazy-validation>

      <div>
        <v-text-field v-model="command.title" dense outlined label="공지사항 제목" class="ime-mode-active" :rules="rules.title" placeholder="제목을 입력하세요" />
      </div>

      <div>
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
      </div>


      <div>
        <v-sheet width="100%" :height="editorHeight">
          <toast-editor ref="editor" @onChange="onChangeEditor"></toast-editor>
        </v-sheet>
      </div>


      <div class="mt-4 mb-4">
        <div class="mb-2">
          첨부파일 <v-btn color="blue-grey" dark elevation="0" @click="chooseFile" small class="ml-2 pl-1 pr-1"><v-icon small class="mdi-border-all">mdi-plus</v-icon> 등록</v-btn>
          <v-file-input @change="onChangeFile"
                        ref="fileUploadInput"
                        multiple
                        class="d-none" />
        </div>
        <v-sheet rounded class="pa-2 ma-0" color="grey lighten-4" v-if="attachments.length > 0">
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

      <div class="pa-2">
        <div class="d-flex flex-fill justify-end">
          <v-btn dark elevation="0" large color="deep-orange darken-2" @click="save"><v-icon small class="mr-1">mdi-content-save</v-icon>저장</v-btn>
          <v-btn elevation="0" outlined large @click="$router.back()" class="ml-2"><v-icon small class="mr-1">mdi-format-list-bulleted</v-icon>목록으로</v-btn>
        </div>
      </div>

    </v-form>
  </div>
</template>

<script>
import ToastEditor from "@/components/common/ToastEditor";
import NoticeApi from "../../../api/NoticeApi";
export default {
  components: {ToastEditor},
  computed:{
    editorHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 500 : 600;
    },
    noticeYnItems(){
      return [{value:"Y", text:'상단고정'}, {value:"N", text:'일반공지'}]
    },
  },
  mounted() {
    let noticeId = this.$route.query.noticeId;
    // console.log('mounted', noticeId);
    // if(!isNaN(noticeId)) {
    if((noticeId || 0) > 0) {
      this.search(noticeId);
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
    onChangeEditor: function(markdown){
      this.command.content = markdown;
    },
    search: function(noticeId) {

      NoticeApi.get(noticeId).then(res => {
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
      })
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
          this.$router.push('/admin/notice/list?page=1');
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