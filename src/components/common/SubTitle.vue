<template>
  <div>
    <div class="text-h6 font-weight-bold" v-text="title" />
    <div class="body-2 grey--text text--darken-2" v-if="!!description" v-text="description" style="line-height: 30px" />
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