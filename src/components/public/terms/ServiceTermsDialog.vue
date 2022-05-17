<template>
 <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.smAndDown" persistent max-width="1200px">
   <v-card elevation="0">
     <v-toolbar elevation="0">
       <div class="d-flex flex-fill align-center">
         <v-toolbar-title>서비스 이용약관</v-toolbar-title>
         <v-spacer />
         <v-btn icon @click="close" color="grey" outlined tile class="rounded toolbar-btn-outlined" small>
           <v-icon>mdi-close</v-icon>
         </v-btn>
       </div>
     </v-toolbar>

     <v-divider />

     <div class="overflow-y-auto">
      <service-terms class="pl-4 pr-4" :height="msgHeight" />
     </div>

     <v-divider />
     <div class="pt-4 pb-4">
       <div class="d-flex flex-fill justify-center">
        <v-btn large color="deep-orange darken-2" elevation="0" dark @click="close"><v-icon small class="mr-1">mdi-close</v-icon>닫기</v-btn>
       </div>
     </div>

   </v-card>
 </v-dialog>
</template>

<script>
import ServiceTerms from "@/components/public/terms/ServiceTerms";
export default {
  components: {ServiceTerms},
  props:{
    height: {
      type: Number,
      default: 300
    }
  },
  computed:{
    msgHeight(){
      return this.$vuetify.breakpoint.smAndDown ? '79vh' : '70vh';
    }
  },
  data:() => ({
    dialog: false
  }),
  methods: {
    open : function(){
      this.dialog = true;
    },
    close : function(){
      this.dialog = false;
    },
  }
}
</script>

<style scoped>

</style>