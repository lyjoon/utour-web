<template>
  <v-app-bar elevation="0" dense flat app absolute color="white">
    <template v-slot:default>
      <div class="flex-fill">
        <v-container class="justify-center d-flex flex-fill align-center pr-0 pl-0">
          <router-link to="/home"><img :src="require('@/assets/images/logo_c.png')" width="70px" /></router-link>
        </v-container>
      </div>
    </template>
    <template v-slot:extension>
      <div class="flex-fill fill-height d-flex align-center" style="border-top: 1px solid #e6e7e5;border-bottom: 1px solid #e6e7e5" >
        <v-container class="fill-height align-center body-2 align-center pa-0">
          <ul class="list-style-none d-flex flex-fill pl-0 app_bar_ext_ul app-header-ul">
            <li v-for="(item, index) in getMenuList" :class="item.active ? 'active':''" :key="index" @click="moveProduct(item)" v-text="item.arrivalName" />
          </ul>
        </v-container>
      </div>
    </template>
  </v-app-bar>

</template>

<script>
import codeApi from "@/api/CodeApi";

export default {
  name: "AppHeader",
  data: () =>({
    showNavigator: false,
    menuList: []
  }),
  mounted() {
    codeApi.getArrivalList().then(res => {
      if(Array.isArray(res.data)) {
        res.data.forEach(item => {
          this.menuList.push(
              {arrivalName: item.arrivalName, arrivalCode:item.arrivalCode,active:false}
          );
        })
      } else {
        this.menuList.push({arrivalName:'몰디브', arrivalCode:'MV',active:false});
        this.menuList.push({arrivalName:'칸쿤', arrivalCode:'CUN',active:false});
        this.menuList.push({arrivalName:'하와이', arrivalCode:'HNL',active:false});
        this.menuList.push({arrivalName:'유럽', arrivalCode:'EU', active:false});
        this.menuList.push({arrivalName:'베트남', arrivalCode:'VN', active:false});
        this.menuList.push({arrivalName:'태국', arrivalCode:'TH', active:false});
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
  .app-header-ul .active {
    color: #ff7f00;
  }

  .app-header-ul .active:hover {
    color: white;
  }
</style>