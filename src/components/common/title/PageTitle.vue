<template>

  <div>
    <div class="d-flex flex-fill pt-6 pb-6">
      <div class="d-flex">
        <h1 :class="`${$vuetify.breakpoint.smAndDown ? 'font-weight-regular text-h6' : 'font-weight-bold text-h5'}`">{{ title }}</h1>
      </div>
      <v-spacer />
      <div class="d-flex align-end">
        <v-icon color="grey lighten-1" @click="$router.push('/home')" >mdi-home</v-icon>
        <template v-for="(item, index) in siteMap">
          <span :key="index" class="align-end">
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            <span class="grey--text body-2">{{ item }}</span>
          </span>
        </template>
      </div>
    </div>
    <v-divider v-if="showDiv" />
  </div>

</template>

<script>
export default {
  props:{
    title: {
      type: String,
      default: "-"
    },
    siteMap :{
      type: Array,
    },
    showDiv: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>