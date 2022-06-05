<template>
  <v-container>
    <v-row dense>
      <v-col class="col-12" :order="toolbarOrder">
        <product-view-toolbar ref="product_view_toolbar" />
      </v-col>
      <v-col class="col-12 mb-8" :order="imageOrder">
        <product-view-image ref="product_view_image" />
      </v-col>
      <v-col class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" :order="inquiryOrder">
        <div class="pr-1">
          <div class="pb-2">
            <sub-title title="문의" />
          </div>
          <inquiry-form />
        </div>
      </v-col>
      <v-col class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" :order="contentOrder">
        <div>
          <div class="pb-2">
            <sub-title title="상품개요" />
          </div>
          <product-view-content ref="product_view_content" />
        </div>
      </v-col>
      <v-col class="col-12 mt-8" :order="viewComponentOrder">
        <product-view-components ref="product_view_components" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import InquiryForm from "../../components/public/inquiry/InquiryForm";
import ProductViewToolbar from "../../components/public/product/view/ProductViewToolbar";
import ProductViewImage from "../../components/public/product/view/ProductViewImage";
import ProductViewContent from "../../components/public/product/view/ProductViewContent";
import ProductViewComponents from "../../components/public/product/view/ProductViewComponents";
import productApi from "@/api/ProductApi";
import SubTitle from "@/components/common/SubTitle";
export default {
  components: {SubTitle, ProductViewComponents, ProductViewContent, InquiryForm, ProductViewImage, ProductViewToolbar},
  computed:{
    toolbarOrder() {
      switch (this.$vuetify.breakpoint.name) {
/*        case "xs":
        case "sm":
        case "md":
          return 1;*/
        default:
          return 1;
      }
    },
    imageOrder() {
      switch (this.$vuetify.breakpoint.name) {
        /*case "xs":
        case "sm":
        case "md":
          return 2;*/
        default:
          return 2;
      }
    },
    inquiryOrder() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
        case "md":
          return 9;
        default:
          return 3;
      }
    },
    contentOrder() {
      return 4;
    },
    viewComponentOrder() {
      return 5;
    }
  },
  data:()=>({
    product:null,
    productImageGroups:null,
    viewComponents:null,
  }),
  mounted() {
    let productId = this.$route.query.productId;
    productApi.get(productId).then(res => {
      if(res.data && res.data.result) {
        let result = res.data.result;
        this.product = result.product;
        this.productImageGroups = result.productImageGroups;
        this.viewComponents = result.viewComponents;

        this.bindToolbar();
        this.bindContent();
        this.bindImages();
        this.bindViewComponents();
      }
    })
  },
  methods:{
    bindToolbar: function(){
      let accommodation = this.viewComponents.find(item => item.viewComponentType == 'ACCOMMODATION');
      let toolbar = {
        title: this.product.title,
        description: this.product.description,
        productId : this.product.productId,
        nationCode: this.product.nationCode,
        areaCode: this.product.areaCode,
        nationName: this.product.nationName,
        areaName: this.product.areaName,
        accommodation: {
          address: accommodation.address,
          fax: accommodation.fax,
          contact: accommodation.contact,
          url: accommodation.url,
        }
      };
      this.$refs.product_view_toolbar.bind(toolbar);
    },
    bindContent: function(){
      let content = {
        productId : this.product.productId,
        content: this.product.content
      };

      this.$refs.product_view_content.bind(content);
    },
    bindImages: function(){
      let images = {
        productId: this.product.productId,
        productImages: []
      };

      if(this.productImageGroups && Array.isArray(this.productImageGroups)) {
        this.productImageGroups.forEach(groupItem => {
          let productImageGroupId = groupItem.productImageGroupId;
          if(groupItem && groupItem.productImages && Array.isArray(groupItem.productImages)) {
            groupItem.productImages.forEach(imageItem => {
              images.productImages.push({
                productId : images.productId,
                productImageGroupId: productImageGroupId,
                productImageId : imageItem.productImageId,
                productImageSrc : `/api/v1/product/image/${images.productId}/${productImageGroupId}/${imageItem.productImageId}`,
                title: imageItem.title,
                description: imageItem.description
              });
            });
          }
        })
      }

      this.$refs.product_view_image.bind(images);

    },
    bindViewComponents: function() {
      this.$refs.product_view_components.bind(this.viewComponents.filter(item => item.viewComponentType != "ACCOMMODATION"));
    }
  }
}
</script>

<style scoped>

</style>