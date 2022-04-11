<template>
  <editor ref="refEditor"
          previewStyle="vertical"
          :options="editorOptions"
          initialEditType="wysiwyg"
          height="100%"
          v-on:change="onChange" />
</template>

<script>

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export default {
  components:{Editor},
  data: () =>({
    editorOptions:{
      plugins: [[colorSyntax]],
      language: 'ko-KR',
      hideModeSwitch: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        //['table', 'image', 'link'],
        ['table', 'link'],
        ['scrollSync'],
      ]
    }
  }),
  methods:{
    reset: function(){
      this.$refs.refEditor.invoke("reset");
    },
    getMarkdown: function(){
      return this.$refs.refEditor.invoke("getMarkdown");
    },
    setMarkdown: function(markdown){
      return this.$refs.refEditor.invoke("setMarkdown", markdown);
    },
    onChange: function(){
      this.$emit("onChange", this.$refs.refEditor.invoke("getMarkdown"));
    }
  }
}
</script>

<style scoped>

</style>