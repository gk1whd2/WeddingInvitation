<template>
  <div class="story">
    <br/>
    <div>
      <p class="header">
        "2018년 8월 26일"<br/>
      </p>
      <p class="our-story">
        우리의 이야기가 시작되었습니다.<br/>
        그리고 이제, 함께하는 삶을 시작하려 합니다. 
      </p>
      <p class="our-story">
        저희 두 사람, <br />
        서로 존중하고 신뢰를 쌓으며<br/>
        행복한 삶을 만들어 갈 수 있도록<br />
        소중한 발걸음으로 축복해 주시길 바랍니다.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomStory",
};
</script>

<style lang="scss" scoped>
.story {
  font-family: "MaruBuri";
  padding-top: 4px;
  padding-bottom: 10px;
  padding-left: $padding-vertical;
  padding-right: $padding-vertical;
  text-align: center;


  p {
    margin-bottom: 16px;
    font-size: 18px;
    &.header{
      font-size:22px;
      line-height: 40px;
    }

    &.our-story{
      line-height: 40px;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    &.our-name {
      font-size: 22px;
      color: #000000;//#266653;
      margin: 20px 0;
      font-weight: 600;
    }

    &.header {
      color: #000000;//#295238;
    }

    &:last-child {
      margin-bottom: 10px;
    }
  }
}
</style>
