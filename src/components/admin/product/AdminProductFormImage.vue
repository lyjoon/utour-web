<template>
  <div>
    <div class="pt-4 pb-2">
      <strong class="title">이미지등록</strong>
    </div>

    <div class="mt-4">
      <div class="mb-1 d-flex">
        <div class="d-flex flex-fill align-center">
          <div class="d-flex grey--text caption">
            <v-icon class="mr-1" color="grey" dark small>mdi-information-outline</v-icon>이미지 그룹을 등록 후, 개별 이미지파일 업로드가 가능합니다.
          </div>
          <div class="d-flex">
            <v-btn small elevation="0" color="grey" dark class="ml-2 pl-1 pr-2" @click="addImageGroup"><v-icon small class="mr-1">mdi-plus</v-icon> 신규그룹추가</v-btn>
            <v-btn small elevation="0" color="grey darken-1" class="ml-2 pl-1 pr-2" dark v-if="isSelectedProductImageGroup" @click="updateImageGroup"><v-icon small class="mr-1">mdi-pencil</v-icon> 그룹명수정</v-btn>
            <v-btn small elevation="0" color="grey darken-1" class="ml-2 pl-1 pr-2" dark v-if="isSelectedProductImageGroup" @click="deleteImageGroup"><v-icon small class="mr-1">mdi-cancel</v-icon> 그룹삭제</v-btn>
          </div>
        </div>
      </div>

      <div class="d-flex flex-fill align-center">
        <v-chip-group v-model="productImageGroupIdx" column active-class="blue--text text--blue--4">
          <v-chip v-for="(item, index) in productImageGroupList" :key="index" filter :value="index">{{item.groupName + ( item.productImages && item.productImages.length > 0 ? ` (${item.productImages.length})` : '')}}
          </v-chip>
        </v-chip-group>
      </div>

    </div>

    <v-divider class="mt-1 mb-4" />

    <div class="mt-4" v-if="isSelectedProductImageGroup">

      <div class="mb-2">

        <div class="d-flex flex-fill align-center">
          <v-btn small color="grey" dark elevation="0" @click="addImageFile"><v-icon small class="mr-1">mdi-image-area</v-icon> 이미지 등록</v-btn>
        </div>
      </div>

      <v-row dense>
        <v-col :cols="gridImageCols" v-for="(item, idx) in productImageGroupList[productImageGroupIdx].productImages" :key="idx">
          <v-img width="100%" :height="gridImageHeight" :src="item.imageSrc" class="rounded" @mouseenter="overlayProductImage(item, true)" @mouseleave="overlayProductImage(item, false)">
            <v-overlay absolute opacity="0.2"  v-if="item.checked" class="justify-end align-start elevation-0">
              <v-btn icon class="mr-1 mt-1" @click="deleteProductImage(item)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-overlay>
          </v-img>
        </v-col>
      </v-row>
    </div>

    <v-file-input ref="productImageFileInput"
                  :multiple="true"
                  @change="onChangeProductImageFileInput"
                  accept="image/png, image/jpeg, image/bmp"
                  :key="fileInputComponentKey"
                  filled rounded class="rounded d-none" />

    <admin-product-form-image-group-dialog ref="admin_product_form_image_group_dialog" @apply="applyImageGroup" />
  </div>
</template>

<script>
import AdminProductFormImageGroupDialog from "@/components/admin/product/AdminProductFormImageGroupDialog";
export default {
  components: {AdminProductFormImageGroupDialog},
  computed:{
    gridImageCols(){
      return this.$vuetify.breakpoint.smAndDown ? 6:3;
    },
    gridImageHeight(){
      return this.$vuetify.breakpoint.smAndDown ? 200:250;
    },
    isSelectedProductImageGroup(){
      let flag = (this.productImageGroupIdx == null || this.productImageGroupIdx == undefined ? -1 : this.productImageGroupIdx) > -1;
      return flag;
    }
  },
  data: ()=>({
    productId:null,
    productImageGroupList: [],
    productImageGroupIdx: null,
    fileInputComponentKey: 0
  }),
  methods: {
    addImageGroup: function(){
      this.$refs.admin_product_form_image_group_dialog.open();
    },
    updateImageGroup: function() {
      let item = this.productImageGroupList[this.productImageGroupIdx];
      if(item) {
        let params = {
          groupName : item.groupName,
          productImageGroupIdx : this.productImageGroupIdx,
        };
        this.$refs.admin_product_form_image_group_dialog.open(params);
      } else this.$refs.admin_product_form_image_group_dialog.open();
    },
    deleteImageGroup: function() {
      let targetIdx = this.productImageGroupIdx;
      this.productImageGroupList.splice(targetIdx, 1);
      this.productImageGroupIdx = null;
    },
    applyImageGroup: function(params) {

      let exists = false;
      if((params.productImageGroupIdx == undefined || params.productImageGroupIdx == null ? -1 : params.productImageGroupIdx) > -1) {
        let item = this.productImageGroupList[params.productImageGroupIdx];
        if(item) {
          item.groupName = params.groupName;
          exists = true;
        }
      }

      if(!exists) {
        let item = {
          productImageGroupId: null,
          groupName : params.groupName,
          productImages: [],
        };
        this.productImageGroupList.push(item);
      }
    },
    addImageFile: function() {
      this.$refs.productImageFileInput.$refs.input.click();
    },
    onChangeProductImageFileInput: function(file) {
      // this.productImageFile = file;
      let _this = this;

      file.forEach(_file => {
        let fileReader = new FileReader();
        fileReader.addEventListener("load", function () {
          let item = {
            imageSrc: null, description: null, productId:null, productImageId:null, productImageGroupId: null,
            checked:false, file: _file
          };
          item.imageSrc = fileReader.result;
          _this.productImageGroupList[_this.productImageGroupIdx].productImages.push(item);
        }, false);

        fileReader.readAsDataURL(_file);
      })
      this.fileInputComponentKey += 1;
    },
    deleteProductImage: function(item, index) {
      let productImages = this.productImageGroupList[this.productImageGroupIdx].productImages;
      if(productImages && productImages.length > 0) {
        productImages.splice(index, 1);
      }
    },
    overlayProductImage: function(item, flag) {
      item['checked'] = flag;
    },
    getCommand: function(){
      let productImageGroupList = [];
      let files = [];
      this.productImageGroupList.forEach(imageGroup => {

        let productImages = [];
        if(imageGroup.productImages && imageGroup.productImages.length > 0) {
          imageGroup.productImages.forEach(image => {
            let productImage = {
              productId: image['productId'] || null,
              productImageGroupId: image['productImageGroupId'] || null,
              productImageId: image['productImageId'] || null,
              imageSrc: image['productId'] ? image['imageSrc'] : null,
              description: image['description'] || null,
              originFileName: `${productImageGroupList.length}$` + image['file'].name
            };
            productImages.push(productImage);
            files.push(image['file']);
          });
        }

        let productImageGroup = {
          productImageGroupId: imageGroup.productImageGroupId,
          groupName : imageGroup.groupName,
          productImages: productImages,
        };
        productImageGroupList.push(productImageGroup);
      });

      return {productImageGroupList: productImageGroupList, files: files};
    },
    bind: function(productImageGroups){
      // console.log('product-form-image.bind', productImageGroups);
      if(productImageGroups && Array.isArray(productImageGroups) && (productImageGroups.length || 0 ) > 0) {
        this.productImageGroupList = [];
        productImageGroups.forEach(imageGroup => {
          let entry = {
            productImageGroupId: imageGroup.productImageGroupId,
            groupName : imageGroup.groupName,
            productImages: imageGroup.productImages,
          };
          this.productImageGroupList.push(entry);
        });
      }
    }
  }
}
</script>

<style scoped>

</style>