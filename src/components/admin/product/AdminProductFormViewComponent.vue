<template>
  <div>
    <div>
      <div class="d-flex flex-fill">
        <strong class="title">View Component</strong>
        <v-spacer />
        <v-btn color="grey" dark elevation="0" @click="openViewAppender">
          <v-icon small class="mr-1">mdi-shape-square-plus</v-icon> 요소추가
        </v-btn>
      </div>
    </div>
    <admin-product-append-view-dialog ref="admin_product_append_view_dialog" @apply="viewAppenderApply" />
  </div>
</template>

<script>
import AdminProductAppendViewDialog from "@/components/admin/product/AdminProductFormViewComponentAppenderDialog";
export default {
  components: {AdminProductAppendViewDialog},
  methods:{
    openViewAppender: function(){
      this.$refs.admin_product_append_view_dialog.open();
    },
    viewAppenderApply: function(item){
      console.log('viewAppenderApply', item);
    }
  }
}
</script>

<style scoped>

</style>