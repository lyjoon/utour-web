<template>
  <v-snackbar color="#333333"
              dark multi-line
              vertical
              right
              v-model="$store.state.ui.snackbar.flag">
    {{$store.state.ui.snackbar.message}}
    <template v-slot:action="{attrs}">
      <div class="pa-4">
        <v-btn
            color="#e59609"
            text
            v-bind="attrs"
            @click="$store.state.ui.snackbar.flag = false">
          닫기
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

</style>