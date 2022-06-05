<template>
  <v-overlay :opacity="0.85" v-model="$store.state.ui.confirm.flag" :z-index="99999" color="white">
    <v-card elevation="0" color="#f4f4f4" min-width="300px" max-width="500px" >
      <v-card-title v-if="!!$store.state.ui.confirm.title" style="color: #333333">{{ $store.state.ui.confirm.title }}</v-card-title>
      <v-card-text style="font-weight: 500;color: #333333">{{ $store.state.ui.confirm.message || '-' }}</v-card-text>
      <v-card-actions >
        <div style="display: flex;width: 100%;justify-content: center;">
          <v-btn elevation="0" color="#c8c8c8" style="color: #222222;margin-right: 10px;" @click="$store.commit('confirmOk')">확인</v-btn>
          <v-btn elevation="0" color="#c8c8c8" style="color: #222222" @click="$store.commit('confirmCancel')">취소</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>