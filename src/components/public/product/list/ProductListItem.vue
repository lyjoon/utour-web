<template>
  <v-card ref="itemCard" link elevation="0" outlined :to="`/product-view?productId=${productId}`" :height="height">
    <v-img
        height="100%"
        max-height="100%"
        dark
        class="white--text align-end"
        :src="src"
    >
      <template v-slot:default>
        <v-sheet dark translate="yes" color="rgba(0,0,0,0.41)">

          <v-card-title class="body-2 text-md-subtitle-1 text-lg-subtitle-1 text-xl-subtitle-1 pb-0 pt-1 text-truncate">
            {{title || 'N/A'}}
          </v-card-title>

          <v-card-text class="caption text-md-body-2 text-lg-body-2 text-xl-body-2 pb-2 pt-1 text-truncate">
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
  computed: {
    height() {
      let v = 20;
      switch (this.$vuetify.breakpoint.name) {
        case "sm":
        case "xs":
          v = 26;
          break;
        case "md":
          v = 30;
          break;
        default:
          v= 29;
          break;
      }
      return v + 'vh';
    }
  },
  props: {
    title: {
      default: null
    },description: {
      default: null
    },src: {
      default: null
    },
    productId:{
      default: null,
    }
  }
}
</script>

<style scoped>

</style>