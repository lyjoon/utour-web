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
            <v-btn class="v-btn-more" elevation="0" small dark @click="openDialog" :disabled="btnDisabled">더보기</v-btn>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <product-image-dialog ref="product_image_dialog" />
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
      return false;
    }
  },
  data: ()=>({
    productImages: [],
    productId:null,
    title:null,
    description:null,
    productImageGroupList: null,
  }),
  methods: {
    bind: function(parameters){
      this.productId = parameters.productId;
      this.title = parameters.title;
      this.description = parameters.description;
      this.productImageGroupList = parameters.productImageGroupList;
      this.productImages = [];

      if(this.productImageGroupList && Array.isArray(this.productImageGroupList)) {
        this.productImageGroupList.forEach(groupItem => {
          let productImageGroupId = groupItem.productImageGroupId;
          if(groupItem && groupItem.productImages && Array.isArray(groupItem.productImages)) {
            groupItem.productImages.forEach(imageItem => {
              this.productImages.push({
                productId : this.productId,
                productImageGroupId: productImageGroupId,
                productImageId : imageItem.productImageId,
                productImageSrc : `/api/v1/product/image/${this.productId}/${productImageGroupId}/${imageItem.productImageId}`,
                title: imageItem.title,
                description: imageItem.description
              });
            });
          }
        })
      }

    },
    openDialog : function (){
      let parameters = {
        productId: this.productId,
        title: this.title,
        description: this.description,
        productImageGroupList: this.productImageGroupList
      };
      this.$refs.product_image_dialog.open(parameters);
    },
    productImageSrc: function(idx) {
      return this.productImages.length > idx ? this.productImages[idx].productImageSrc : null;
    }
  }
}
</script>

<style scoped>
  .v-btn-more {
    font-weight: 400;
    opacity: 0.65;
  }
</style>