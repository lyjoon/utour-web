<template>
  <div>
    <v-sheet height="660px">
      <editor ref="componentEditor"
              previewStyle="vertical"
              :options="editorOptions"
              initialEditType="wysiwyg"
              height="100%"
      />
    </v-sheet>
  </div>
</template>

<script>
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

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
      ]
    }
  }),
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
  }
}
</script>

<style scoped>

</style>