<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-myeongjo.css" rel="stylesheet">
  <div class="wedding-invite">
    <img src="https://was.jong2.site:3000/images/HYH_1311-2.jpg" class="wedding-photo" />
    <div class="text-overlay-top">
      <h1 class="happy-wedding">WEDDING INVITATION</h1>
    </div>
  </div>

  <div class="main-title">
    <h1 class="no-wrap our-name"> 하종희 & 임유진 </h1>
    <p class="header">
      결혼합니다.
    </p>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "DeluxeEdition";
  src: url("@/assets/fonts/Deluxe Edition - Demo.ttf") format('truetype');
  font-weight: normal;
  font-style: normal;
}

.wedding-invite {
  position: relative;
  text-align: center;
  color: white;
}

.wedding-photo {
  width: 100%;
  height: auto;
  display: block;
}

.text-overlay-top {
  font-family: "DeluxeEdition";
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0);
  padding: 0px 0px;
  text-align: center;
  color: rgb(28, 196, 211);
  font-size: 1.8em;
  width: 80%;
}

.main-title{
  bottom: 1%;
  padding: 0px 10px;
  text-align: center;
}
.our-name {
  font-family: "MaruBuri", serif;
  font-size: 28px;
  text-align: center;
  color: #000000;//#266653;
  margin: 30px 0;
  font-weight: 600;
}
.header{
  font-family: "MaruBuri";
  font-size: 18px;
  color: #000000;//#295238;
}

.no-wrap {
  white-space: nowrap;
}

.happy-wedding{
  font-size: 2em;
  font-weight: 600;
  margin: 10px;
}
</style>
