<template>
  <div class="pl-1 pr-1">
    <div class="body-1 ">
      <toast-viewer class="product_viewer" ref="viewer"></toast-viewer>
    </div>
  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
export default {
  components: {ToastViewer},
  data:()=>({
    productId:null,
    content:null,
  }),
  methods: {
    bind: function(item) {
      this.productId = item.productId;
      this.content = item.content;
      this.$refs.viewer.setMarkdown(this.content || '-');
    }
  }
}
</script>

<style scoped>

</style>