<template>
  <div class="pa-4 mb-4">
    <!-- 상품기본개요 -->
    <div>
      <admin-product-form-basic />
    </div>

  </div>

</template>

<script>

import AdminProductFormBasic from "@/components/admin/product/AdminProductFormBasic";
export default {
  mounted() {
    this.productId = this.$route.query.productId || this.$route.params.productId;
  },
  components:{AdminProductFormBasic},
  computed: {},
  methods: {},
  data: () =>({
    productId:null
  })
}
</script>

<style scoped>

</style>