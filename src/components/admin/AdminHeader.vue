<template>
  <v-app-bar app fixed absolute dark class="gnb" dense>
    <v-container>
      <div class="font-montserrat-300 justify-center logo-text cursor-pointer">
        U-TOUR
      </div>

      <v-spacer />

      <!--
      <v-menu left bottom>
        <template v-slot:activator="{on, attr}">
          <v-btn v-bind="attr" v-on="on" icon @click="drawer=!drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
      </v-menu>
      -->
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AdminHeader"
}
</script>

<style scoped>

</style>