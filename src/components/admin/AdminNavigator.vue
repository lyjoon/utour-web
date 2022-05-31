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

    <v-list nav dense>

      <v-list-item link href="/home">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>HOME</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-subheader class="text-truncate d-flex flex-fill">게시판</v-subheader>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="align-center">공지사항</v-list-item-title>
      </v-list-item>


    </v-list>

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