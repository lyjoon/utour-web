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
          <v-select placeholder="추가하려는 화면요소를 선택해주세요."
                    outlined
                    label="화면요소" :items="types"
                    v-model="selectedType"
                    item-value="value" item-text="text" />

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
    types: [
      {value:'markdown', text:'마크다운(editor)'},
      {value:'accommodation', text:'숙소정보'},
    ],
    selectedType: {value:'markdown', text:'마크다운(editor)'},
  }),
  methods:{
    close: function(){
      this.selectedType = this.types[0];
      this.flag = false;
    },
    open: function(){
      this.flag = true;
    },
    apply: function(){
      let params = {value : this.selectedType.value, text: this.selectedType.text};
      this.$emit('apply', params);
      this.close();
    }
  }
}
</script>

<style scoped>

</style>