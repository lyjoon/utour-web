<template>
  <v-overlay :opacity="0.75" v-model="$store.state.ui.alert.flag" :z-index="99999" color="white">
    <v-card elevation="3" color="#f1f1f1" min-width="300px" max-width="500px" outlined >
      <v-card-title v-if="!!$store.state.ui.alert.title" class="body-1" style="color: #333333">{{ $store.state.ui.alert.title }}</v-card-title>
      <v-card-text class="body-2" style="color: #333333">{{ $store.state.ui.alert.message || '-' }}</v-card-text>
      <v-card-actions >
        <div style="display: flex;width: 100%;justify-content: center">
          <v-btn elevation="0" color="#c8c8c8" style="color: #222222" @click="$store.commit('alertClose')">확인</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "alert",
}
</script>

<style scoped>

</style>