<template>
  <v-dialog max-width="1240px" persistent v-model="drawDialog">
    <v-card elevation="0">
      <v-toolbar elevation="0">
        <div class="d-flex flex-fill align-center">
          <v-toolbar-title>케로셀</v-toolbar-title>
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
            <v-hover v-slot="{hover}">
              <v-img width="100%" :height="imgHeight" :src="imageSrc || '-'" class="rounded">
                <template v-slot:placeholder>
                  <v-sheet height="100%" width="100%" color="grey lighten-3" class="d-flex flex-fill align-center justify-center">
                    <v-icon size="50px" color="grey lighten-2">mdi-image-off-outline</v-icon>
                  </v-sheet>
                </template>
                <template v-slot:default>
                  <v-overlay absolute opacity="0.2" v-if="hover" class="d-flex flex-fill fill-height justify-center align-center">
                    <v-icon color="grey lighten-2" v-text="(command.carouselId || 0) > 0 ? 'mdi-image-edit':'mdi-image-plus'" size="100" @click="addImageFile"></v-icon>
                  </v-overlay>
                </template>
              </v-img>
            </v-hover>

            <v-file-input ref="imageFileInput"
                          @change="onChangeImageFile"
                          :multiple="false"
                          accept="image/png, image/jpeg, image/bmp"
                          class="d-none"
                          :key="fileInputComponentKey"
            />

          </div>

          <div class="mt-4">
            <v-row dense>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">
                <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-format-text</v-icon>케로셀 제목</div>
                <v-text-field dense filled rounded class="rounded" placeholder="케로셀 제목(노출 텍스트)" v-model="command.title" :rules="rules.title"></v-text-field>
              </v-col>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 4">
                <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-numeric</v-icon>노출순서(미지정 시 후순위)</div>
                <v-text-field dense filled rounded class="rounded" placeholder="노출순서" type="number" v-model="command.ordinalPosition"></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div>
            <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1" small>mdi-link</v-icon>연결 URL</div>
            <v-text-field dense hide-details filled rounded placeholder="연결하려는 URL을 입력해주세요."  v-model="command.linkUrl" class="rounded" />
          </div>

        </v-form>
      </v-card-text>

      <v-card-actions class="pb-8 pl-6 pr-6">
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

import displayApi from "@/api/DisplayApi";

export default {
  data:() =>({
    drawDialog: false,
    command: {
      carouselId: null,
      ordinalPosition: null,
      title:null,
      linkUrl:null,
    },
    imageSrc: null,
    imageFile: null,
    rules: {
      title: [
        v => !!v || '제목를 입력해주세요.',
        v => (v && v.length <= 100) || '100자를 넘길 수 없습니다.',
      ]
    },
    fileInputComponentKey:0
  }),
  computed:{
    readable(){
      return (this.command.carouselId || 0) > 0;
    },
    imgHeight(){
      let v;
      switch (this.$vuetify.breakpoint.name) {
        case "xs": case "sm":
          v = "45vh";
          break;
        case "md":
          v = "550px";
          break;
        case "lg": case "xl":
          v = "600px";
          break;
      }
      return v;
    },
  },
  methods:{
    clear: function(){
      Object.keys(this.command).forEach(key => {
        this.command[key] = null;
      });
      this.command.ordinalPosition = 99999;
      if(this.$refs.frm) {
        this.$refs.frm.reset();
        this.$refs.frm.resetValidation();
      }
      this.imageFile = null;
      this.imageSrc = null;
      this.fileInputComponentKey = 0;
    },
    open: function(item){
      this.clear();

      if(item && (item.carouselId || 0) > 0) {
        this.command.carouselId = item.carouselId;
        this.command.title = item.title;
        if((item.ordinalPosition || 0) > 0) this.command.ordinalPosition = item.ordinalPosition;
        this.command.linkUrl = item.linkUrl;
        let dateTime = new Date().getTime();
        this.imageSrc = `/api/v1/display/carousel/${item.carouselId}?t=${dateTime}`;
      }

      this.drawDialog = true;
    },
    close: function(){
      this.drawDialog = false;
      this.clear();
    },

    save: function(){
      displayApi.saveCarousel(this.command, this.imageFile)
          .then(res=>{
            this.$emit("complete");
            this.close();
          });
    },
    remove: function(){
      displayApi.deleteCarousel(this.command.carouselId)
          .then(res=>{
            this.$emit("complete");
            this.close();
          });
    },
    addImageFile: function(){
      this.$refs.imageFileInput.$refs.input.click();
    },
    onChangeImageFile: function(file) {
      this.imageFile = file;
      let reader  = new FileReader();
      let _this = this;
      reader.addEventListener("load", function (){
        _this.imageSrc = reader.result;
      }, false);

      if(file) {
        reader.readAsDataURL(this.imageFile);
      }
      this.fileInputComponentKey += 1;
    }
  }
}
</script>

<style scoped>

</style>