<template>
  <v-dialog width="400px" persistent v-model="flag">
    <v-card elevation="0">
      <v-toolbar elevation="0">
        <div class="d-flex flex-fill align-center">
          <v-toolbar-title>화면유형선택</v-toolbar-title>
          <v-spacer />
          <v-btn icon color="grey" outlined tile class="rounded toolbar-btn-outlined" small @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-divider class="mb-4" />
      <v-card-text>

        <div class="mb-4">
          <v-form ref="frm" lazy-validation onsubmit="return false">
            <v-select placeholder="추가하려는 화면요소를 선택해주세요."
                      outlined
                      label="화면요소" :items="componentTypes"
                      v-model="selectedType"
                      :rules="rules"
                      item-value="value"
                      item-text="text" >
              <template v-slot:no-data>
                <div class="pa-4 body-2">추가가능한 구성요소가 없습니다.</div>
              </template>
            </v-select>
          </v-form>

          <div class="body-2 pb-3">
            <ul class="grey--text text--darken-1 caption">
              <li class="pb-1">에디터 : markdown 형식 에디터</li>
              <li class="pb-1">숙소정보 : 숙박시설 관한 정보</li>
            </ul>
          </div>

        </div>
        <div class="text-center">
          <v-btn color="blue darken-1" class="mr-2" dark elevation="0" @click="apply">
            <v-icon small class="mr-1">mdi-check-outline</v-icon> 적용
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data: () =>({
    flag: false,
    activeComponents:[],
    types: [
      {value:'EDITOR', text:'에디터(markdown)', useSingle: true},
      {value:'ACCOMMODATION', text:'숙소정보', useSingle: true},
    ],
    selectedType: null,
    rules: [
      v => !!v || '구성요소를 선택해주세요.',
    ]
  }),
  computed:{
    componentTypes(){
      let results = [];

      for(let typeIdx = 0; typeIdx < this.types.length; typeIdx += 1) {
        let type = this.types[typeIdx];
        let flag = false;

        if(type.useSingle) {
          for(let idx = 0; idx < this.activeComponents.length; idx += 1) {
            let activeComponent = this.activeComponents[idx];
            if(activeComponent == type.value) {
              flag = true;
              break;
            }
          }
        }

        if(!flag) {
          results.push(type);
        }
      }
      return results;
    }
  },
  methods:{
    close: function(){
      this.flag = false;
      this.clear();
    },
    open: function(activeComponents) {
      this.clear();
      this.activeComponents = activeComponents;
      this.flag = true;
    },
    apply: function(){
      let valid = this.$refs.frm.validate();
      if(valid) {
        let params = {value : this.selectedType};
        this.$emit('apply', params);
        this.close();
      }
    },
    clear: function(){
      this.selectedType = null;
      if(this.$refs.frm) {
        this.$refs.frm.reset();
        this.$refs.frm.resetValidation();
      }
    }
  }
}
</script>

<style scoped>

</style>