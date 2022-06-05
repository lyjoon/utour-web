<template>
  <div>
    <div style="position: relative" class="hidden-lg-and-up">
      <v-btn class="v-btn-more" elevation="0" style="position: absolute;right: 10px;bottom: 10px; width: 0px;z-index: 1;"
             @click="openDialog" :disabled="btnDisabled">더보기</v-btn>
      <v-carousel style="position: relative" :height="$vuetify.breakpoint.smAndDown ? '400px' : '450px'"
                  hide-delimiters show-arrows-on-hover>
        <v-carousel-item
            v-for="(item, index) in productImages"
            :key="index">
          <v-img :src="item.productImageSrc" dark height="100%" />
        </v-carousel-item>
      </v-carousel>
    </div>

    <v-row dense class="hidden-md-and-down">
      <v-col class="col-6">
        <v-img :src="productImageSrc(0)"
               :height="mainImageHeight" class="rounded">
          <template v-slot:placeholder>
            <v-sheet color="grey lighten-4" outlined width="100%" height="100%" class="justify-center d-flex align-center">
              <v-icon size="50px" color="grey lighten-2">mdi-image-off-outline</v-icon>
            </v-sheet>
          </template>
        </v-img>
      </v-col>

      <v-col class="col-3">
        <v-img :src="productImageSrc(1)"
               :height="subImageHeight" class="rounded">
          <template v-slot:placeholder>
            <v-sheet color="grey lighten-4" outlined width="100%" height="100%" class="justify-center d-flex align-center">
              <v-icon size="50px" color="grey lighten-2">mdi-image-off-outline</v-icon>
            </v-sheet>
          </template>
        </v-img>
        <v-img :src="productImageSrc(2)"
               class="mt-2 rounded"
               :height="subImageHeight">
          <template v-slot:placeholder>
            <v-sheet color="grey lighten-4" outlined width="100%" height="100%" class="justify-center d-flex align-center">
              <v-icon size="50px" color="grey lighten-2">mdi-image-off-outline</v-icon>
            </v-sheet>
          </template>
        </v-img>
      </v-col>
      <v-col class="col-3">
        <v-img :src="productImageSrc(3)"
               :height="subImageHeight"
               position="0 auto" class="rounded">
          <template v-slot:placeholder>
            <v-sheet color="grey lighten-4" outlined width="100%" height="100%" class="justify-center d-flex align-center">
              <v-icon size="50px" color="grey lighten-2">mdi-image-off-outline</v-icon>
            </v-sheet>
          </template>
        </v-img>
        <v-img :src="productImageSrc(4)"
               class="mt-2 align-end justify-end text-right pa-2 rounded"
               :height="subImageHeight"
               position="0 auto">
          <template v-slot:placeholder>
            <v-sheet color="grey lighten-4" outlined width="100%" height="100%" class="justify-center d-flex align-center">
              <v-icon size="50px" color="grey lighten-2">mdi-image-off-outline</v-icon>
            </v-sheet>
          </template>
          <template v-slot:default>
            <v-btn class="v-btn-more" elevation="0" dark @click="openDialog" :disabled="btnDisabled">더보기</v-btn>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <product-image-dialog ref="dialog" />
  </div>
</template>

<script>
import ProductImageDialog from "../image/ProductImageDialog";

export default {
  components: {ProductImageDialog},
  computed: {
    mainImageHeight() {
      return 510 + 'px';
    },
    subImageHeight() {
      return 250 + 'px';
    },
    btnDisabled(){
      return true;
    }
  },
  data: ()=>({
    images: [
        "https://s3.ap-northeast-2.amazonaws.com/stone-i-dagym-centers/images/gyms/15f8f9274132f60b1d/Big)Shingu.jpg"
      , "https://www.helssg.com/design/upload_file/BD268173/THUMBNAIL_1500_1500_c1222894c7a9e92e5720582b6dbfd55c_8407_3.jpeg"
      , "https://s3.ap-northeast-2.amazonaws.com/refreshclub/cache/50/b9/50b99ab60174ace81381a3ae6a7f457d.jpg"
      , "http://img3.tmon.kr/cdn3/deals/2019/04/24/1989097598/original_1989097598_front_0b1f9_1556091307production.jpg"
      , "https://s3.ap-northeast-2.amazonaws.com/refreshclub/cache/29/22/2922a6b683e0775427d1b30070428ac7.jpg"
    ],
    productId:null,
    productImages: [],
  }),
  methods: {
    bind: function(data){
      this.productId = data.productId;
      this.productImages = data.productImages;
    },
    openDialog : function (){
      this.$refs.dialog.open();
    },
    productImageSrc: function(idx) {
      return this.productImages.length > idx ? this.productImages[idx].productImageSrc : null;
    }
  }
}
</script>

<style scoped>
  .v-btn-more {
    opacity: 0.5;
    font-weight: 400;
  }
</style>