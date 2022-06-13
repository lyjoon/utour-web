<template>
  <div>
    <v-sheet color="grey lighten-3" rounded width="100%"
             v-if="(carouselItems.length || 0) < 1"
             :height="height" elevation="0" outlined class="justify-center d-flex align-center">
      <v-icon size="90px" color="grey lighten-2">mdi-image</v-icon>
    </v-sheet>
    <v-carousel v-model="carouselItem" :height="height"
                class="align-center rounded"
                v-if="(carouselItems.length || 0) > 0"
                show-arrows-on-hover hide-delimiters>
      <v-carousel-item
          v-for="item in carouselItems"
          :key="item.id">
        <v-img :src="item.imageSrc" dark height="100%" class="align-end">
          <v-overlay absolute opacity="0.35" >
            <div class="text-center">
              <div class="title mb-2" v-text="item.title" />
              <v-chip :small="$vuetify.breakpoint.smAndDown"
                      color="white"
                      link
                      text-color="white"
                      outlined
                      @click="redirect(item)"
                      v-if="(item.linkUrl || '') != ''"
                      class="elevation-0 rounded caption">더보기</v-chip>
            </div>
          </v-overlay>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import displayApi from "@/api/DisplayApi";

export default {
  computed: {
    height (){
      let v;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          v = "38vh";
          break;
        case "md":
          v = "400px";
          break;
        case "lg":
        case "xl":
          v = "550px";
          break;
      }
      return v;
    },
  },
  mounted() {
    this.search()
  },
  data: ()=>({
    carouselItem:null,
    carouselItems: [],
  }),
  methods:{
    search: function(){
      let dateTime = new Date().getTime();
      displayApi.getCarousels().then(res => {
        let data = res.data;
        if(data && data.result && Array.isArray(data.result)) {
          this.carouselItems = [];
          // this.carouselItem = 0;
          data.result.forEach(item => {
            this.carouselItems.push({
              carouselId: item.carouselId,
              title: item.title,
              imageSrc: `/api/v1/display/carousel/${item.carouselId}?t=${dateTime}`,
              linkUrl: item.linkUrl,
            });
          })
        }
      })
    },
    redirect: function(item) {
      if(item.linkUrl.indexOf("http:") > -1 || item.linkUrl.indexOf("https:") > -1){
        window.open(item.linkUrl, '_blank');
      } else {
        window.open('http://' + item.linkUrl, '_blank');
      }
    }
  }
}
</script>

<style scoped>

</style>