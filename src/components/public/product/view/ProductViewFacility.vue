<template>
  <div>
    <v-card-subtitle class="pl-2 pr-2">
      <span style="font-size: 18px">호텔_숙소_주요시설</span>
    </v-card-subtitle>
    <v-row>
      <v-col v-for="item in items" v-bind:key="item.icon" class="col-6 pl-4 pr-4">
        <v-avatar class="elevation-0 lighten-2 mr-4" color="grey" dark rounded>
          <v-icon large>{{item.icon}}</v-icon>
        </v-avatar>
        <span class="subtitle-1">{{item.desc}}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
        desc: '무선인터넷(와이파이)'
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