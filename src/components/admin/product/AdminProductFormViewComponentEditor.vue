<template>
  <div>
    <v-sheet height="660px">
      <editor ref="componentEditor"
              previewStyle="vertical"
              :options="editorOptions"
              initialEditType="wysiwyg"
              height="100%"
              :usageStatistics="false"
      />
    </v-sheet>
  </div>
</template>

<script>
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

import axios from "axios";

export default {
  components: {Editor},
  data:() => ({
    editorOptions:{
      plugins: [[colorSyntax]],
      language: 'ko-KR',
      hideModeSwitch: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
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
    viewComponentId: null,
    content:null,
    imageFiles:[],
  }),
  mounted() {
    this.clear();
    let attr = this.$attrs;
    if(attr && attr.viewComponentId && attr.viewComponentId > 0) {
      this.viewComponentId = attr.viewComponentId;
      this.content = attr.content;
      this.setMarkdown(this.content);
    }
  },
  destroyed() {
    this.clear();
  },
  methods:{
    clear: function (){
      let imageFiles = JSON.parse(localStorage.getItem('imageFiles'));
      if(imageFiles && Array.isArray(imageFiles) && imageFiles.length) {
        localStorage.removeItem('imageFiles');
      }
    },
    reset: function(){
      this.$refs.componentEditor.invoke("reset");
    },
    setMarkdown: function(markdown){
      return this.$refs.componentEditor.invoke("setMarkdown", markdown);
    },
    getMarkdown: function(){
      return this.$refs.componentEditor.invoke("getMarkdown");
    },
    getCommand: function(){
      let command = {
        viewComponentId: this.viewComponentId,
        viewComponentType: 'EDITOR',
        content: this.getMarkdown(),
        imageFiles: []
      };

      let imageFiles = JSON.parse(localStorage.getItem('imageFiles'));
      if(imageFiles && Array.isArray(imageFiles) && imageFiles.length) {
        for(let idx = 0; idx < imageFiles.length; idx += 1) {
          let fileName = imageFiles[idx];
          command.imageFiles.push(fileName);
        }
        localStorage.removeItem('imageFiles');
      }

      return command;
    }
  }
}
</script>

<style scoped>

</style>