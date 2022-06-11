<template>
  <div>
    <sub-title title="추천상품" />
    <v-row no-gutters dense v-if="(commerces.length || 0) > 0">
      <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4" v-for="(item, index) in commerces" v-bind:key="index">
        <product-item :title="item.title" :description="item.description" :src="item.repImageSrc" :product-id="item.productId" />
      </v-col>
    </v-row>
    <v-sheet v-if="(commerces.length || 0) < 1" height="300px" width="100%" class="d-flex justify-center align-center">
      <div class="text-center">
        <v-icon size="100" color="grey lighten-3">mdi-database-remove</v-icon>
        <div class="pt-4 body-2 grey--text text--lighten-1">등록된 추천상품이 없습니다.</div>
      </div>
    </v-sheet>
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