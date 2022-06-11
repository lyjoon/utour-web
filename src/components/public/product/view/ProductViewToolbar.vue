<template>

  <div>
    <div class="d-flex align-end flex-fill">
      <div>
        <div class="d-block pb-1">
          <h1 class="title font-weight-bold">{{ title }}</h1>
        </div>
        <div class="body-2 pt-1 grey--text" v-if="(description || '') != ''">{{description }}</div>
      </div>
      <v-spacer />
      <div class="d-flex">
        <v-btn elevation="0" color="secondary" dark icon @click="$router.back()">
          <v-icon>mdi-dots-grid</v-icon>
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
    arrivalCode: null,
    areaCode: null,
    arrivalName: null,
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
      this.title = data.title;
      this.description = data.description;
      this.productId = data.productId;
      this.arrivalCode = data.arrivalCode;
      this.areaCode = data.areaCode;
      this.arrivalName = data.arrivalName;
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