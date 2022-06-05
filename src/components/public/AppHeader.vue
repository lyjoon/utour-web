<template>
  <v-app-bar elevation="0" height="80px" extension-height="60px" dense flat app absolute color="white">
    <template v-slot:default>
      <div class="flex-fill">
        <v-container class="justify-center d-flex flex-fill align-end pr-2 pl-2">
          <div style="width: 150px;">
            <v-btn icon color="secondary" v-if="$vuetify.breakpoint.mdAndDown" @click.stop="openNavigator">
              <v-icon dark>mdi-menu</v-icon>
            </v-btn>
          </div>
          <v-spacer />
          <router-link to="/home"><img :src="require('@/assets/images/logo_c.png')" width="94px" /></router-link>
          <v-spacer />
          <div style="width: 150px;" class="d-flex justify-end">
            <div class="caption font-weight-regular grey--text text--darken-2 pb-1 align-end" v-if="$vuetify.breakpoint.mdAndUp">
              <v-icon small color="grey1" class="mr-1">mdi-phone</v-icon>
              <span class="caption">
                상담 : <span class="font-weight-regular body-1 secondary--text">1688-0580</span>
              </span>
            </div>
          </div>
        </v-container>
      </div>
    </template>
    <template v-slot:extension>
      <div class="flex-fill fill-height d-flex align-center" style="border-top: 1px solid #e6e7e5;border-bottom: 1px solid #e6e7e5" >
        <v-container class="fill-height align-center body-2 pt-0 pb-0">
          <ul class="list-style-none d-flex flex-fill pl-0 app_bar_ext_ul app-header-ul">
            <li v-for="(item, index) in menuList" :class="item.active ? 'active':''" :key="index" @click="moveProduct(item)" v-text="item.text" />
          </ul>
        </v-container>
      </div>
    </template>
  </v-app-bar>

</template>

<script>
export default {
  name: "AppHeader",
  data: () =>({
    showNavigator: false,
    continentCode:null,
    nationCode:null,
    areaCode:null,
    menuList: [
      {text:'몰디브', continentCode: 'AS', nationCode:'MV',areaCode:null, active:false},
      {text:'칸쿤', continentCode: 'SA', nationCode:'MX',areaCode:'MV', active:false},
      {text:'하와이', continentCode: 'NA', nationCode:'US',areaCode:'HNL', active:false},
      {text:'유럽', continentCode: 'EU', nationCode:null,areaCode:null, active:false},
      {text:'베트남', continentCode: 'AS', nationCode:'VN',areaCode:null, active:false},
      {text:'태국', continentCode: 'AS', nationCode:'TH',areaCode:null, active:false},
    ]
  }),
  mounted() {
    let query = this.$route.query;
    this.continentCode = query.continentCode;
    this.nationCode = query.nationCode;
    this.areaCode = query.areaCode;
    this.menuList.forEach(item => {
      item.active = (this.continentCode || '') == (item.continentCode || '') && (this.nationCode || '') == (item.nationCode || '') && (this.areaCode || '') == (item.areaCode || '') ? true:false;
    })
  },
  methods: {
    openNavigator: function () {
      this.$emit('app-navigator-open');
    },
    moveProduct: function(item){
      let parameters = {continentCode:item.continentCode, nationCode:item.nationCode, areaCode:item.areaCode};
      let entries = Object.entries(parameters || {});
      let queryString = entries && entries.length > 0 ? entries.map(e => e.join('=')).join('&') : '';
      this.$router.replace(`/product?${queryString}`).catch(e => {});
    }
  }
}
</script>

<style scoped>
  .app-header-ul .active {
    color: #ff7f00;
  }

  .app-header-ul .active:hover {
    color: white;
  }
</style>