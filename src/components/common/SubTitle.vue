<template>
  <div class="scope_title">
    <v-card-subtitle class="_subtitle">
      <div class="rounded secondary d-inline-block mr-3 mt-1" style="width: 5px; height: 16px;" ></div>
      <strong>{{title}}</strong>
    </v-card-subtitle>
    <v-card-text class="body-2 pl-4 grey--text mt-2 pr-0 pb-0 pt-0" >{{description || ''}}</v-card-text>
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
  .scope_title{}
  .scope_title ._subtitle {
    font-size: 20px;
    /*font-weight: 500;*/
    padding: 0px;
  }
  .scope_title ._caption {
    margin-top: 5px;
    padding: 0px;
    /*color: grey;
    font-size: 14px;
    font-weight: 400;*/
  }
</style>