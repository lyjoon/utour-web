<template>

  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-view-header :title="title" :site-map="['설정', siteMapDesc]" :show-div="false"/>
      </div>

      <div class="pa-4">

        <div class="pb-1 d-flex align-center">
          <div class="d-flex align-center body-2">
            <v-icon class="mr-1" small>mdi-image</v-icon> 케로셀(슬라이드) 관리
          </div>
          <v-spacer />
          <div>
            <v-btn small elevation="0" color="grey" icon dark @click="searchCarousel">
              <v-icon dark class="mr-1">mdi-refresh</v-icon>
            </v-btn>
          </div>
        </div>

        <v-row dense>
          <v-col cols="12">
            <v-sheet width="100%" :height="carouselHeight" color="grey lighten-3" rounded>
              <v-carousel height="100%" show-arrows-on-hover hide-delimiters>
                <v-sheet width="100%" height="100%" color="grey lighten-3" class="d-flex justify-center align-center" v-if="carouselList == null || carouselList.length < 1">
                  <v-icon size="50px" color="grey lighten-1">mdi-image-off-outline</v-icon>
                </v-sheet>
                <v-carousel-item v-for="(item, index) in carouselList"
                                 :key="index">
                  <v-img :src="item.imageSrc" dark height="100%" class="align-end">
                    <v-overlay absolute opacity="0.15">
                      <div class="text-center">
                        <v-card-title class="text-h6 text-md-h5 text-lg-h5 text-xl-h4 font-weight-bold pb-2 pb-md-4 pb-lg-4 pb-xl-4 pl-2 pr-2">
                          {{ item.title }}</v-card-title>
                        <v-chip :small="$vuetify.breakpoint.smAndDown"
                                color="white"
                                link
                                text-color="black"
                                class="elevation-0 rounded caption" style="opacity: 0.8" @click="updateCarousel(item)">더보기</v-chip>
                      </div>
                    </v-overlay>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
            </v-sheet>
            <div class="d-flex justify-end flex-fill mt-2">
              <v-btn small color="blue" elevation="0" class="white--text" @click="addCarousel">
                <v-icon small class="mr-1">mdi-image-plus</v-icon>
                케로셀 신규추가</v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <v-card width="100%" elevation="0" outlined class="mt-4">
      <div class="pa-4 mt-4 mb-2">

        <div class="pb-1 d-flex align-center">
          <div class="d-flex align-center body-2">
            <v-icon class="mr-1" small >mdi-view-grid</v-icon> 커머스(상품) 목록
          </div>
          <v-spacer />
          <div>
            <v-btn small elevation="0" color="grey" icon dark @click="searchCommerce">
              <v-icon dark class="mr-1">mdi-refresh</v-icon>
            </v-btn>
          </div>
        </div>

        <v-row dense>
          <v-col v-for="(item, index) in commerces" :key="index" :cols="commerceCols">
            <v-hover v-slot="{hover}">
              <v-img width="100%" :height="commerceItemHeight" :src="item.repImageSrc" class="rounded white--text align-end">
                <template v-slot:placeholder>
                  <v-sheet width="100%" height="100%" color="grey lighten-3" class="d-flex justify-center align-center">
                    <v-icon size="50px" color="grey lighten-1">mdi-image-off-outline</v-icon>
                  </v-sheet>
                </template>
                <template v-slot:default>


                  <v-sheet dark translate="yes" color="rgba(0,0,0,0.41)" v-if="(item.productId || 0) > 0">
                    <v-card-title class="body-2 text-md-subtitle-1 text-lg-subtitle-1 text-xl-subtitle-1 pb-0 pt-1 text-truncate">
                      {{item.title || 'N/A'}}
                    </v-card-title>

                    <v-card-text class="caption text-md-body-2 text-lg-body-2 text-xl-body-2 pb-2 pt-1 text-truncate">
                      {{item.description || '-'}}
                    </v-card-text>
                  </v-sheet>

                  <v-overlay absolute opacity="0.2" v-if="hover" class="d-flex flex-fill fill-height justify-center align-center">

                    <div v-if="(item.commerceId || 0) < 1">
                      <v-btn color="blue" large dark elevation="0" @click.stop="addCommerce(index)"><v-icon class="mr-1">mdi-image-plus</v-icon> 상품등록</v-btn>
                    </div>
                    <div v-if="(item.commerceId || 0) > 0">
                      <v-btn icon color="white" large dark elevation="0">
                        <v-icon x-large @click="readCommerce(item)">mdi-cog</v-icon>
                      </v-btn>
                    </div>

                  </v-overlay>
                </template>
              </v-img>
            </v-hover>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <admin-display-commerce-dialog ref="admin_display_commerce_dialog" @complete="searchCommerce" />
    <admin-display-carousel-dialog ref="admin_display_carousel_dialog" @complete="searchCarousel" />

  </v-container>

</template>

<script>

import AdminViewHeader from "@/components/common/title/AdminTitle";
import AdminDisplayCommerceDialog from "@/components/admin/display/AdminDisplayCommerceDialog";
import AdminDisplayCarouselDialog from "@/components/admin/display/AdminDisplayCarouselDialog";
import displayApi from "@/api/DisplayApi";

export default {
  components: {AdminDisplayCarouselDialog, AdminDisplayCommerceDialog, AdminViewHeader},
  data: ()=>({
    title: '-',
    siteMapDesc: '-',
    carouselList: [],
    commerces:[
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      {commerceId:null, repImageSrc:null, productId:null, ordinalPosition:null, title:null, description:null},
      /*
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      {commerceId:null, imageSrc:null, productId:null, ordinalPosition:null},
      */
    ]
  }),
  mounted() {
    this.title = this.$route.meta['title'] || '-';
    this.siteMapDesc = this.$route.meta['siteMap'] || '-';
    this.searchCarousel();
    this.searchCommerce();
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
          v = "45vh";
          break;
        case "md":
          v = "550px";
          break;
        case "lg":
          v = "600px";
          break;
        case "xl":
          v = "600px";
          break;
      }
      return v;
    },
    commerceItemHeight(){
      let v = 20;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          v = '18vh';
          break;
        case "sm":
          v = '20vh';
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
    searchCarousel: function(){
      this.carouselList = [];
      displayApi.getCarousels().then(res=> {
        let data = res.data;
        let dateTime = new Date().getTime();
        if(data && data.result && Array.isArray(data.result)) {
          // this.carouselList
          data.result.forEach(item =>{
            this.carouselList.push({
              carouselId: item.carouselId,
              imageSrc: `/api/v1/display/carousel/${item.carouselId}?t=${dateTime}`,
              title: item.title,
              ordinalPosition: item.ordinalPosition,
              linkUrl: item.linkUrl
            });
          })
        }
      })
    },
    searchCommerce: function(){
      let dateTime = new Date().getTime();
      displayApi.getCommerces().then(res => {
        let data = res.data;

        if(data && data.result && Array.isArray(res.data.result)) {
          let results = res.data.result;
          for(let idx = 0; idx < this.commerces.length; idx += 1) {
            let commerce = this.commerces[idx];
            let findItem = results.find((item, index) => (item.ordinalPosition || index) == idx);
            if(findItem && (findItem.commerceId || 0) > 0 ) {
              commerce.repImageSrc = findItem.repImageSrc + `?t=${dateTime}`;
              commerce.commerceId = findItem.commerceId;
              commerce.productId = findItem.productId;
              commerce.title = findItem.title;
              commerce.description = findItem.description;
            } else {
              commerce.repImageSrc = null;
              commerce.commerceId = null;
              commerce.productId = null;
              commerce.title = null;
              commerce.description = null;
            }
          }

        }
      })
    },
    addCarousel: function() {
      this.$refs.admin_display_carousel_dialog.open();
    },
    updateCarousel: function(item){
      this.$refs.admin_display_carousel_dialog.open(item);
    },
    addCommerce: function(index){
      let params = {
        ordinalPosition: index
      };
      this.$refs.admin_display_commerce_dialog.open(params);
    },
    readCommerce: function(item){
      this.$refs.admin_display_commerce_dialog.open(item);
    }
  }
}
</script>

<style scoped>
</style>