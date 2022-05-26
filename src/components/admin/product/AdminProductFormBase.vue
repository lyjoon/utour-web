<template>
  <v-form ref="frm">
    <div class="pt-2 pb-4">
      <strong class="title">기본개요</strong>
    </div>

    <div>
      <v-row>
        <v-col cols="12">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-pencil</v-icon>상품명(필수)</div>
          <v-text-field dense placeholder="여행상품에 대한 제목을 입력해주세요." v-model="command.title"
                        aria-required="true" filled rounded class="rounded" ></v-text-field>
        </v-col>

        <v-col :cols="col4">

          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small >mdi-cog</v-icon>상품유형</div>
            <v-select filled rounded dense class="rounded" placeholder="여행상품 유형을 선택해주세요"
                      v-model="command.productType"
                      disabled
                      eager
                      :items="productType" item-text="codeName" item-value="code"></v-select>

          </div>

          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-earth</v-icon>여행국가</div>
            <v-select filled rounded dense class="rounded" placeholder="여행국가"
                      :items="nationList"
                      v-model="command.nationCode"
                      eager
                      item-value="nationCode"
                      item-text="nationName"
                      @change="onChangeNationCode">

            </v-select>
          </div>
          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-city</v-icon>도시/지역</div>
            <v-select filled
                      rounded
                      dense
                      class="rounded"
                      :items="nationAreaList"
                      item-value="areaCode"
                      item-text="areaName"
                      v-model="command.areaCode"
                      placeholder="여행도시/지역"
            >
              <template v-slot:no-data>
                <div class="body-2 pa-4">지역/도시정보가 없습니다.</div>
              </template>
            </v-select>
          </div>

          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-image</v-icon>대표이미지</div>
            <v-sheet width="100%" :height="repImageHeight" elevation="0" color="grey lighten-3" class="mx-auto align-center d-flex justify-center" rounded>
              <v-icon v-if="!repImageReaderSrc" color="grey lighten-2" v-text="'mdi-image-plus'" size="100" @click="addRepImageSrc"></v-icon>
              <v-img v-if="repImageReaderSrc" :src="repImageReaderSrc" width="100%" height="100%" class="rounded" />
            </v-sheet>

            <v-file-input ref="repImageFileInput"
                          @change="onChangeRepImageSrc"
                          :multiple="false"
                          accept="image/png, image/jpeg, image/bmp"
                          class="d-none" />
          </div>


        </v-col>

        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8" class="pb-9">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1">mdi-pencil</v-icon>개요</div>
          <v-sheet height="100%" min-height="500px">
            <toast-editor ref="toast-editor"></toast-editor>
          </v-sheet>
        </v-col>

      </v-row>
    </div>

  </v-form>
</template>

<script>

import ToastEditor from "@/components/common/ToastEditor";
import codeApi from "@/api/CodeApi";
export default {
  components:{ToastEditor},
  computed: {
    col4(){
      return this.$vuetify.breakpoint.smAndDown ? 12 : 4;
    },
    repImageHeight(){
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
        case "lg":
          return '330px';
        case "md":
          return '280px';
        default:
          return '350px';
      }
    }
  },
  mounted() {
    codeApi.getNationAllList().then(res => {
      let resultData = res.data;
      this.nationList = resultData.result;
    });

    codeApi.getCommonCode('PRODUCT_TYPE').then(res => {
      let resultData = res.data;
      if(resultData.result && resultData.result['codeList']) {
        this.productType = resultData.result['codeList'];
        this.command.productType = 'HOTEL';
      }
    });
  },
  data:() =>({
    nationList:[],
    nationAreaList:[],
    productType:[],
    command: {
      productId:null,
      productType:null,
      nationCode:null,
      areaCode:null,
      repImageSrc:null,
      title:null,
      content:null,
      writer:null,
      useYn:null,
    },
    repImageFile:null,
    repImageReaderSrc:null
  }),
  methods:{
    addRepImageSrc: function(){
      this.$refs.repImageFileInput.$refs.input.click();
    },
    onChangeRepImageSrc : function(file) {
      this.repImageFile = file;
      let reader  = new FileReader();
      let _this = this;
      reader.addEventListener("load", function (){
        _this.repImageReaderSrc = reader.result;
        // console.log('reader.addEventListener.src', _this.repImageReaderSrc);
      }, false);

      if(file) {
        reader.readAsDataURL(this.repImageFile);
      }
    },
    onChangeNationCode: function(){
      console.log('get-nation-code');
    },
    getCommand: function() {
      let command = {
        productId: this.command.productId,
        productType: this.command.productType,
        nationCode: this.command.nationCode,
        areaCode: this.command.areaCode,
        repImageSrc: this.repImageFile ? this.repImageFile.name : null,
        title:this.command.title,
        content: this.$refs["toast-editor"] ? this.$refs["toast-editor"].getMarkdown() : null,
        writer:this.command.writer,
        useYn:this.command.useYn,
      };

      return {
        product: command,
        file: this.repImageFile
      };
    },
    bind: function(product) {
      // console.log('product-form-base.bind', product);
      if(product){
        /*Object.keys(this.command).forEach(key => {
          this.command[key] = product[key];
        });*/
        this.command.productId = product['productId'];
        this.command.productType = product['productType'];
        this.command.nationCode = product['nationCode'];
        // this.command.areaCode = product['areaCode'];
        this.command.repImageSrc = product['repImageSrc'];
        this.command.title = product['title'];
        this.command.content = product['content'];
        this.command.writer = product['writer'];
        this.command.useYn = product['useYn'];

        this.$refs["toast-editor"].setMarkdown(this.command.content);

        console.log('product-form-base.bind', this.command, product);
      }
    }
  }
}
</script>

<style scoped>

</style>