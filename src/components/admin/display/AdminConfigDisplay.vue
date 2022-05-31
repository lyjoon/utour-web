<template>
  <div class="pa-4">
    <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-image</v-icon>메인화면 캐로셀 등록</div>
    <v-row dense>
      <v-col cols="12">
        <v-sheet width="100%" :height="carouselHeight" color="grey lighten-3" rounded>
          <v-carousel height="100%" show-arrows-on-hover hide-delimiters>
            <v-carousel-item>a</v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
    </v-row>



    <div class="mt-4 grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-view-grid</v-icon>메인화면 커머스 등록</div>
    <v-row dense>
      <v-col v-for="(item, index) in commerces" :key="index" :cols="commerceCols">
        <v-img width="100%" :height="commerceItemHeight">
          <template v-slot:placeholder>
            <v-skeleton-loader type="image,image"></v-skeleton-loader>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data: ()=>({
    commerces:[
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      /*
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      */
    ]
  }),
  mounted() {
    this.search();
  },
  computed:{
    commerceCols(){
      return this.$vuetify.breakpoint.smAndDown ? 6 : 4;
    },
    carouselHeight(){
      let v;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          v = "47vh";
          break;
        case "md":
          v = "600px";
          break;
        case "lg":
          v = "700px";
          break;
        case "xl":
          v = "700px";
          break;
      }
      return v;
    },
    commerceItemHeight(){
      let v = 20;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          v = '20vh';
          break;
        case "sm":
          v = '24vh';
          break;
        case "md":
          v = '300px';
          break;
        default:
          v= '300px';
          break;
      }
      return v;
    }
  },
  methods: {
    search: function(){
    },
  }
}
</script>

<style scoped>
</style>