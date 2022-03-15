<template>

  <v-card link elevation="0" outlined to="/hotel">
    <v-img
        :height="imageHeight"
        dark
        class="white--text align-end"
        :src="src"
    >
      <template v-slot:default>
        <v-sheet dark translate="yes" color="rgba(0,0,0,0.41)">

          <v-card-title class="pt-2 pb-1 text-h6">
            {{title || 'N/A'}}
          </v-card-title>

          <v-card-text class="pt-1 pb-2 label">
            {{description || '-'}}
          </v-card-text>
        </v-sheet>
      </template>

      <template v-slot:placeholder>
        <v-sheet color="grey lighten-4"
                 class="fill-height">
          <v-skeleton-loader
              class="mx-auto"
              type="image"></v-skeleton-loader>
        </v-sheet>
      </template>
    </v-img>
  </v-card>

</template>

<script>
export default {
  name: "ProductListItem",
  computed: {
    imageHeight() {
      return 400 + 'px';
    }
  },

  props: {
    title: {
      default: null
    },description: {
      default: null
    },src: {
      default: null
    }
  },
}
</script>

<style scoped>

</style>