<template>
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
              <v-card-title class="display-1 font-montserrat-300">제목인가</v-card-title>
              <v-chip :small="$vuetify.breakpoint.xsOnly"
                      color="white"
                      class="font-montserrat-300 text--secondary body-2" link>
                <span class="mt-2 mb-2">MORE</span>
              </v-chip>
            </div>
          </v-overlay>
        </v-img>
      </template>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  computed: {
    height (){
      let v;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          v = "35vh";
          break;
        case "sm":
          v = "40vh";
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