<template>
  <div class="d-block">
    <v-card-title class="pa-0 ma-0 font-weight-regular subtitle-1">{{title}}</v-card-title>
    <v-card-text class="pa-0 ma-0 grey--text caption" v-if="description != ''">{{description}}</v-card-text>
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
</style>