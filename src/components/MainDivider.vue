<template>
  <div class="main-divider">
    <img src="~@/assets/images/divider_6.png" />
  </div>
</template>

<script>
export default {
  name: "MainDivider",
};
</script>

<style lang="scss" scoped>
.main-divider {
  padding-left: $padding-vertical;
  padding-right: $padding-vertical;
  padding-bottom: 20px;
  padding-top: 20px;
  img {
    position: relative;
    width: 50%;
    height: 200px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
