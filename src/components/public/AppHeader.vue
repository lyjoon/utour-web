<template>
  <v-app-bar elevation="0" height="80px" extension-height="60px" dense flat app absolute color="white">
    <template v-slot:default>
      <div class="flex-fill">
        <v-container class="justify-center d-flex flex-fill align-end">
          <div class="caption secondary--text">뭘넣을까</div>
          <v-spacer />
          <router-link to="/home"><img :src="require('@/assets/images/logo_c.png')" width="94px" /></router-link>
          <v-spacer />
          <div class="caption grey--text">연락처?</div>
        </v-container>
      </div>
    </template>
    <template v-slot:extension>
      <div class="flex-fill fill-height d-flex align-center" style="border-top: 1px solid #e6e7e5;border-bottom: 1px solid #e6e7e5" >
        <v-container class="fill-height align-center body-2 pt-0 pb-0">
          <ul class="list-style-none d-flex flex-fill pl-0 app_bar_ext_ul">
            <li>몰디브</li>
            <li>칸쿤</li>
            <li>하와이</li>
            <li>유럽</li>
            <li>베트남</li>
            <li>태국</li>
          </ul>
        </v-container>
      </div>
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