<template>
  <div>
    <sub-title title="자주 찾는 상품" description="봉선생님께서 추천하는 여행상품" />
    <v-row no-gutters dense v-if="(commerces.length || 0) > 0">
      <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4" v-for="(item, index) in commerces" v-bind:key="index">
        <product-item :title="item.title" :description="item.description" :src="item.repImageSrc" />
      </v-col>
    </v-row>
    <div class="pa-16 d-flex justify-center flex-fill body-2" v-if="(commerces.length || 0) < 1" v-text="'등록된 상품이 없습니다.'" />
  </div>
</template>

<script>
import ProductItem from "../product/list/ProductListItem";
import SubTitle from "../../common/SubTitle";
import displayApi from "@/api/DisplayApi";
export default {
  name: "HomeProduct",
  components: {SubTitle, ProductItem},
  data : ()=>({
    commerces:[]
  }),
  mounted() {
    this.search();
  },
  methods:{
    search: function(){
      let dateTime = new Date().getTime();
      displayApi.getCommerces().then(res=>{
        let data = res.data;
        if(data && data.result && Array.isArray(data.result)) {
          this.commerces = [];
          data.result.forEach(item => {
            this.commerces.push({
              commerceId : item.commerceId,
              productId: item.productId,
              title: item.title,
              description : item.description,
              repImageSrc: `/api/v1/product/image/${item.productId}?t=${dateTime}`
            });
          });
        }

      })
    }
  }
}
</script>

<style scoped>

</style>