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
          let formData = new FormData();
          formData.append('file', blob);
          axios.post("/api/v1/image/upload/temp", formData).then(res => {
            let resource = res.data.result;
            callback(resource.src, resource.alt);
          })
        }
      }
    },
    viewComponentId: null,
    content:null,
  }),
  mounted() {
    let attr = this.$attrs;
    console.log('mounted.admin-product-view-component-editor.bind-attr', attr);
    if(attr && attr.viewComponentId && attr.viewComponentId > 0) {
      this.viewComponentId = attr.viewComponentId;
      this.content = attr.content;
      this.setMarkdown(this.content);
    }
  },
  methods:{
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
        content: this.getMarkdown()
      };
      return command;
    }
  }
}
</script>

<style scoped>

</style>