<template>
  <v-app-bar app fixed absolute dark class="gnb pa-0" dense>
    <v-container fluid>
      <div class="d-flex flex-fill align-center" v-if="$store.getters.isAuthor">
        <v-btn @click="moveHome">
          <v-icon large>mdi-home</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <!--
        <v-menu left >
          <template v-slot:activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on" dark icon large @click="showNavigator">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
        </v-menu>
        -->
      </div>
      <div class="d-flex flex-fill justify-center" v-if="!$store.getters.isAuthor" >
        <div class="d-flex">
          <v-img :src="require('@/assets/images/logo.png')" width="100px" />
        </div>
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
    },
    logout: function(){
      this.$store.commit('logout');
      this.$router.replace('/admin/login');
    }
  }
}
</script>

<style scoped>
  .font-size-30 {
    font-size: 22px !important;
  }
</style>