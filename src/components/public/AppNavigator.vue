<template>
  <v-navigation-drawer color="grey lighten-4"
                       class="elevation-8"
                       width="300px"
                       fixed
                       v-model="navigatorDrawer"
                       disable-resize-watcher
                       disable-route-watcher
                       >

    <v-list nav dense>

      <v-list-item link @click="navigatorDrawer = !navigatorDrawer">
          <v-list-item-icon>
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>
          <v-list-item-title>메뉴닫기</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-item link to="/notice/list">
        <v-list-item-icon>
          <v-icon>mdi-information-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>공지사항</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/qna/list">
        <v-list-item-icon>
          <v-icon>mdi-comment-question-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          질문과 답변
        </v-list-item-title>
      </v-list-item>


      <v-divider class="mt-2 mb-2 mx-auto" />


      <v-list-item link @click="showInquiry">
        <v-list-item-icon>
          <v-icon>mdi-file-document-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>견적문의</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="showServiceTerms">
        <v-list-item-icon>
          <v-icon>mdi-airplane-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-title>여행약관</v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2 mx-auto" />

      <v-list-group prepend-icon="mdi-island">
        <template v-slot:activator>

          <v-list-item-content>
            <v-list-item-title>여행목적지</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item-content class="pa-1">
          <v-chip-group column class="pl-2" v-model="selectedArrivalCode">
            <v-chip filter outlined small color="grey darken-1" v-for="(item, index) in arrivalList" :key="index" :value="item.arrivalCode" @click="moveProduct(item.arrivalCode)">
              {{item.arrivalName}}
            </v-chip>
          </v-chip-group>
        </v-list-item-content>

      </v-list-group>
      <v-divider class="mt-2 mb-2 mx-auto" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import codeApi from "@/api/CodeApi";

export default {
  name: "AppNavigator",
  data: ()=>({
    navigatorDrawer: false,
    arrivalList:[],
    selectedArrivalCode:null
  }),
  mounted() {

    codeApi.getArrivalList().then(res=> {
      if(Array.isArray(res.data)) {
        this.arrivalList = [];
        res.data.forEach(arrival => {
          let item = {
            arrivalCode:arrival.arrivalCode,
            arrivalName:arrival.arrivalName,
            areaList:[]
          };
          this.arrivalList.push(item);
          codeApi.getAreaList({arrivalCode : arrival.arrivalCode}).then(res => {
            if(Array.isArray(res.data)) {
              item.areaList = res.data;
            }
          })
        })
      }
    });


    let query = this.$route.query;
    let arrivalCode = query.arrivalCode;
    this.selectedArrivalCode = arrivalCode;
  },
  methods: {
    showInquiry: function (){
      this.$emit('open-inquiry-dialog');
    },
    showServiceTerms: function(){
      this.$emit('open-service-terms-dialog');
    },
    showNavigator: function () {
      this.navigatorDrawer = !this.navigatorDrawer;
    },
    moveProduct: function(arrivalCode){
      let parameters = {
        arrivalCode:arrivalCode
      };
      let entries = Object.entries(parameters || {});
      let queryString = entries && entries.length > 0 ? entries.map(e => e.join('=')).join('&') : '';
      this.$router.replace(`/product?${queryString}`).catch(e => {});
    }
  }
}
</script>

<style scoped>

</style>