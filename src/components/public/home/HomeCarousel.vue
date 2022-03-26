<template>
  <v-row dense>
    <v-col class="col-12" >
      <v-carousel v-model="idx" :height="height"
                  class="rounded align-center"
                  show-arrows-on-hover hide-delimiters>
        <v-carousel-item
            v-for="item in items"
            :key="item.id">
          <template slot="default">
            <!--
            <v-parallax :src="item.src" dark height="100%" class="align-center">
              <v-overlay absolute opacity="0.15">
                <div class="text-center" style="opacity: 0.7">
                  <v-card-title class="display-1 font-montserrat-300">제목인가</v-card-title>
                  <v-chip :small="$vuetify.breakpoint.xsOnly"
                          color="white"
                          class="font-montserrat-300 text--secondary" link>
                    <strong class="mt-2 mb-2">MORE</strong>
                  </v-chip>
                </div>
              </v-overlay>
            </v-parallax>
            -->
            <v-img :src="item.src" dark height="100%" class="align-center">
              <v-overlay absolute opacity="0.15">
                <div class="text-center" style="opacity: 0.69">
                  <v-card-title class="display-1 font-montserrat-300">바다..</v-card-title>
                  <v-chip :small="$vuetify.breakpoint.smAndDown"
                          color="white"
                          class="font-montserrat-300 text--secondary text-caption"
                          link>
                    <span class="mt-2 mb-2 text-sm-caption text-caption">MORE</span>
                  </v-chip>
                </div>
              </v-overlay>
            </v-img>
          </template>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    height (){
      let v;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          v = "60vh";
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
  data: ()=>({
    idx:null,
    items: [
      {id:0,
        src:'https://blog.kakaocdn.net/dn/I9lzD/btq6UdLXBNH/akC3UQ9s6RiblD7a5jIKf1/img.jpg'
      }
    ],
  })
}
</script>

<style scoped>

</style>