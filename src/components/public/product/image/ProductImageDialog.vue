<template>
  <v-dialog  v-model="dialog" fullscreen class="fill-height">
    <v-card elevation="0" color="white" class="d-block">

      <v-toolbar elevation="0" class="pa-0">
        <v-container fluid>
          <div class="d-flex flex-fill align-center">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="close" color="#999999" outlined tile class="rounded toolbar-btn-outlined" small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-toolbar>

      <v-divider />

      <v-container >

        <div class="pt-2 pb-2">
          <v-chip-group column v-model="productImageGroupId" @change="chooseImageGroup">
            <v-chip outlined filter :value="-1">전체</v-chip>
            <v-chip outlined filter v-for="(item, index) in productImageGroupList" :key="index" :value="item.productImageGroupId">
              {{item.groupName}}
            </v-chip>
          </v-chip-group>
        </div>

        <div>
          <v-img class="grey lighten-2 rounded" :src="productImage.productImageSrc" width="100%" :height="imageHeight"></v-img>
        </div>

        <v-row class="mt-2" dense>
          <v-col :cols="$vuetify.breakpoint.smAndDown ?4:1" v-for="(item) in productImageList" :key="item.productImageId">

            <v-img :height="imageItemHeight" width="100%" class="rounded" :src="item.productImageSrc" @click="chooseImage(item)">
              <v-overlay absolute opacity="0.3" color="black" class="align-center justify-center flex-fill d-flex cursor-pointer"
                         v-if="productImage.productImageId == item.productImageId">
                <v-icon size="50px" color="white">mdi-check</v-icon>
              </v-overlay>
            </v-img>
          </v-col>
        </v-row>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed:{
    imageHeight() {
      switch (this.$vuetify.breakpoint.name){
        case "lg":
        case "xl":
          return '600px';
        case "md":
          return "450px";
        default:
          return "50vh";
      }
    },
    imageItemHeight() {
      switch (this.$vuetify.breakpoint.name){
        case "lg":
        case "xl":
          return '88px';
        case "md":
          return "22vh";
        case "sm":
          return "18vh";
        default:
          return "14vh";
      }
    }
  },
  data: () => ({
    dialog: false,
    productId:null,
    title:null,
    productImageList:[],
    productImageGroupList:[],
    productImageGroupId: null,
    productImage: {
      productId:null,
      productImageId:null,
      productImageGroupId:null,
      title:null,
      description:null,
      productImageSrc:null,
    },
  }),
  methods : {
    clear: function(){
      this.productId = null;
      this.productImageList = [];
      this.productImageGroupList = [];
      this.title = null;
      this.productImageGroupId = null;
      this.productImage = {
        productId:null,
        productImageId:null,
        productImageGroupId:null,
        title:null,
        description:null,
        productImageSrc:null,
      };
    },
    close : function (){
      this.dialog = false;
    },
    open: function(parameters) {
      if(parameters) {
        this.productId = parameters.productId;
        this.title = parameters.title;
        this.productImageGroupList = parameters.productImageGroupList;
        this.dialog = true;
        if(this.productImageGroupList.length > 0) {
          this.productImageGroupId = this.productImageGroupList[0].productImageGroupId;
        }
        this.chooseImageGroup()
      } else {
        this.$store.commit('snackMessage', {title:'안내', message:'여행상품 정보가 전달되지 않아 이미지 상세화면을 볼 수 없습니다.'})
        this.close();
      }
    },
    chooseImageGroup: function(){
      this.productImageList = [];
      if(this.productImageGroupId == -1) {
        this.productImageGroupList.forEach(imageGroupItem => {
          if(Array.isArray(imageGroupItem.productImages) && imageGroupItem.productImages.length > 0) {
            imageGroupItem.productImages.forEach(imageItem => {
              this.productImageList.push({
                productId: imageItem.productId,
                productImageGroupId: imageItem.productImageGroupId,
                productImageId: imageItem.productImageId,
                title: imageItem.title,
                description: imageItem.description,
                productImageSrc: `/api/v1/product/image/${imageItem.productId}/${imageItem.productImageGroupId}/${imageItem.productImageId}`,
              });
            });
            // this.productImage = this.productImageList[0];
          }
        })
      } else {
        let imageGroupItem = this.productImageGroupList.find(item => item.productImageGroupId == this.productImageGroupId);
        if(imageGroupItem) {
          // this.productImageList = imageGroupItem.productImageList;
          if(Array.isArray(imageGroupItem.productImages) && imageGroupItem.productImages.length > 0) {
            imageGroupItem.productImages.forEach(item => {
              this.productImageList.push({
                productId: item.productId,
                productImageGroupId: item.productImageGroupId,
                productImageId: item.productImageId,
                title: item.title,
                description: item.description,
                productImageSrc: `/api/v1/product/image/${item.productId}/${item.productImageGroupId}/${item.productImageId}`,
              });
            });
            // this.productImage = this.productImageList[0];
          }
        }
      }

      if(this.productImageList.length > 0) {
        let first = this.productImageList[0];
        this.productImage.productImageSrc = first.productImageSrc;
        this.productImage.productId = first.productId;
        this.productImage.productImageGroupId = first.productImageGroupId;
        this.productImage.productImageId = first.productImageId;
        this.productImage.title = first.title;
      }
    },
    chooseImage: function(item) {
      console.log('chooseImage', item);
      this.productImage.productId = item.productId;
      this.productImage.productImageId = item.productImageId;
      this.productImage.productImageGroupId = item.productImageGroupId;
      this.productImage.productImageSrc = item.productImageSrc;
      this.productImage.title = item.title;
      this.productImage.description = item.description;
    }
  }
}
</script>

<style scoped>
  .toolbar-btn-outlined {
    border: 1px solid #c8c8c8;
  }
</style>