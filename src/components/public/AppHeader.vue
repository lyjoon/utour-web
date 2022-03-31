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
  <v-app-bar app dense fixed dark class="secondary lighten-1 app-header" elevation="1" >
    <v-app-bar-nav-icon class="hidden-lg-and-up"></v-app-bar-nav-icon>
    <v-toolbar-title class="mx-auto">
      <router-link to="/"><v-img :src="require('@/assets/images/logo.png')" width="100" class="mx-auto" /></router-link>
    </v-toolbar-title>
    <template v-slot:extension>
      <v-tabs grow>
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
        <v-tab>Tab 4</v-tab>
        <v-tab>Tab 5</v-tab>
        <v-tab>Tab 6</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>

</template>

<script>
export default {
  name: "AppHeader",
  computed : {
    drawer() {
      return false;
    }
  },
  data: () =>({
    showNavigator: false
  }),
  methods: {
    openNavigator: function () {
      this.$emit('app-navigator-open');
    }
  }
}
</script>

<style scoped>

</style>