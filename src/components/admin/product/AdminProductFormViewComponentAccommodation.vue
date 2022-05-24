<template>
  <div>
    <!-- 주소, 연락처, 이메일, 홈페이지, FAX -->

    <v-row dense>
      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-map-marker</v-icon>
          숙소주소
        </div>
        <v-text-field filled rounded class="rounded" placeholder="숙소 주소를 입력해주세요." dense  hide-details v-model="address" />
      </v-col>

      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-phone</v-icon>
          숙소연락처
        </div>
        <v-text-field filled rounded class="rounded" placeholder="연락처를 입력해주세요." dense hide-details v-model="contact" />
      </v-col>

      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-web</v-icon>
          홈페이지
        </div>
        <v-text-field filled rounded class="rounded" placeholder="숙소 웹사이트 주소를 입력해주세요." dense hide-details v-model="url" />
      </v-col>

      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-fax</v-icon>
          FAX
        </div>
        <v-text-field filled rounded class="rounded" placeholder="숙소대표 FAX" dense hide-details v-model="fax" />
      </v-col>
    </v-row>

    <div class="mt-8 mb-1">
      <div class="caption grey--text">숙소시설정보 (준비중..)</div>
    </div>

    <v-sheet class="pa-8" rounded color="grey lighten-4" outlined v-if="isFacilities">

      <v-row dense>
        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.SMOKING">
            <template v-slot:label>
              <span class="body-2">흡연유무</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.PARKING">
            <template v-slot:label>
              <span class="body-2">무료주차</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.SWIM">
            <template v-slot:label>
              <span class="body-2">수영장</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.FITNESS">
            <template v-slot:label>
              <span class="body-2">피트니스 시설</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.CAFE">
            <template v-slot:label>
              <span class="body-2">커피숍</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.WIFI">
            <template v-slot:label>
              <span class="body-2">WI-FI</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.RESTAURANT">
            <template v-slot:label>
              <span class="body-2">레스토랑</span>
            </template>
          </v-switch>
        </v-col>


        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.BAR">
            <template v-slot:label>
              <span class="body-2">바/라운지</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.ROOM_SERVICE">
            <template v-slot:label>
              <span class="body-2">룸서비스</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense flat color="blue" inset v-model="facilities.SPA">
            <template v-slot:label>
              <span class="body-2">스파</span>
            </template>
          </v-switch>
        </v-col>

      </v-row>
    </v-sheet>
  </div>
</template>

<script>

export default {
  data:() => ({
    fax:null,
    contact:null,
    address:null,
    url:null,
    viewComponentId:null,
    facilities: {
      PARKING: false,
      SMOKING: false,
      FITNESS: false,
      WIFI: false,
      RESTAURANT: false,
      SWIM: false,
      BAR: false,
      ROOM_SERVICE: false,
      SPA: false,
      CAFE: false,
    },

    isFacilities: false
  }),
  computed: {
    col6(){
      return this.$vuetify.breakpoint.smAndDown ? 12 : 6;
    },
    col4(){
      return this.$vuetify.breakpoint.smAndDown ? 6 : 3;
    }
  },
  methods:{
    getCommand: function (){
      let command = {
        viewComponentId: null,
        fax: this.fax,
        contact: this.contact,
        address: this.address,
        url: this.url,
        facilities: []
      };

      if(this.isFacilities) {
        Object.keys(this.facilities).forEach(key => {
          command.facilities.push({
            facilityId: command.facilities[key],
          });
        })
      }

      return command;
    }
  }
}
</script>

<style scoped>

</style>