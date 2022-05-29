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
          <component :is="componentMap[item].componentName" :ref="`vw_${item}_${index}`" v-bind="bind(item, index)"></component>
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
    <div class="ma-6 d-flex justify-center">
      <v-btn color="blue darken-2" large dark elevation="0" @click="save">
        <v-icon small class="mr-1">mdi-content-save</v-icon> 저장
      </v-btn>

      <v-btn color="grey" large class="ml-4" dark elevation="0" @click="back">
        <v-icon small class="mr-1">mdi-format-list-bulleted</v-icon> 목록으로
      </v-btn>

      <v-btn color="grey" large class="ml-4" dark elevation="0" @click="deleteProduct" v-if="isFind">
        <v-icon small class="mr-1">mdi-delete</v-icon> 삭제
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
  components: {AdminProductFormImage, AdminProductFormBase, AdminTitle,AdminProductAppendViewDialog, AdminProductFormViewComponentEditor, AdminProductFormViewComponentAccommodation},
  data: ()=> ({
    components: ["ACCOMMODATION", "EDITOR"],
    //components: [],
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
    viewComponents: null,
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
        if(this.viewComponents) {
          Object.keys(this.viewComponents).forEach((key) => {
            this.components.push(key);
          })
        }
      });
    }
  },
  methods: {
    save: function() {
      let product = this.$refs.admin_product_form_base.getCommand();
      let productImageGroup = this.$refs.admin_product_form_image.getCommand();
      let componentMap = {};
      this.components.forEach((item, index) => {
        let refId = `vw_${item}_${index}`;
        let _component = this.$refs[refId] ? this.$refs[refId][0] : null;
        if(_component && _component['getCommand']) {
          let refObjectCommand = _component.getCommand();
          componentMap[item] = refObjectCommand;
        }
      });

      let repImageFile = product.file;
      let productImageFiles = productImageGroup.files;

      let commandCollect = {
        product: product.product,
        productImageGroupList: productImageGroup.productImageGroupList,
        viewComponents: componentMap
      };

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
      this.$refs.admin_product_append_view_dialog.open(this.components);
    },
    applyViewAppender: function(item){
      this.components.push(item.value);
    },
    back: function() {
      this.$router.push(`/admin/product/list?page=1`);
    },
    bind: function(item, index){
      if(this.viewComponents) {
        let keys = Object.keys(this.viewComponents);
        let key = keys[index]
        return this.viewComponents[key];
      }
    },
    deleteProduct: function(){
      let _this = this;
      this.$store.commit('confirm', {title:'안내', message:'확인을 누르면 해당 상품정보가 삭제됩니다.', callback: function(){
        // console.log('this.product', this.product);
          // eslint-disable-next-line no-unused-vars
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