<template>
  <div>
    <div class="d-flex flex-fill">
      <strong class="title">이미지등록</strong>
      <v-spacer />
      <v-btn elevation="0" color="grey" dark @click="addImageFile">
        <v-icon small class="mr-1">mdi-image-area</v-icon>
        사진등록
      </v-btn>
      <v-file-input ref="productImageFileInput"
                    :multiple="true"
                    @change="onChangeProductImageFileInput"
                    accept="image/png, image/jpeg, image/bmp"
                    filled rounded class="rounded d-none" />
    </div>

  </div>
</template>

<script>
export default {
  data: ()=>({
    productId:null,
    productImageList: [],
    productImageFile: null,
  }),
  methods: {
    addImageFile: function() {
      this.$refs.productImageFileInput.$refs.input.click();
    },
    onChangeProductImageFileInput: function(file) {
      this.productImageFile = file;
    }
  }
}
</script>

<style scoped>

</style>