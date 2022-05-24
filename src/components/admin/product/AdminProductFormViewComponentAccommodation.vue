<template>
  <div>
    <!-- 주소, 연락처, 이메일, 홈페이지, FAX -->

    <v-row dense>
      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-map-marker</v-icon>
          숙소주소
        </div>
        <v-text-field filled rounded class="rounded" placeholder="숙소 주소를 입력해주세요." dense  hide-details />
      </v-col>

      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-phone</v-icon>
          숙소연락처
        </div>
        <v-text-field filled rounded class="rounded" placeholder="연락처를 입력해주세요." dense hide-details />
      </v-col>

      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-web</v-icon>
          홈페이지
        </div>
        <v-text-field filled rounded class="rounded" placeholder="숙소 웹사이트 주소를 입력해주세요." dense hide-details />
      </v-col>

      <v-col :cols="col6">
        <div class="caption grey--text">
          <v-icon color="grey mr-1" small>mdi-fax</v-icon>
          FAX
        </div>
        <v-text-field filled rounded class="rounded" placeholder="숙소대표 FAX" dense hide-details />
      </v-col>
    </v-row>

    <div class="mt-8 mb-1">
      <div class="caption grey--text">숙소시설정보</div>
    </div>

    <v-sheet class="pa-8" rounded color="grey lighten-4" outlined>

      <v-row dense>
        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">흡연유무</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">무료주차</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">수영장</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">피트니스 시설</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">커피숍</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">WI-FI</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">레스토랑</span>
            </template>
          </v-switch>
        </v-col>


        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">바/라운지</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
            <template v-slot:label>
              <span class="body-2">룸서비스</span>
            </template>
          </v-switch>
        </v-col>

        <v-col :cols="col4">
          <v-switch dense true-value="Y" false-value="N" flat color="blue" inset>
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
    homepage:null,
    viewComponentId:null,
    facilities: {

    }
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
  }
}
</script>

<style scoped>

</style>