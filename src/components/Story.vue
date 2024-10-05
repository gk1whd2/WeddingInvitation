<template>
  <img v-show=false src="~@/assets/images/hands_image.png" class="hands" />
  <div class="story">
    <div class="story-title">
      INVITATION
    </div>
    <div>
      <p class="header">
        "2018년 8월 26일"<br/>
      </p>
      <div class="our-story">
        <p>
          우리의 이야기가 시작되었습니다.<br/>
          그리고 이제, 함께하는 삶을 시작하려 합니다.
        </p>
        <br/>
        <p>
          저희 두 사람, <br />
          서로 존중하고 신뢰를 쌓으며<br/>
          행복한 삶을 만들어 갈 수 있도록<br />
          소중한 발걸음으로 축복해 주시길 바랍니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomStory",
};
</script>

<style lang="scss" scoped>
.hands {
  width: 100%;
}
.story {
  font-family: "MaruBuri";
  background-color: #f9f9fb;
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: $padding-vertical;
  padding-right: $padding-vertical;
  text-align: center;

  font-size: 16px;
  line-height: 40px;
  .story-title{
    color: #3E4F43;//#505050;
    font-weight: 600;
    font-size: 1.2em;
    letter-spacing: 2px;
    padding-bottom: 2em;
    padding-top : 0.5em;
  }
  .header{
    font-size:1em;
    color: #000000;//#295238;
    //font-weight: 600;
  }
  .our-story{
    font-size: 1em;
    padding-top: 10px;
    padding-bottom: 2em;
    word-break:keep-all;
    white-space:nowrap;
    overflow:hidden;
  }
}
</style>
