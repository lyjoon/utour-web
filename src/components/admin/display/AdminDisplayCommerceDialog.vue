<template>
  <v-dialog width="700px" persistent v-model="drawDialog">
    <v-card elevation="0">
      <v-toolbar elevation="0">
        <div class="d-flex flex-fill align-center">
          <v-toolbar-title>Add Commerce</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="close" color="grey" outlined tile class="rounded toolbar-btn-outlined" small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>

      <v-divider class="mb-4" />

      <v-card-text>
        <v-form ref="frm" lazy-validation>
          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-earth</v-icon>여행목적지</div>
            <v-select filled rounded dense class="rounded"
                      :items="arrivalList"
                      v-model="arrivalCode"
                      eager
                      item-value="arrivalCode"
                      item-text="arrivalName"
                      @change="onChangeArrivalCode">

            </v-select>
          </div>
          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-city</v-icon>지역</div>
            <v-select filled
                      rounded
                      dense
                      class="rounded"
                      :items="areaList"
                      item-value="areaCode"
                      item-text="areaName"
                      v-model="areaCode"
                      placeholder="여행도시/지역"
                      @change="onChangeAreaCode"
            >
              <template v-slot:no-data>
                <div class="body-2 pa-4">지역/도시정보가 없습니다.</div>
              </template>
            </v-select>
          </div>
          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-airplane</v-icon>선택여행상품(<strong class="error--text">*</strong>)</div>
            <v-select filled
                      rounded
                      dense
                      class="rounded"
                      item-value="productId"
                      :items="productList"
                      v-model="command.productId"
                      placeholder="상품" @change="onChangeProduct">
              <template v-slot:item="{item}"><span class="body-2">{{item.title}}</span></template>
              <template v-slot:selection="{item}">{{item.title}}</template>
              <template v-slot:no-data>
                <div class="body-2 pa-4">{{ (nationCode || '') != '' ? '등록된 상품이 없습니다.':'여행국가를 선택해주세요.' }}</div>
              </template>
            </v-select>
          </div>

          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-city</v-icon>미리보기</div>
          <div class="d-flex justify-center flex-fill pl-4 pr-4 pb-4 pt-2">
            <v-card width="400px" elevation="0">
              <v-img height="300px" :src="product.repImageSrc" class="white--text align-end">
                <template v-slot:placeholder>
                  <v-sheet width="100%" height="100%" color="grey lighten-3" class="d-flex justify-center align-center">
                    <v-icon color="grey lighten-1" size="55px">mdi-image-off-outline</v-icon>
                  </v-sheet>
                </template>

                <template v-slot:default>
                  <v-sheet dark translate="yes" color="rgba(0,0,0,0.41)" v-if="(product.productId || 0) > 0">
                    <v-card-title class="body-2 text-md-subtitle-1 text-lg-subtitle-1 text-xl-subtitle-1 pb-0 pt-1 text-truncate">
                      {{product.title || 'N/A'}}
                    </v-card-title>

                    <v-card-text class="caption text-md-body-2 text-lg-body-2 text-xl-body-2 pb-2 pt-1 text-truncate">
                      {{product.description || '-'}}
                    </v-card-text>
                  </v-sheet>
                </template>

              </v-img>
            </v-card>
          </div>
        </v-form>
      </v-card-text>

      <v-divider class="mt-4 mb-4" />

      <v-card-actions class="pb-6">
        <div class="d-flex flex-fill justify-center">
          <v-btn color="deep-orange darken-2" class="mr-2" dark elevation="0" @click="save">
            <v-icon small class="mr-1">mdi-content-save</v-icon> 저장
          </v-btn>
          <v-btn color="grey" v-if="readable" dark elevation="0" class="mr-2" @click="remove">
            <v-icon small class="mr-1" >mdi-delete</v-icon> 삭제
          </v-btn>

          <v-spacer v-if="readable" />

          <v-btn color="grey" dark elevation="0" @click="close">
            <v-icon small class="mr-1" >mdi-close</v-icon> 닫기
          </v-btn>
        </div>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import codeApi from "@/api/CodeApi";
import productApi from "@/api/ProductApi";
import displayApi from "@/api/DisplayApi";

export default {
  data:() =>({
    drawDialog: false,
    command: {
      commerceId: null,
      productId: null,
      ordinalPosition: null,
      useYn: null,
    },
    arrivalList:[],
    arrivalCode:null,
    areaList:[],
    areaCode:null,
    productList:[],
    product: {
      productId:null,
      title:null,
      description:null,
      repImageSrc:null,
    }
  }),
  computed:{
    readable(){
      return (this.command.commerceId || 0) > 0;
    }
  },
  methods:{
    clear: function(){
      Object.keys(this.command).forEach(key => {
        this.command[key] = null;
      });
      this.arrivalCode = null;
      this.areaCode = null;
      this.arrivalList = [];
      this.areaList = [];
      this.productList = [];
      this.product = {
        productId:null,
        title:null,
        description:null,
        repImageSrc:null,
      };

      if(this.$refs.frm) {
        this.$refs.frm.reset();
        this.$refs.frm.resetValidation();
      }
    },
    open: function(param){
      this.clear();

      if((param.commerceId || 0) > 0) {
        this.command.productId = param.productId;
        this.command.commerceId = param.commerceId;
        this.command.ordinalPosition = param.ordinalPosition;

        // 상품정보 조회 이후 지역정보 세팅.
        productApi.get(this.command.productId).then(res => {
          let data = res.data;
          let arrivalCode = null, areaCode = null;
          if(data && data.result && data.result.product && (data.result.product.productId || 0) > 0) {
            let _product = data.result.product;
            this.product.productId = _product.productId;
            this.product.title = _product.title;
            this.product.description = _product.description;
            areaCode = _product.areaCode;
            arrivalCode = _product.arrivalCode;
          }

          codeApi.getArrivalList().then(res => {
            let resultData = res.data;
            if(Array.isArray(resultData)) {
              this.arrivalList = resultData;

              let _arrival = this.arrivalList.find(item => {
                return item.arrivalCode == arrivalCode;
              });

              if(_arrival && _arrival.arrivalCode) {
                this.arrivalCode = _arrival.arrivalCode;

                codeApi.getAreaList({arrivalCode : this.arrivalCode})
                    .then(areaResponse => {
                      let areaData = areaResponse.data;
                      if(Array.isArray(areaData)) {
                        this.areaList = areaData;
                        let _area = this.areaList.find(areaItem => areaItem.areaCode == areaCode);
                        if(_area && _area.areaCode) {
                          this.areaCode = _area.areaCode;
                          this.getProductList();
                        } else {
                          this.getProductList();
                        }
                      }
                    })
              } else {
                this.getProductList();
              }
            }
          });
        });
      } else {
        this.command.ordinalPosition = param.ordinalPosition;

        codeApi.getArrivalList().then(res => {
          let resultData = res.data;
          if(Array.isArray(resultData)) {
            this.arrivalList = resultData;
          }
        });
      }
      this.drawDialog = true;
    },
    close: function(){
      this.drawDialog = false;
      this.clear();
    },
    onChangeAreaCode: function(){
      this.getProductList();
    },
    onChangeArrivalCode: function(){
      let nationCode = this.nationCode;
      codeApi.getNation(nationCode).then(res => {
        let data = res.data.result;
        if(data) {
          let nationAreaList = data.nationAreaList;
          if(nationAreaList && Array.isArray(nationAreaList)) {
            this.nationAreaList = nationAreaList;
          }
        }
      });
      this.getProductList();
    },
    onChangeProduct: function(){
      let _productId = this.command.productId;
      let selectedProduct = this.productList.find(item => {
        return item.productId == _productId;
      });
      let dateTime = new Date().getTime();
      this.product.title = selectedProduct.title;
      this.product.description = selectedProduct.description;
      this.product.productId = _productId;
      this.product.repImageSrc = `/api/v1/product/image/${_productId}?t=${dateTime}`;
    },
    save: function(){
      displayApi.saveCommerce(this.command).then(res => {
        this.$emit('complete');
        this.close();
      });
    },
    remove: function(){
      displayApi.deleteCommerce(this.command.commerceId).then(res => {
        this.$emit('complete');
        this.close();
      });
    },
    getProductList: function(){
      productApi.getList(this.arrivalCode, this.areaCode).then(res => {
        let data = res.data;
        console.log('product-list', data);
        /*if(data && Array.isArray(data)) {
          this.productList = data;

          if(this.product && (this.product.productId || 0) > 0 ) {
            let _product = this.productList.find(item => {
              return item.productId == this.product.productId;
            });

            if(_product && _product.productId) {
              this.command.productId = _product.productId;
              this.product.title = _product.title;
              this.product.description = _product.description;
              this.product.repImageSrc = `/api/v1/product/image/${_product.productId}`;
            }
          }
        }*/
      });
    }
  }
}
</script>

<style scoped>

</style>