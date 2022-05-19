<template>
  <div class="pa-4 mb-4">
    <!-- 상품기본개요 -->
    <div>
      <admin-product-basic />
    </div>

  </div>

</template>

<script>

import AdminProductBasic from "@/components/admin/product/AdminProductBasic";
export default {
  mounted() {
    this.productId = this.$route.query.productId || this.$route.params.productId;
  },
  components:{AdminProductBasic},
  computed: {},
  methods: {},
  data: () =>({
    productId:null
  })
}
</script>

<style scoped>

</style>