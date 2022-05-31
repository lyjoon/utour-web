<template>
  <v-app-bar app flat absolute class="admin_app_bar">
    <template v-slot:default>
      <v-sheet dark width="100%" height="100%">
        <v-container class="justify-center d-flex flex-fill align-center fill-height pt-0 pb-0">
          <div class="d-flex justify-start" style="width: 100px;">
            <v-btn icon v-if="$store.getters.isAuthor">
              <v-icon dark>mdi-menu</v-icon>
            </v-btn>
          </div>
          <v-spacer />
          <img :src="require('@/assets/images/logo.png')" width="88px" />
          <v-spacer />
          <div style="width: 100px;" class="d-flex justify-end">
            <v-btn icon @click="logout" v-if="$store.getters.isAuthor">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-sheet>

    </template>
<!--    <v-container fluid>
      <div class="d-flex flex-fill align-center" v-if="$store.getters.isAuthor">
        &lt;!&ndash;
        <v-btn @click="moveHome">
          <v-icon large>mdi-home</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>

        <v-menu left >
          <template v-slot:activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on" dark icon large @click="showNavigator">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
        </v-menu>
        &ndash;&gt;
      </div>
      <div class="d-flex flex-fill justify-center" v-if="!$store.getters.isAuthor" >
        <div class="d-flex">
          <v-img :src="require('@/assets/images/logo.png')" width="100px" />
        </div>
      </div>
    </v-container>-->
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