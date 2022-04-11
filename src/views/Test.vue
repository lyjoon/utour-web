<template>
  <v-container>
    <div style="height: 50vh;">
      <toast-editor ref="editor" @onChange="setMarkdown" />
    </div>
    <div style="height: 40vh;margin-top: 20px">
      <toast-viewer ref="viewer" />
    </div>
  </v-container>
</template>

<script>

import ToastEditor from "@/components/common/ToastEditor";
import ToastViewer from "@/components/common/ToastViewer";
export default {
  components: {ToastViewer, ToastEditor},
  data: () =>({
  }),
  methods:{
    setMarkdown: function(markdown){
      this.$refs.viewer.setMarkdown(markdown);
    }
  }
}
</script>

<style scoped>

</style>