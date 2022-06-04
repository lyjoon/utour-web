<template>
  <div>
    <v-row dense v-if="(results.length || 0) > 0">
      <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
             v-for="(item, index) in results" v-bind:key="index">
        <product-list-item :title="item.title" :description="item.description" :src="item.repImageSrc" />
      </v-col>
    </v-row>
    <div class="pa-16 d-flex justify-center align-center flex-fill body-2" v-if="(results.length || 0) < 1" v-text="'등록된 상품이 없습니다.'" />
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem";
export default {
  components: {ProductListItem},
  data : ()=>({
    results:[],
  }),
  methods: {
    bind: function(data){
      this.results = [];
      if(data && data.result && Array.isArray(data.result)) {
        data.result.forEach(item => {
          this.results.push({
            productId: item.productId,
            title: item.title,
            description: item.description,
            repImageSrc: `/api/v1/product/image/${item.productId}`,
          });
        })
      }
    }
  }
}
</script>

<style scoped>

</style>