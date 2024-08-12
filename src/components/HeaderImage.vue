<template>
  <div class="header-image">
    <div class="header">
      <p class="no-wrap"> 2024.11.09 SAT 14:40 </p>
      <p class="no-wrap"> 평택 제이앤제이 아트컨벤션 </p>
      <p> 제이드 팰리스 홀 </p>
    </div>
  </div>
  <img src="~@/assets/images/hands_image.png" class="hands" />
</template>

<script>
export default {
  name: "HeaderImage",
};
</script>

<style lang="scss" scoped>
.hands {
  width: 100%;
}

.header-image {
  padding-top: 4px;
  padding-bottom: 10px;
  //padding-left: $padding-vertical;
  //padding-right: $padding-vertical;
  text-align: center;
}
.header {
  margin-bottom: 16px;
  line-height: 36px;
  font-size: 24px;
  color: #000000;//#295238;
}
</style>
