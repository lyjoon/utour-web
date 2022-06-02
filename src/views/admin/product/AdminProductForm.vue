<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-title title="여행컨텐츠" :site-map="['관리', '여행컨텐츠']" :show-div="true"/>
      </div>

      <!-- 상품 기본개요 -->
      <div class="pa-4">
        <admin-product-form-base ref="admin_product_form_base" />
      </div>

    </v-card>

    <!-- 상품 이미지등록 -->
    <v-card class="mt-4" elevation="0" outlined>
      <div class="pa-4">
        <admin-product-form-image ref="admin_product_form_image" />
      </div>
    </v-card>

    <v-card :class="`mt-4 ${item.deleteYn ? 'd-none' : ''}`" v-for="(item, index) in viewComponents" :key="index" elevation="0" outlined >
      <div class="pa-4">
        <div class="pt-4 pb-2">
          <strong class="title">{{ componentMap[item.viewComponentType].title || '-' }}</strong>
        </div>
        <div class="mt-4">
          <component :is="componentMap[item.viewComponentType].componentName" :ref="`ref_view_component_${item.viewComponentType}_${index}`" v-bind="item"></component>
        </div>
      </div>
    </v-card>

    <!-- 화면구성요소 추가구성
    <div class="pt-4 pb-4">
      <div class="flex-fill d-flex justify-center">
        <v-btn dark color="blue darken-1" class="flex-fill" x-large elevation="0" @click="openViewAppender">
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>
          화면구성추가</v-btn>
      </div>
    </div>
    -->

    <admin-product-append-view-dialog ref="admin_product_append_view_dialog" @apply="applyViewAppender" />

    <!-- actions -->
    <div class="pt-6 pb-6">
      <div class="d-flex flex-fill">
        <v-btn color="blue darken-2" large dark elevation="0" @click="save">
          <v-icon small class="mr-1">mdi-content-save</v-icon> 저장
        </v-btn>

        <v-btn color="grey" large class="ml-4" dark elevation="0" @click="deleteProduct" v-if="isFind">
          <v-icon small class="mr-1">mdi-delete</v-icon> 삭제
        </v-btn>

        <v-spacer />

        <v-btn color="grey" large class="ml-4" dark elevation="0" @click="back">
          <v-icon small class="mr-1">mdi-format-list-bulleted</v-icon> 목록으로
        </v-btn>

      </div>
    </div>
  </v-container>
</template>

<script>
import AdminTitle from "@/components/common/title/AdminTitle";
import AdminProductFormBase from "@/components/admin/product/AdminProductFormBase";
import AdminProductFormImage from "@/components/admin/product/AdminProductFormImage";

import AdminProductAppendViewDialog from "@/components/admin/product/AdminProductFormViewComponentAppenderDialog";
import AdminProductFormViewComponentEditor from "@/components/admin/product/AdminProductFormViewComponentEditor"
import AdminProductFormViewComponentAccommodation from "@/components/admin/product/AdminProductFormViewComponentAccommodation"
import productApi from "@/api/ProductApi";

export default {
  components: {AdminProductFormImage, AdminProductFormBase, AdminTitle,AdminProductAppendViewDialog, AdminProductFormViewComponentEditor, AdminProductFormViewComponentAccommodation},
  data: ()=> ({
    componentMap: {
      EDITOR: {
        componentName : 'AdminProductFormViewComponentEditor',
        title: '에디터(markdown)',
      },
      ACCOMMODATION: {
        componentName : 'AdminProductFormViewComponentAccommodation',
        title: '숙소정보',
      }
    },
    product: null,
    productImageGroups: null,
    viewComponents: [],
  }),
  computed:{
    isFind(){
      return this.product && (this.product.productId || 0) > 0;
    }
  },
  mounted() {
    let productId = this.$route.query.productId;
    if(productId != undefined && productId != '') {
      productApi.get(productId).then(res => {
        this.product = res.data.result['product'];
        this.productImageGroups = res.data.result['productImageGroups'];
        this.viewComponents = res.data.result['viewComponents'];
        // console.log('asd', this.product);

        this.$refs.admin_product_form_base.bind(res.data.result['product']);
        this.$refs.admin_product_form_image.bind(res.data.result['productImageGroups']);
      });
    } else {
      this.viewComponents = [
        {viewComponentType:"ACCOMMODATION", viewComponentId:null, useYn:null, ordinalPosition:1},
        {viewComponentType:"EDITOR", viewComponentId:null, useYn:null, ordinalPosition:2}
      ];
    }
  },
  methods: {
    save: function() {
      let product = this.$refs.admin_product_form_base.getCommand();
      let productImageGroup = this.$refs.admin_product_form_image.getCommand();
      //let componentMap = {};
      let viewComponents = [];
      this.viewComponents.forEach((item, index) => {
        let refId = `ref_view_component_${item.viewComponentType}_${index}`;
        let refComponent = this.$refs[refId] ? this.$refs[refId][0] : null;
        if(refComponent && refComponent['getCommand']) {
          let refComponentCommand = refComponent.getCommand();
          // componentMap[item] = refObjectCommand;
          viewComponents.push(refComponentCommand);
        }
      });

      let repImageFile = product.file;
      let productImageFiles = productImageGroup.files;

      let commandCollect = {
        product: product.product,
        productImageGroupList: productImageGroup.productImageGroupList,
        viewComponents: viewComponents
      };

      console.log('product-save', commandCollect);

      if(this.isFind) {
        productApi.update(commandCollect, repImageFile, productImageFiles)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.$router.push(`/admin/product/list?page=1`);
            });
      } else {
        productApi.save(commandCollect, repImageFile, productImageFiles)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.$router.push(`/admin/product/list?page=1`);
            });
      }

    },
    openViewAppender: function(){
      this.$refs.admin_product_append_view_dialog.open(this.viewComponents);
    },
    applyViewAppender: function(item){
      this.viewComponents.push(item.value);
    },
    back: function() {
      this.$router.push(`/admin/product/list?page=1`);
    },
    deleteProduct: function(){
      let _this = this;
      this.$store.commit('confirm', {title:'안내', message:'확인을 누르면 해당 상품정보가 삭제됩니다.', callback: function(){
        productApi.delete(_this.product.productId).then(res=>{
          _this.back();
        })
        }});
    }
  }
}
</script>

<style scoped>

</style>