<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'pa-0':''">
    <v-card class="pa-4 rounded-lg" rounded elevation="0">
      <page-title title="공지사항" :site-map="['공지사항']" />

      <router-view />
    </v-card>

  </v-container>
</template>

<script>

import PageTitle from "../../components/common/title/PageTitle";
export default {
  components: {PageTitle}
}
</script>

<style scoped>
</style>