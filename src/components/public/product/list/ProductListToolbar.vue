<template>
  <div>
    <!--
    <div>
        <v-autocomplete v-model="query1"
                      label="선택가능한 국가, 도시지역"
                      color="blue-grey lighten-2"
                      multiple
                      filled
                      hide-details
                      dense
                      rounded
                      class="rounded-lg">
        <template v-slot:prepend-inner >
          <v-icon left>mdi-earth</v-icon>
        </template>
      </v-autocomplete>
    </div>
    <div class="d-flex pa-3">
      <v-autocomplete v-model="query2"
                      label="숙소, 키워드검색"
                      color="blue-grey lighten-2"
                      multiple
                      filled
                      dense
                      hide-details
                      rounded
                      class="rounded-lg">
        <template v-slot:prepend-inner >
          <v-icon left>mdi-magnify</v-icon>
        </template>
        <template v-slot:append-outer>
          <v-btn dark height="51px" color="red darken-2" class="v_btn_search rounded-lg" elevation="0" >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-autocomplete>
    </div>
    -->
    <div class="d-flex pt-4 pb-4 align-center">
      <strong class="text-h5"><span class="font-weight-bold">{{ title || '-' }}</span></strong>
      <v-spacer />
      <div>
        <v-btn color="grey lighten-2" elevation="0" class="grey--text text--darken-3" @click="$router.push('/product')">
          <v-icon class="mr-1">mdi-filter-off-outline</v-icon> 전체보기</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import codeApi from "@/api/CodeApi";

export default {
  data() {
    return {
      query1: '',
      query2: '',
      title: null
    }
  },
  methods:{
    bind: function(parameters) {
      let nationCode = parameters.nationCode || '';
      let continentCode = parameters.continentCode || '';
      let areaCode = parameters.areaCode || '';
      if(nationCode != '' ) {
        codeApi.getNation(nationCode).then(res => {
          let data = res.data.result;

          if(areaCode != null) {
            let nationAreaList = data['nationAreaList'];
            if(nationAreaList && Array.isArray(nationAreaList)) {
              let areaItem = nationAreaList.find(item => item.areaCode == areaCode);
              if(areaItem && (areaItem.areaCode || '') != '') {
                this.title = areaItem.areaName;
              } else {
                this.title = data['nationName'];
              }
            } else this.title = data['nationName'];
          } else this.title = data['nationName'];
        })
      } else {
        if(continentCode != '') {
          codeApi.getCommonCode('CONTINENTS').then(res =>{
            let resultData = res.data;
            if(resultData.result && resultData.result['codeList']) {
              let continentItem = resultData.result['codeList'].find(item => item.code == continentCode);
              this.title = continentItem['codeName'];
            }
          });
        } else this.title = '전체';
      }
    }
  }
}
</script>

<style scoped>
</style>