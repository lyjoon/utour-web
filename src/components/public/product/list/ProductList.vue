<template>
  <div>
    <div v-for="(areaItem, areaIdx) in results" :key="areaIdx">
      <div class="title" v-text="areaItem.areaName || 'N/A'" ></div>
      <v-row dense>
        <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
               v-for="(item, index) in areaItem.results" v-bind:key="index">
          <product-list-item :title="item.title" :description="item.description" :src="item.repImageSrc" :product-id="item.productId" />
        </v-col>
      </v-row>
    </div>

    <div class="d-flex justify-center align-center flex-fill body-2" v-if="(results.length || 0) < 1" >
      <v-sheet height="100%" :min-height="$vuetify.breakpoint.lgAndUp ? '500px':'0'" width="100%" class="d-flex justify-center align-center">
        <div>
          <v-icon size="150" color="grey lighten-3">mdi-database-remove</v-icon>
          <div class="mt-8 body-2 grey--text">등록된 상품이 없습니다.</div>
        </div>
      </v-sheet>
    </div>
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

      if(Array.isArray(data)) {
        data.forEach( areaItem => {
          let results = areaItem.results;
          if(Array.isArray(results) && results.length > 0) {
            let _area = {
              areaCode : areaItem.areaCode,
              areaName : areaItem.areaName,
              arrivalCode : areaItem.arrivalCode,
              results : results.map(product => {
                product['repImageSrc'] = `/api/v1/product/image/${product.productId}`;
                return product;
              })
            };
            this.results.push(_area);
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>