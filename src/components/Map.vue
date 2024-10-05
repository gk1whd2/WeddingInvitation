<template>
  <div class="location">
    <div class="description">
      오시는 길
    </div>
      <div class="location-detail">
        제이앤제이 아트컨벤션 2층 제이드팰리스홀
      </div>
      <div class="location-address">
        경기도 평택시 비전5로 20-46<br/>
          <a href="tel:031-653-5300">
            031-653-5300
          </a>
      </div>
  </div>
  <div class="navigation">
    <div class="map">
      <div class="map-container" >
          <KakaoMap ref="kakaoMap"
            :lat="center_lat"
            :lng="center_lng"
            :draggable="true"
            :width=$max-width
            :height=250
            :level="level">

            <KakaoMapMarker 
              v-for="(item, index) in parkingLots"
              @onClickKakaoMapMarker="handleMarkerClick(item)"
              :key="'Marker'+index"
              :title="item.title"
              :clickable="true"
              :image="MarkerImage"
              :lat="item.lat"
              :lng="item.lng"/>

            <KakaoMapMarker
              title="JnJ아트컨벤션"
              :z-index="99"
              :lat="center_lat" 
              :lng="center_lng"/>
        </KakaoMap>
      </div>
    </div>
    <div class="pin-help">
      <img src="https://map.pstatic.net/resource/api/v2/image/maps/selected-marker/default@2x.png?version=8" class="parking-log-icon">
      을 클릭하면 주차장 위치를 확인할 수 있습니다.
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
      <br/>

      <div class="navi-image-section">
        <h3 class="expand-button" @click="toggleSection">
          예식장 약도 보기<br><font-awesome-icon :icon="isNaviImageVisible ? 'chevron-up' : 'chevron-down'"/>
        </h3>
      </div>

      <br/>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div class="navi-image-container" v-show="isNaviImageVisible">
          <div class="navi-image">
              <div class="image">
                  <img src="~@/assets/images/예식장_약도.png" />
              </div>
          </div>
        </div>
      </transition>

      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <div class="modal-text">
            <p>
            {{  this.selected_parking_lot }}
            </p>
            <br/>
            <p>{{ this.selected_parking_lot_addr}}</p>
            <p class="copied" v-show=this.parking_lot_addr_copied> 
              {{ this.parking_lot_addr_copied_text}}
            </p>
          </div>
          <button class="modal-button" @click="copyToClipboard">주소 복사</button>
          <button class="modal-button" @click="closeModal">닫기</button>
        </div>
      </div>
  </div>
</template>

<script>

import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faEnvelope);

export default {
  name: "CustomMap",
  components: {KakaoMap, KakaoMapMarker,FontAwesomeIcon},
  data() {
    return {
      isNaviImageVisible:false,

      showModal: false,
      selected_parking_lot : null,
      marker_text : '',
      parking_lot_addr_copied :true,
      parking_lot_addr_copied_text : '',

      level: 3, // 지도의 레벨(확대, 축소 정도),

      //////////////
      tmapUrl: "",
      kakaoTaxiUrl: "",
      navermapUrl: "",
      kakaomapUrl: "",

      MarkerImage: {
        imageSrc:"https://map.pstatic.net/resource/api/v2/image/maps/selected-marker/default@2x.png?version=8",
        imageWidth:"29",
        imageHeight:"42"
      },
      parkingLots: [
        {
          title:"1주차장 골든타워",
          info:{content:"평택시 비전5로 20-9", visible:true},
          lat: "36.9993942",
          lng: "127.1139752",
        },
        {
          title:"2주차장 시계탑",
          info:{content:"평택시 비전5로 21"},
          lat: "37.0007409",
          lng: "127.1135761",
        },
        {
          title:"3주차장 J타워",
          info:{content:"평택시 비전5로 35"},
          lat: "37.0018498",
          lng: "127.1144759",
        },
        {
          title:"4주차장 제1공영추자장",
          info:{content:"평택시 비전동 1099"},
          lat: "37.0009089",
          lng: "127.1151249",
        },
        {
          title:"5주차장 제2공영주차장",
          info:{content:"평택시 죽백동 799"},
          lat: "37.0030418",
          lng: "127.1153637",
        },
        {
          title:"6주차장 세무서",
          info:{content:"평택시 죽백6로 6"},
          lat: "37.0034424",
          lng: "127.1175114",
        },
      ],
      center_lat : 37.000223,
      center_lng : 127.115265,
    };
  },
  mounted() {
    this.makeUrls()
  },
  methods: {
    handleMarkerClick(item){
      this.selected_parking_lot = item.title
      this.selected_parking_lot_addr = item.info.content
      this.openModal()
    },
    makeUrls() {
      // 장소데이터의 이름정보 불러온 뒤
      const locationName = "제이앤제이아트컨벤션"
      this.tmapUrl = "tmap://search?name=" + locationName
      this.kakaoTaxiUrl = "https://t.kakao.com/launch?type=taxi&amp;dest_lat=37.000223&amp;dest_lng=127.115265&amp;ref=localweb"
      this.navermapUrl = "nmap://search?query=" + locationName + "&appname=kimyoon21.github.io/wedding"
      this.kakaomapUrl = "kakaomap://search?q=" + locationName
    },
    toggleSection(){
      this.isNaviImageVisible = !this.isNaviImageVisible;
    },
    beforeEnter(e){
      console.log(this.$refs.kakaoMap.lat);
      console.log(this.$refs.kakaoMap.lng);
      e.style.maxHeight= '0';
      e.style.opacity='0';
      e.style.transition = 'none';
    },
    enter(el){
      el.offsetHeight;
      el.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity= '1';
    },
    leave(el){
      el.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
      el.style.maxHeight = '0'
      el.style.opacity= '0';
    },

    openModal(){
      this.showModal =true;
    },
    closeModal(){
      this.parking_lot_addr_copied = false;
      this.parking_lot_addr_copied_text= '';
      this.showModal = false;
    },
    copyToClipboard(){
      const tempInput = document.createElement('textarea');
      tempInput.value = this.selected_parking_lot_addr
      document.body.appendChild(tempInput);

      tempInput.style.position= 'absolute';
      tempInput.style.left = '-9999px';

      tempInput.select();
      tempInput.setSelectionRange(0, 99999);

      document.execCommand('copy');
      document.body.removeChild(tempInput);

      this.parking_lot_addr_copied = true;
      this.parking_lot_addr_copied_text= '주차장 주소가 복사되었습니다.';
    },
  }
};
</script>

<style lang="scss" scoped>
.location{
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  color: #000000;//#295138;
  background-color: #f9f9fb;
  .description {
    font-size: 1.2em;
    letter-spacing: 2px;
    padding-bottom: 3em;
    font-weight: 600;
    color: #3E4F43;//#505050;
  }
  .location-detail{
    font-family: "MaruBuri";
    //font-weight: 600;
    padding-bottom: 15px;
  }
  .location-address{
    line-height: 1.5em;
  }
  .location-address a{
    color: inherit !important;
    text-decoration: none;
  }
}

.navigation{
  padding-bottom: 20px;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  color: #000000;//#295138;
}
.map-container{
  //max-width: $max-width;
  max-width: 100%;
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

.expand-button{
  cursor: pointer;
}

.pin-help{
  font-size: 0.8em;
  padding-top:1em;
}
.parking-log-icon{
  width: 1em;

}

.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content{
  background-color: white; /* 모달 내용 배경은 흰색 */
  padding: 1em;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  z-index: 9999; /* 가장 앞에 표시되도록 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

.modal-button{
  margin: 1em;
  padding: 1em 2em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.copied{
  font-size: 0.7;
  color: blue;
  padding-top:1em;
  
}
</style>
