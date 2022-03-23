<template>
  <div class="page_title">
    <v-card-title class="_title">{{title}}</v-card-title>
    <v-card-text class="_caption" v-if="description != ''">{{description}}</v-card-text>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      default: "N/A"
    },
    description: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
  .page_title{margin: 5px 0px 10px 0px;}
  .page_title ._title {
    font-size: 24px;
    font-weight: 600;
    padding: 0px;
  }
  .page_title ._caption {
    margin-top: 5px;
    padding: 0px;
    color: grey;
  }
</style>