<template>
  <v-sheet width="100%" :height="height" class="overflow-y-auto">

    <div class="pb-4">
      <strong class="body-1">개인정보의 제3자 제공</strong>
    </div>

    <ol>
      <li class="pr-3">
        <div class="pb-4">
          <strong class="body-2">회사는 정보주체의 개인정보를 호텔 예약문의, 신청, 관리의 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</strong>
        </div>
      </li>

      <li class="pr-3">
        <div class="pb-2 body-2">
          회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
        </div>
        <ul class="pa-0" style="list-style: disc none">
          <li>개인정보를 제공받는 자 : 예약, 문의한 호텔, 항공사, 렌터카회사</li>
          <li>제공받는 자의 개인정보 이용목적 : 호텔, 항공, 렌터카 견적 상담 및 예약 목적</li>
          <li>제공하는 개인정보 항목 : 성명, 전화번호, 이메일주소, 여권번호, 영문성명, 생년월일</li>
          <li>제공받는 자의 보유/이용기간 : 5년, 계약 유지기간 또는 유지보수 기간</li>
        </ul>
      </li>
    </ol>
  </v-sheet>
</template>

<script>
export default {
  props:{
    height: {
      type: Number,
      default: 300
    }
  }
}
</script>

<style scoped>

</style>