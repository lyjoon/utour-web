<template>
  <v-card ref="itemCard" link elevation="0" outlined :to="`/product-view?productId=${productId}`" :height="height">
    <v-img
        height="100%"
        max-height="100%"
        dark eager
        class="white--text align-end"
        :src="src"
    >
      <template v-slot:default>
        <v-sheet dark translate="yes" color="rgba(0,0,0,0.48)">
          <div class="subtitle-1 text-truncate pl-2 pr-2 pt-1">
            {{title || '-'}}
          </div>
          <div class="body-2 text-truncate pl-2 pr-2">
            {{description || '-'}}
          </div>
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
          v = 22;
          break;
        case "md":
          v = 24;
          break;
        default:
          v= 20;
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