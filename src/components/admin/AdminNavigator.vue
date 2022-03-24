<template>
  <v-navigation-drawer app
                       fixed
                       right
                       temporary
                       v-model="navigatorDrawer"
                       width="30vh"
                       color="grey"
                       class="lighten-3 elevation-0"
                       disable-resize-watcher>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () =>({
    navigatorDrawer : false
  }),
  methods: {
    showNavigator: function(){
      this.navigatorDrawer = !this.navigatorDrawer;
    }
  }
}
</script>

<style scoped>

</style>