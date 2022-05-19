<template>
  <v-form ref="frm">
    <div>
      <v-row>
        <v-col cols="12">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1">mdi-pencil</v-icon>상품명(필수)</div>
          <v-text-field dense placeholder="여행상품에 대한 제목을 입력해주세요." aria-required="true" label="상품명" filled rounded class="rounded" ></v-text-field>
        </v-col>

        <v-col :cols="col4">
          <v-select filled rounded class="rounded" placeholder="여행상품 유형을 선택해주세요" label="상품유형" disabled></v-select>
        </v-col>

        <v-col :cols="col4">
          <v-select filled rounded class="rounded" placeholder="여행국가를 지정해주세요." label="국가"></v-select>
        </v-col>
        <v-col :cols="col4">
          <v-select filled rounded class="rounded" placeholder="여행국가 지역을 선택해주세요." label="지역"></v-select>
        </v-col>

        <v-col :cols="col4">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1">mdi-image</v-icon>대표이미지</div>
          <div class="">
            <v-sheet width="100%" min-height="300px" height="100%" elevation="0" color="grey lighten-3" class="mx-auto align-center d-flex justify-center" rounded>
              <v-icon color="grey lighten-2" v-text="'mdi-image-plus'" size="100" @click="addRepImageSrc"></v-icon>
              <v-file-input ref="repImageFileInput"
                            @change="onChangeRepImageSrc"
                            :multiple="false"
                            accept="image/png, image/jpeg, image/bmp"
                            class="d-none" />
            </v-sheet>
          </div>
        </v-col>

        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1">mdi-text-box</v-icon>상품설명</div>
          <v-sheet :height="'500px'">
            <toast-editor ref="toast-editor"></toast-editor>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>

import ToastEditor from "@/components/common/ToastEditor";
export default {
  components:{ToastEditor},
  computed: {
    col4(){
      return this.$vuetify.breakpoint.smAndDown ? 12 : 4;
    }
  },
  data:() =>({
    command: {
      productId:null,
      productType:null,
      nationCode:null,
      areaCode:null,
      repImageSrc:null,
      title:null,
      content:null,
      writer:null,
      useYn:null,
    },
    repImageFile:null,
    repImageReaderSrc:null
  }),
  methods:{
    addRepImageSrc: function(){
      this.$refs.repImageFileInput.$refs.input.click();
    },
    onChangeRepImageSrc: function(file) {
      this.repImageFile = file;
      let reader  = new FileReader();
      let _this = this;
      reader.addEventListener("load", function (){
        _this.repImageReaderSrc = reader.result;
        console.log('reader.addEventListener.src', _this.repImageReaderSrc);
      }, false);

      if(file) {
        reader.readAsDataURL(this.repImageFile);
      }
    }
  }
}
</script>

<style scoped>

</style>