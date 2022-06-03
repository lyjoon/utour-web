<template>
  <v-row dense :no-gutters="$vuetify.breakpoint.smAndDown">
    <v-col class="col-12" >
      <v-sheet color="grey lighten-3" rounded width="100%"
               v-if="(carouselItems.length || 0) < 1"
               :height="height" elevation="0" outlined class="justify-center d-flex align-center">
        <v-icon size="90px" color="grey lighten-2">mdi-image</v-icon>
      </v-sheet>
      <v-carousel v-model="carouselItem" :height="height"
                  class="rounded align-center"
                  v-if="(carouselItems.length || 0) > 0"
                  show-arrows-on-hover hide-delimiters>
        <v-carousel-item
            v-for="item in carouselItems"
            :key="item.id">
          <v-img :src="item.imageSrc" dark height="100%" class="align-end">
            <v-overlay absolute opacity="0.15">
              <div class="text-center">
                <v-card-title class="text-h6 text-md-h5 text-lg-h5 text-xl-h4 font-weight-bold pb-2 pb-md-4 pb-lg-4 pb-xl-4 pl-2 pr-2" v-text="item.title" />
                <v-chip :small="$vuetify.breakpoint.smAndDown"
                        color="white"
                        link
                        text-color="white"
                        outlined
                        @click="redirect(item)"
                        v-if="(item.linkUrl || '') != ''"
                        class="elevation-0 rounded caption" style="opacity: 0.69">더보기</v-chip>
              </div>
            </v-overlay>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
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