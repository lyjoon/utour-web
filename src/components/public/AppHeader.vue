<template>
  <v-app-bar app absolute dark class="primary lighten-1" elevation="1" height="56px">
    <v-container>
       <v-img :src="require('@/assets/images/logo.png')" width="100" class="mx-auto" />
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
    drawer() {
      return true;
    }
  }
}
</script>

<style scoped>

</style>