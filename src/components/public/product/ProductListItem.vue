<template>
  <v-card link>
    <v-img :height="imageHeight + 'px'"
        src="https://t1.daumcdn.net/cfile/tistory/991C894F5E996B7B03" />
  </v-card>
</template>

<script>
export default {
  name: "ProductListItem",
  computed: {
    imageHeight() {
      return 300;
    }
  }
}
</script>

<style scoped>

</style>