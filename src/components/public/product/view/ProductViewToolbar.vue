<template>

  <div class="pt-4 pb-2">
    <div class="d-flex align-end flex-fill">
      <div>
        <div class="d-block">
          <h1 :class="`${$vuetify.breakpoint.smAndDown ? 'font-weight-regular text-h6' : 'font-weight-bold text-h5'}`">{{ title }}</h1>
        </div>
        <div class="d-block">
          <div class="body-2 pt-2 grey--text text--darken-2" v-if="(description || '') != ''">{{description }}</div>
          <div class="body-2 pt-1" v-if="(accommodation.address || '' ) != ''">
            주소 : {{accommodation.address}}
          </div>
        </div>
      </div>
      <v-spacer />
      <div class="d-flex">
        <v-btn elevation="0" color="grey2" dark @click="$router.back()">
          <v-icon class="mr-1">mdi-dots-grid</v-icon> <span v-if="!$vuetify.breakpoint.smAndDown" class="body-2 pt-1">목록으로</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:() =>({
    title: null,
    description: null,
    productId : null,
    nationCode: null,
    areaCode: null,
    nationName: null,
    areaName: null,
    accommodation: {
      address: null,
      fax: null,
      contact: null,
      url: null,
    }
  }),
  methods: {
    bind: function(data){
      console.log('product_view_toolbar', data);
      this.title = data.title;
      this.description = data.description;
      this.productId = data.productId;
      this.nationCode = data.nationCode;
      this.areaCode = data.areaCode;
      this.nationName = data.nationName;
      this.areaName = data.areaName;
      if(data.accommodation) {
        this.accommodation.address = data.accommodation.address;
        this.accommodation.fax = data.accommodation.fax;
        this.accommodation.contact = data.accommodation.contact;
        this.accommodation.url = data.accommodation.url;
      }
    }
  }
}
</script>

<style scoped>

</style>