<template>
  <div>
    <sub-title title="호텔_숙소_주요시설" />
    <v-row>
      <v-col v-for="item in items" v-bind:key="item.icon" class="col-6 pl-4 pr-4">
        <v-avatar class="elevation-0 lighten-2 mr-4" :size="avatarSize" color="grey" dark rounded>
          <v-icon :large="$vuetify.breakpoint.lgAndUp">{{item.icon}}</v-icon>
        </v-avatar>
        <span class="body-2">{{item.desc}}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SubTitle from "../../../common/SubTitle";
export default {
  components: {SubTitle},
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
    items : [
      {
        icon: 'mdi-smoking-off',
        desc: '건물전체 금연'
      },
      {
        icon: 'mdi-swim',
        desc: '수영장'
      },{
        icon: 'mdi-weight-lifter',
        desc: '휘트니스 센터'
      },{
        icon: 'mdi-wifi',
        desc: '무선인터넷'
      },{
        icon: 'mdi-glass-mug-variant',
        desc: '술집'
      },{
        icon: 'mdi-television',
        desc: 'TV'
      },
    ]
  })
}
</script>

<style scoped>

</style>