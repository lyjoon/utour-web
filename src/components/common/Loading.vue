<template>
  <v-overlay opacity="0.5" color="#ffffff" absolute z-index="999" :value="$store.state.loadingStatus">
    <v-progress-circular
        indeterminate
        color="#ff7f00"
        size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style scoped>

</style>