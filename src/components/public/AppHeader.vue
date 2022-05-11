<template>
  <v-app-bar elevation="0" dense flat>
    <template v-slot:extension class="pa-0">
      <div>아</div>
      <v-divider />
      <div>밑</div>
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