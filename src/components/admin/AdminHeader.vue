<template>
  <v-app-bar app fixed absolute dark class="gnb" dense>
    <v-container>
      <div class="font-montserrat-300 font-size-30 justify-center logo-text cursor-pointer">
        U-TOUR ADMIN
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AdminHeader"
}
</script>

<style scoped>
  .font-size-30 {
    font-size: 22px !important;
  }
</style>