<template>
  <div>
    <div class="d-flex flex-fill">
      <strong class="title">이미지등록</strong>
      <v-spacer />
      <!--
      <v-btn elevation="0" color="grey" dark @click="addImageFile">
        <v-icon small class="mr-1">mdi-image-area</v-icon>
        사진등록-TEST
      </v-btn>
      -->
      <v-file-input ref="productImageFileInput"
                    :multiple="true"
                    @change="onChangeProductImageFileInput"
                    accept="image/png, image/jpeg, image/bmp"
                    filled rounded class="rounded d-none" />
    </div>

    <div class="mt-4">
      <div class="mb-1">
        <div class="d-flex flex-fill align-center">
          <div class="grey--text caption">
            <v-icon class="mr-1" color="grey lighten-1" small>mdi-information-outline</v-icon>그룹명을 등록,선택한 뒤 이미지(사진) 업로드가 가능합니다.</div>
          <v-btn small elevation="0" color="grey" class="ml-2 pl-1 pr-2" dark><v-icon small class="mr-1">mdi-plus</v-icon> 그룹추가</v-btn>
        </div>
      </div>

      <div class="d-flex flex-fill align-center">
        <v-chip-group v-model="selectedChip" column active-class="blue--text text--blue--4">
          <v-chip value="1" filter>기본방</v-chip>
          <v-chip value="2" filter>업그레이드</v-chip>
        </v-chip-group>
      </div>



    </div>
    <v-divider class="mt-1 mb-4" />

    <div class="mt-4" v-if="selectedChip">

      <div class="mb-2">
        <v-btn small color="grey" dark elevation="0" @click="addImageFile"><v-icon small class="mr-1">mdi-image-area</v-icon> 이미지 등록</v-btn>
      </div>

      <v-row dense>
        <v-col :cols="gridImageCols" v-for="(item, idx) in productImageList" :key="idx">
          <v-img width="100%" :height="gridImageHeight" :src="item.imageSrc" class="rounded" @mouseenter="chooseItem(item)" @mouseleave="deselectItem(item)">
            <v-overlay absolute opacity="0.2"  v-if="item.checked" class="justify-end align-start elevation-0">
              <v-btn icon class="mr-1 mt-1">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-overlay>
          </v-img>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
export default {
  computed:{
    gridImageCols(){
      return this.$vuetify.breakpoint.smAndDown ? 6:3;
    },
    gridImageHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 200:250;
    }
  },
  data: ()=>({
    productId:null,
    productImageList: [],
    productImageFile: null,
    selectedChip:null,
  }),
  methods: {
    addImageFile: function() {
      this.$refs.productImageFileInput.$refs.input.click();
    },
    onChangeProductImageFileInput: function(file) {
      this.productImageFile = file;
      // {imageSrc: null, description: null, productId:null, productImageId:null, productImageGroupId:null};
      let _this = this;

      this.productImageFile.forEach(_file => {
        let fileReader  = new FileReader();
        fileReader.addEventListener("load", function () {
          let item = {imageSrc: null, description: null, productId:null, productImageId:null, productImageGroupId:null, checked:false};
          item.imageSrc = fileReader.result;
          _this.productImageList.push(item);
        }, false);

        fileReader.readAsDataURL(_file);
      })
    },
    chooseItem: function(item) {
      item['checked'] = true;
    },
    deselectItem: function(item) {
      item['checked'] = false;
    }
  }
}
</script>

<style scoped>

</style>