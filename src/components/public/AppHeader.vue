<template>
  <!--
  <v-app-bar app dense fixed absolute dark class="secondary lighten-1 app-header" elevation="1" >
    <v-container fluid class="pa-0">
      <v-row no-gutters class="pa-0">
        <v-col cols="2" class="pa-0">
          <div class="d-flex flex-fill align-center">
            <v-menu fixed absolute right v-if="$vuetify.breakpoint.mdAndDown" class="ma-0">
              <template v-slot:activator="{on, attrs}">
                <v-btn large v-bind="attrs" v-on="on" dark icon @click="openNavigator">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="8">
          <div class="d-flex flex-fill align-center justify-center fill-height">
            <router-link to="/"><v-img :src="require('@/assets/images/logo.png')" width="100" class="mx-auto" /></router-link>
          </div>
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  -->
  <v-app-bar app dense absolute flat color="secondary" class="app-header" elevation="1" >
    <v-app-bar-nav-icon class="hidden-lg-and-up white--text" @click="openNavigator"></v-app-bar-nav-icon>
    <v-toolbar-title class="mx-auto pr-12 pr-lg-0 pr-xl-0 pt-4 pb-4">
      <router-link to="/"><v-img :src="require('@/assets/images/logo.png')" width="100" class="mx-auto" /></router-link>
    </v-toolbar-title>

    <template v-slot:extension>
<!--      <v-row v-touch="{left: () => swipe('left'), right: ()=> swipe('right')}" class="align-center flex-fill">-->
        <v-container class="pa-0">
          <v-tabs dark align-with-title hide-slider show-arrows grow background-color="secondary">
            <v-tab class="text-lg-subtitle-1 text-xl-subtitle-1">몰디브</v-tab>
            <v-tab class="text-lg-subtitle-1 text-xl-subtitle-1">하와이</v-tab>
            <v-tab class="text-lg-subtitle-1 text-xl-subtitle-1">칸쿤</v-tab>
            <v-tab class="text-lg-subtitle-1 text-xl-subtitle-1">유럽</v-tab>
            <v-tab class="text-lg-subtitle-1 text-xl-subtitle-1">베트남</v-tab>
            <v-tab class="text-lg-subtitle-1 text-xl-subtitle-1">기타</v-tab>
          </v-tabs>
        </v-container>
<!--      </v-row>-->
    </template>
  </v-app-bar>

</template>

<script>
export default {
  name: "AppHeader",
  computed : {
    drawer() {
      return false;
    },
  },
  data: () =>({
    showNavigator: false
  }),
  methods: {
    openNavigator: function () {
      this.$emit('app-navigator-open');
    },
    swipe: function(direction) {
      console.log('direction : ', direction);
    }
  }
}
</script>

<style scoped>

</style>