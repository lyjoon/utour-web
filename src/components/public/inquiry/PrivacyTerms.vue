<template>
  <v-sheet width="100%" :height="height" class="overflow-y-auto">

    <ol>
      <li class="pr-3">
        <div class="pb-2">
          <strong class="body-1">개인정보의 수집 및 이용목적</strong>
        </div>

        <ul class="body-2 pa-0" style="list-style: disc none">
          <li>항공예약, 호텔예약, 기타 운송수단 예약</li>
          <li>여행자보험 가입 등 보험관련</li>
          <li>출입국 카드 및 세관신고서 작성 등</li>
          <li>E-mail, SMS, DM 발송 및 맞춤정보 제공, 이벤트 등 서비스 제공 목적</li>
          <li>고지사항 전달 및 고객과의 원활한 의사소통 경로</li>
          <li>기타 여행에 필요한 용도</li>

          <li>항공예약, 호텔예약, 기타 운송수단 예약</li>
          <li>여행자보험 가입 등 보험관련</li>
          <li>출입국 카드 및 세관신고서 작성 등</li>
          <li>E-mail, SMS, DM 발송 및 맞춤정보 제공, 이벤트 등 서비스 제공 목적</li>
          <li>고지사항 전달 및 고객과의 원활한 의사소통 경로</li>
          <li>기타 여행에 필요한 용도</li>

        </ul>
      </li>

      <li class="pr-3">
        <div class="pt-4 pb-2">
          <strong class="body-1">개인정보 수집 항목 및 수집방법</strong>
        </div>
        <div class="body-2">
          회사은 적법한 절차와 법적기준에 의거하여 고객의 개인정보를 수집하고 있으며, 서비스에 필요한 최소한의 정보만 수집하고 있습니다. 개인정보보호법 등 관련법에서 규제하는 개인정보보호제도에 따라, 고객의 주민번호, 고객의 인권을 침해할 우려가 있는 민감한 개인정보항목(인종, 종교, 사상, 정치적 성향, 건강상태 등)은 수집하지 않습니다. 단, 항공권 예약 등 원활한 여행 서비스 제공을 위해 여권정보를 수집하고 있으며 수집한 여권정보는 여행 종료 시 파기하고 있습니다.
        </div>

        <div class="body-2">
          수집되는 개인정보 항목별 구분
        </div>

        <ul class="body-2 pa-0" style="list-style: disc none">
          <li>[필수] 성명(한글명/영문명)/생년월일/아이디/비밀번호 : 본인인식</li>
          <li>[필수] 이메일 : 중복가입 방지, 예약내역 확인 등</li>
          <li>[필수] 전화번호 : 예약내역 확인, 여행상품 상담 등</li>
          <li>[선택] 여권번호/스카이패스 회원번호 : 여행상품 예약, 항공권 구매, 여행자보험 가입</li>
          <li>[선택] 신용카드 결제 시 신용카드 정보(카드번호, 유효기간, 소지자명) : 요금 결제, 환불 관련 등</li>
        </ul>
      </li>

      <li class="pr-3">
        <div class="pt-4 pb-2">
          <strong class="body-1">개인정보의 보유 및 이용기간</strong>
        </div>
        <div class="body-2 pb-2">
          귀하의 동의 하에 수집된 개인정보는 원칙적으로 고객님이 회사의 서비스를 받는 동안 보유 이용됩니다. 귀하의 동의하에 수집된 개인정보는 회원탈퇴 시 즉시 파기됩니다. 단, 상법 등 관련 법령의 규정에 의하여 다음과 같이 거래 관련 권리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있는 경우에는 일정기간 보유합니다.
        </div>

        <ul class="body-2 pa-0" style="list-style: disc none">
          <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
          <li>대금 결재 및 여행 경력에 관한 기록 : 5년</li>
          <li>고객 불만 또는 분쟁처리에 관한 기록 : 3년</li>
        </ul>
      </li>


    </ol>

  </v-sheet>
</template>

<script>
export default {
  name: "PrivacyTerms",
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