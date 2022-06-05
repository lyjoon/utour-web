<template>
  <v-container>
    <product-list-toolbar ref="product_list_toolbar" />
    <product-list ref="product_list"/>
  </v-container>
</template>

<script>
import ProductListToolbar from "../../components/public/product/list/ProductListToolbar";
import ProductList from "../../components/public/product/list/ProductList";
import productApi from "@/api/ProductApi";
export default {
  name: "ProductPage",
  components: {ProductList, ProductListToolbar},
  data : ()=>({
    parameters: {
      continentCode: null,
      nationCode: null,
      areaCode: null
    },
  }),
  mounted() {
    let query = this.$route.query;
    Object.keys(this.parameters).forEach(key => {
      this.parameters[key] = query[key]
    });
    this.$refs.product_list_toolbar.bind(this.parameters);
    this.search();
  },
  methods:{
    search: function (){
      productApi.queryList(this.parameters ).then(res =>{
        let data = res.data;
        if(data && data.result) {
          this.$refs.product_list.bind(data);
        }
      })
    }
  }
}
</script>

<style scoped>
  ._container {
    border: 1px solid blue;
  }
</style>