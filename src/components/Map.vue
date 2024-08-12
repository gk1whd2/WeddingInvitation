<template>
  <div class="location">
    <div class="description">
      Location
    </div>
      <div class="location-detail">
        제이앤제이 아트컨벤션 2층 제이드팰리스홀
      </div>
      <div class="location-address">
        경기도 평택시 비전5로 20-46<br/>
          <a href="tel:031-653-5300">
            ☎️ 031-653-5300
          </a>
      </div>
  </div>
  <div class="navigation">
    <div class="map">
      <div class="map-container" >
        <KakaoMap 
            :lat="center_lat"
            :lng="center_lng"
            :draggable="true"
            :height=200
            :width=$max-width
            :level="level">
            <KakaoMapMarker
              title="Title"
              :lat="center_lat" 
              :lng="center_lng"/>
        </KakaoMap>
      </div>

      <div class="cover">
        <div class="navi-apps">
          <a v-bind:href="tmapUrl">
            <div class="ico_comm ico_tmap"><img src="~@/assets/images/icons/tmap.png"/></div>
            <div class="link">T맵</div>
          </a>
        </div>
        <div class="navi-apps">
          <a v-bind:href="kakaoTaxiUrl">
            <div class="ico_comm ico_taxi"><img src="~@/assets/images/icons/kakaot.png"/></div>
            <div class="link">카카오택시</div>
          </a>
        </div>
        <div class="navi-apps">
          <a v-bind:href="navermapUrl">
            <div class="ico_comm ico_navermap"><img src="~@/assets/images/icons/navermap.png"/></div>
            <div class="link">네이버맵</div>
          </a>
        </div>
        <div class="navi-apps">
          <a v-bind:href="kakaomapUrl">
            <div class="ico_comm ico_kakaomap"><img src="~@/assets/images/icons/kakaomap.png"/></div>
            <div class="link">카카오맵</div>
          </a>
        </div>
      </div>

      <div class="navi-image">
          <div class="image">
              <img src="~@/assets/images/예식장_약도.png" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps'

export default {
  name: "CustomMap",
  components: {KakaoMap, KakaoMapMarker},
  data() {
    return {
      center_lat : 37.000223,
      center_lng : 127.115265,
      level: 3, // 지도의 레벨(확대, 축소 정도),

      //////////////
      tmapUrl: "",
      kakaoTaxiUrl: "",
      navermapUrl: "",
      kakaomapUrl: ""
    };
  },
  mounted() {
    this.makeUrls()
  },
  methods: {
    makeUrls() {
      // 장소데이터의 이름정보 불러온 뒤
      const locationName = "제이앤제이아트컨벤션"
      this.tmapUrl = "tmap://search?name=" + locationName
      this.kakaoTaxiUrl = "https://t.kakao.com/launch?type=taxi&amp;dest_lat=37.000223&amp;dest_lng=127.115265&amp;ref=localweb"
      this.navermapUrl = "nmap://search?query=" + locationName + "&appname=kimyoon21.github.io/wedding"
      this.kakaomapUrl = "kakaomap://search?q=" + locationName
    }
  }
};
</script>

<style lang="scss" scoped>
.location{
  padding-top: 32px;
  padding-bottom: 50px;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  color: #000000;//#295138;
  .description {
    font-size: 24px;
    letter-spacing: 6px;
    margin-bottom: 30px;
  }
  .location-detail{
    font-family: "MaruBuri";
    font-weight: 600;
    padding-bottom: 15px;
  }
  .location-address{
    line-height: 20px;
  }
  .location-address a{
    color: inherit !important;
    text-decoration: none;
  }
}

.navigation{
  padding-bottom: 50px;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  color: #000000;//#295138;
}
.map-container{
  max-width: $max-width;
}
.navi-image{
  max-width: $max-width;
  .image {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: flex-end;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
}

.navi-apps {
  align-content: center;
  position: relative;
  .ico_comm img {
    vertical-align: middle;
    width: 40px
  }

  div {
    text-align: center;
    padding-top: 10px;
  }

  a{
    text-decoration: none;
  }
}

.cover {
  display: flex;
  justify-content: space-between;
  margin: 22px 10% 22px 10%;
}

.link {
  color: #295238;
}

</style>
