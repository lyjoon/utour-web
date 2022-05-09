<template>
  <v-container>
    <page-title title="Q&A" :site-map="['Q&A']" />
    <router-view />
  </v-container>
</template>
<script>

import PageTitle from "../../components/common/PageTitle";
export default {
  components: {PageTitle}
}
</script>

<style scoped>

</style>