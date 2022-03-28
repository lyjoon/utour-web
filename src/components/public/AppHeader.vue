<template>
  <v-app-bar app fixed absolute dark class="secondary lighten-1 app-header" elevation="1" height="56px">
    <v-container fluid class="pa-0">
      <v-row no-gutters class="pa-0">
        <v-col cols="2">
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