<template>
  <div class="scope_title">
    <v-card-subtitle class="_subtitle">{{title}}</v-card-subtitle>
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
  .scope_title{margin: 10px 0px 15px 0px;}
  .scope_title ._subtitle {
    font-size: 18px;
    font-weight: 600;
    padding: 0px;
  }
  .scope_title ._caption {
    margin-top: 5px;
    padding: 0px;
    color: grey;
    font-size: 14px;
    font-weight: 400;
  }
</style>