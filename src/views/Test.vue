<template>
  <v-app class="app-main" style="background-color: #f4f4f4">
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">

      <v-card color="white" rounded elevation="0" outlined>
        <div class="title pa-2">메-뉴</div>

        <div class="slide_menu_bar" >
          <v-slide-group >
            <v-slide-item v-for="(item, index) in menuList" :key="index" class="flex-fill">
              <div class="pt-3 pb-3 pl-2 pr-2 text-center subtitle-1 body-2 slide-menu-item">{{item.arrivalName}}</div>
            </v-slide-item>
          </v-slide-group>
        </div>

        <v-card-text>

          <v-sheet height="330px" width="100%" elevation="0">
            <editor ref="componentEditor"
                    previewStyle="vertical"
                    :options="editorOptions"
                    initialEditType="wysiwyg"
                    height="100%"
                    :usageStatistics="false"
            />
          </v-sheet>
        </v-card-text>
      </v-card>


      <div class="d-none">
        <v-btn @click="copy" color="blue" >cpy</v-btn>
      </div>

      <div class="d-none">
        <v-btn @click="openAlert">show-alert</v-btn>
        <v-btn @click="openSnack">show-snack</v-btn>
        <v-btn @click="confirm">show-confirm</v-btn>
      </div>

      <alert ref="alert" />
      <snackbar ref="snackbar" />
      <confirm ref="confirm" />
    </v-container>
  </v-app>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';
import Alert from "@/components/common/Alert";
import Snackbar from "@/components/common/Snackbar";
import Confirm from "@/components/common/Confirm";
import codeApi from "@/api/CodeApi";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import axios from "axios";
export default {
  components: {Confirm, Snackbar, Alert , Editor},
  data: () =>({
    menuList:[],
    editorOptions:{
      plugins: [[colorSyntax]],
      language: 'ko-KR',
      hideModeSwitch: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['scrollSync'],
      ],
      hooks: {
        addImageBlobHook: (blob, callback) => {
          // let _this = this;
          // console.log('#addImageBlobHook', Vue.options);
          let imageFiles = JSON.parse(localStorage.getItem("imageFiles")) || [];
          let formData = new FormData();
          formData.append('file', blob);
          axios.post("/api/v1/image/upload/temp", formData).then(res => {
            let resource = res.data.result;
            callback(resource.src, resource.alt);
            let fileName = resource['fileName'] || '';
            if(fileName != '') {
              imageFiles.push(resource['fileName']);
              localStorage.setItem('imageFiles', JSON.stringify(imageFiles));
            }
            console.log('upload-temp', fileName, imageFiles);
          })
        }
      }
    },
  }),
  mounted() {
    codeApi.getArrivalList().then(res => {
      if(Array.isArray(res.data)) {
        res.data.forEach(item => {
          this.menuList.push(
              {arrivalName: item.arrivalName, arrivalCode:item.arrivalCode,active:false}
          );
        })
      }
    });
  },
  methods:{

    openAlert: function (){
      //this.$refs.alert.open();
      this.$store.commit('alert', {message:'쳐봐'});
    },
    confirm: function (){
      this.$store.commit("confirm", {message : '삭제할까', callback: function(){
        console.log("confirm-success");
        }});
    },
    openSnack: function(){
      //this.$store.state.snackbar.message = 'snack';
      // this.$store.state.snackbar.flag = true;
      this.$store.commit("snackMessage", {message : '공지 게시글을 정상적으로 불러오지 못했습니다.'});
    }
  }
}
</script>

<style scoped>
  .slide_menu_bar{
    background-color: #ff7f00;
    border-bottom: 1px solid #eaeaea;
    border-top: 1px solid #eaeaea;
  }
  .slide-menu-item{
    font-weight: 600;
    background-color: #ff7f00;
    color: white;
  }
  .slide-menu-item:hover {
    background-color: #ff7f00;
    color: white;
  }
</style>