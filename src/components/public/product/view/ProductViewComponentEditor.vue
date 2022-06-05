<template>
  <div>
    <v-divider />
    <div class="pb-4 pt-6 ">
      <sub-title :title="title" :description="description" />
    </div>

    <v-sheet min-height="50px" elevation="0">
      <toast-viewer ref="toast_viewer" />
    </v-sheet>
  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
import SubTitle from "@/components/common/SubTitle";
export default {
  name: "ProductViewComponentEditor",
  components: {SubTitle, ToastViewer},
  data: () =>({
    viewComponentId:null,
    viewComponentType:null,
    content:null,
    title:null,
    description:null,
  }),
  mounted() {
    let viewComponent = this.$attrs;
    this.bind(viewComponent);
  },
  methods: {
    bind: function (viewComponent){
      console.log('editor.bind', viewComponent);
      if(viewComponent) {
        this.viewComponentId = viewComponent.viewComponentId;
        this.viewComponentType = viewComponent.viewComponentType;
        this.content = viewComponent.content;
        this.title = viewComponent.title;
        this.description = viewComponent.description;
        this.$refs.toast_viewer.setMarkdown(this.content);
      }
    }
  }
}
</script>

<style scoped>

</style>