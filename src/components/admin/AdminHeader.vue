<template>
  <v-app-bar app fixed absolute dark class="gnb pa-0" dense>
    <v-container fluid>
      <div :class="`d-flex flex-fill ${ $store.getters.isAuthor ? 'justify-start':'justify-center' }`">
        <v-toolbar-title class="font-montserrat-300">
          <v-btn v-if="$store.getters.isAuthor" @click="moveHome">
            <v-icon large>mdi-home</v-icon>
          </v-btn>
          <v-img :src="require('@/assets/images/logo.png')" width="100" v-if="!$store.getters.isAuthor" />
        </v-toolbar-title>
        <!--
        <v-spacer />
        <v-menu left >
          <template v-slot:activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on" dark icon large @click="showNavigator">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
        </v-menu>
        -->
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    showNavigator: function () {
      this.$emit('admin-navigator-open');
    },
    moveHome : function(){
      this.$router.push('/admin/home');
    }
  }
}
</script>

<style scoped>
  .font-size-30 {
    font-size: 22px !important;
  }
</style>