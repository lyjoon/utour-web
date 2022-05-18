<template>
  <v-snackbar color="#039BE5"
              multi-line
              v-model="$store.state.ui.snackbar.flag">
    <v-card-text >{{$store.state.ui.snackbar.message}}</v-card-text>
    <template v-slot:action="{attrs}">
      <div style="margin: 0px 10px;">
        <v-btn
            v-bind="attrs"
            color="#4965ba"
            dark
            elevation="0"
            @click="$store.state.ui.snackbar.flag = false">
          CLOSE
        </v-btn>
      </div>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar"
}
</script>

<style scoped>
  .grey--text {
    color: #313131;
  }
</style>