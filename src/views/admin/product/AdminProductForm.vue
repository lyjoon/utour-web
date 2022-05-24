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

    <v-card class="mt-4" v-for="(item, index) in components" :key="index" elevation="0" outlined>
      <div class="pa-4">
        <div class="pt-4 pb-2">
          <strong class="title">{{ componentMap[item].title }}</strong>
        </div>
        <div class="mt-4">
          <component :is="componentMap[item].componentName" :ref="`ref_${item}_${index}`"></component>
        </div>
      </div>
    </v-card>

    <!-- 화면구성요소 추가구성 -->
    <div class="pt-4 pb-4">
      <div class="flex-fill d-flex justify-center">
        <v-btn dark color="blue darken-1" class="flex-fill" x-large elevation="0" @click="openViewAppender">
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>
          화면구성추가</v-btn>
      </div>
    </div>

    <admin-product-append-view-dialog ref="admin_product_append_view_dialog" @apply="applyViewAppender" />

    <!-- actions -->
    <div class="ma-6 d-flex justify-center">
      <v-btn color="blue darken-2" large dark elevation="0" @click="save">
        <v-icon small class="mr-1">mdi-content-save</v-icon> 저장
      </v-btn>

      <v-btn color="grey" large class="ml-4" dark elevation="0">
        <v-icon small class="mr-1">mdi-cancel</v-icon> 취소
      </v-btn>
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
  name: "AdminNoticeForm",
  components: {AdminProductFormImage, AdminProductFormBase, AdminTitle,AdminProductAppendViewDialog, AdminProductFormViewComponentEditor, AdminProductFormViewComponentAccommodation},
  data: ()=> ({
    components: [],
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
  }),
  methods: {
    save: function() {
      let product = this.$refs.admin_product_form_base.getCommand();
      let productImageGroup = this.$refs.admin_product_form_image.getCommand();
      let componentMap = {};
      this.components.forEach((item, index) => {
        let refId = `ref_${item}_${index}`;
        let _component = this.$refs[refId] ? this.$refs[refId][0] : null;
        if(_component && _component['getCommand']) {
          let refObjectCommand = _component.getCommand();
          componentMap[item] = refObjectCommand;
        }
      });

      let repImageFile = product.file;
      let productImageFiles = productImageGroup.files;

      let commandCollect = {
        product: product,
        productImageGroupList: productImageGroup.productImageGroupList,
        viewComponents: componentMap
      };

      productApi.save(commandCollect, repImageFile, productImageFiles).then(res => {
        console.log('product.store.response', res);
      });
    },
    openViewAppender: function(){
      this.$refs.admin_product_append_view_dialog.open(this.components);
    },
    applyViewAppender: function(item){
      this.components.push(item.value);
    }
  }
}
</script>

<style scoped>

</style>