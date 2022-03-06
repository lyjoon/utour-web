<template>
  <v-app-bar app fixed absolute dark dense class="justify-center text-center flex">
    <v-container>
       <v-img :src="require('@/assets/images/logo.png')" width="85" />
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  computed : {
    /*logoSrc() {
      return require(`@/assets/images/logo.png`);
    }*/
  }
}
</script>

<style scoped>

</style>