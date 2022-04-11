<template>
  <viewer ref="refViewer" previewStyle="vertical" height="100%" />
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/vue-editor';

export default {
  components:{Viewer},
  name: "ToastViewer",
  methods:{
    setMarkdown: function(markdown){
      this.$refs.refViewer.invoke('setMarkdown', markdown);
    },
    reset: function(){
      this.$refs.refViewer.invoke('destroy');
    }
  }
}
</script>

<style scoped>

</style>