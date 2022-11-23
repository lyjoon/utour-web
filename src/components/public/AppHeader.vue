<template>
  <v-app-bar dense :height="`54px`" elevation="0" app color="white" absolute class="app-bar-ext">
<!--    <template v-slot:img>
      <v-icon class="mx-auto align-center">mdi-menu</v-icon>
    </template>-->
    <template v-slot:default>
      <div class="flex-fill">
        <v-container class="justify-center d-flex flex-fill align-center pl-2 pr-2 pt-1 pb-1">
          <v-row no-gutters dense>
<!--            <v-col class="col-1 align-center d-flex">
              <v-icon color="secondary" @click.stop="openNavigator">mdi-menu</v-icon>
            </v-col>-->
            <v-col class="col-12 align-center d-flex justify-center">
              <router-link to="/home" ><img :src="require('@/assets/images/logo_c.png')" height="32px" /></router-link>
            </v-col>
<!--            <v-col class="col-1  align-center d-flex"></v-col>-->
          </v-row>
        </v-container>
      </div>
    </template>
    <template v-slot:extension >
      <div class="d-flex flex-fill menu_div" v-if="$vuetify.breakpoint.mdAndUp">
        <v-container class="pt-0 pb-0">
          <ul class="list-style-none d-flex flex-fill pl-0 app-bar-lg-menu">
            <li v-for="(item, index) in getMenuList" :class="`pa-3 ${item.active ? 'active':''}`" :key="index" @click="moveProduct(item)" v-text="item.arrivalName" />
          </ul>
        </v-container>
      </div>
      <v-container fluid class="pa-0 menu_div secondary" v-if="$vuetify.breakpoint.smAndDown" >
        <v-slide-group>
          <v-slide-item v-for="(item, index) in getMenuList" :key="index">
            <div class="pa-3 text-center body-2 white--text font-weight-bold" @click="moveProduct(item)">{{item.arrivalName}}</div>
          </v-slide-item>
        </v-slide-group>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
import codeApi from "@/api/CodeApi";

export default {
  name: "AppHeader",
  data: () =>({
    showNavigator: false,
    menuList: [],
    selectMenu:null
  }),
  mounted() {
    codeApi.getArrivalList().then(res => {
      if(Array.isArray(res.data)) {
        res.data.forEach(item => {
          this.menuList.push(
              {arrivalName: item.arrivalName, arrivalCode:item.arrivalCode,active:false}
          );
        })
      }
    });
  },
  computed:{
    getMenuList(){
      let query = this.$route.query;
      let arrivalCode = query.arrivalCode;
      let areaCode = query.areaCode;
      let arr = [];
      this.menuList.forEach(item => {
        arr.push({
          arrivalName:item.arrivalName,
          arrivalCode:item.arrivalCode,
          active: (arrivalCode || '') == (item.arrivalCode || '') && (areaCode || '') == (item.areaCode || '') ? true:false,
        })
      });
      return arr;
    }
  },
  methods: {
    openNavigator: function () {
      this.$emit('app-navigator-open');
    },
    moveProduct: function(item) {
      let parameters = {arrivalCode:item.arrivalCode, areaCode:item.areaCode};
      let entries = Object.entries(parameters || {});
      let queryString = entries && entries.length > 0 ? entries.map(e => e.join('=')).join('&') : '';
      this.$router.replace(`/product?${queryString}`).catch(e => {});
    }
  }
}
</script>

<style scoped>

  .menu_div {
    border-top: 1px solid #e6e7e5;
    border-bottom: 1px solid #e6e7e5;
  }

  .app-bar-lg-menu{
    margin: 0px;
    height: 100%;
  }

  .app-bar-lg-menu li {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
  }

  .app-bar-lg-menu li.active {
    font-weight: 600;
  }

  .app-bar-lg-menu li:hover {
    color: white;
    font-weight: 600;
    background-color: #ff7f00;
  }
</style>