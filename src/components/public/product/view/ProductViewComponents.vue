<template>
  <div>
    <div v-for="(item, index) in viewComponents" :key="index" >
      <component :is="componentMap[item.viewComponentType].componentName" :ref="`ref_view_component_${item.viewComponentType}_${index}`" v-bind="item"></component>
    </div>
  </div>
</template>

<script>
import ProductViewComponentEditor from "./ProductViewComponentEditor"
import ProductViewComponentAccommodation from "./ProductViewComponentAccommodation"
export default {
  components: { ProductViewComponentAccommodation, ProductViewComponentEditor},
  computed:{
    avatarSize (){
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
        case "md":
          return '46px';
        default:
          return '36px';
      }
    }
  },
  data: ()=>({
    componentMap: {
      EDITOR: {
        componentName : 'ProductViewComponentEditor',
        title: '에디터(markdown)',
      },
      ACCOMMODATION: {
        componentName : 'ProductViewComponentAccommodation',
        title: '숙소정보',
      }
    },
    viewComponents: [],
  }),
  methods: {
    bind: function(items){
      this.viewComponents = items;
      console.log('this.viewComponents', this.viewComponents);
    }
  }
}
</script>

<style scoped>

</style>