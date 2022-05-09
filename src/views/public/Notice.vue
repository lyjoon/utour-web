<template>
  <v-container>

    <page-title title="공지사항" :site-map="['공지사항']" />

    <router-view />

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