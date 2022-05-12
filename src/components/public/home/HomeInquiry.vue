<template>
  <div>
    <sub-title title="여행견적 문의하기" />

    <div class="pt-2">
      <inquiry-form />
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import InquiryForm from "@/components/public/inquiry/InquiryForm";
export default {
  name: "HomeInquiry",
  components: {InquiryForm, SubTitle}
}
</script>

<style scoped>

</style>