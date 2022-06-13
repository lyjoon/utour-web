<template>
  <v-card elevation="0" class="pt-5 pb-7 pl-5 pr-5 rounded-lg">
    <div class="title font-weight-bold">추천상품</div>
    <v-row class="mt-4" dense v-if="(commerces.length || 0) > 0">
      <v-col :cols="col2" v-for="(item, index) in commerces" v-bind:key="index">
        <product-item :title="item.title" :description="item.description" :src="item.repImageSrc" :product-id="item.productId" />
      </v-col>
    </v-row>
    <v-sheet v-if="(commerces.length || 0) < 1" height="300px" width="100%" class="d-flex justify-center align-center">
      <div class="text-center">
        <v-icon size="100" color="grey lighten-3">mdi-database-remove</v-icon>
        <div class="pt-4 body-2 grey--text text--lighten-1">등록된 추천상품이 없습니다.</div>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import ProductItem from "../product/list/ProductListItem";
import displayApi from "@/api/DisplayApi";
export default {
  name: "HomeProduct",
  components: {ProductItem},
  data : ()=>({
    commerces:[]
  }),
  computed:{
    col2(){
      return this.$vuetify.breakpoint.smAndDown ? 6 : 3;
    }
  },
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