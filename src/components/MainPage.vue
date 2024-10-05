<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-myeongjo.css" rel="stylesheet">
  <div class="main-page">
    <div class="wedding-invite" @click="startPlayback()" @touchstart="startPlayback()">
      <img src="https://was.jong2.site:3000/images/HYH_1311-2.jpg" class="wedding-photo" />
      <div class="text-overlay-corner">
        <font-awesome-icon class="pause-play-button" :icon="this.isPlay? ['fas', 'pause'] : ['fas','play']" @click.stop="play_pause_click()"/>
      </div>
      <div class="text-overlay-bottom">
        <h1 class="happy-wedding"><p class="left">Wedding</p> <p class="right">Invitation</p></h1>
      </div>
    </div>

    <div class="main-title">
      <h1 class="no-wrap"> 하종희 & 임유진 </h1>
      <p>
        결혼합니다.
      </p>
    </div>

    <div class="location-date">
      <p> 2024.11.09 토요일 14:40 </p>
      <p> 평택 제이앤제이 아트컨벤션 </P>
      <p> 2층 제이드 팰리스 홀 </p>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPause, faPlay);

export default {
  name: "MainPage",
  components:{
    FontAwesomeIcon,
  },
  data(){
    return {
      audio: null,
      playStatus: false,
      playOnce: false,
      //VIDEO_ID :'lwuilvtfS4A',//'5Sx7xqv_oYk',
    };
  },
  computed:{
      isPlay : function(){
        return this.playStatus;
      }
  },
  mounted(){
    this.audio = new Audio(require('@/assets/musics/November_song.mp3'));
  },
  methods:{
    startPlayback(){
      if(!this.playStatus && !this.playOnce){
        this.playStatus = true;
        this.playOnce = true;
        this.playAudio();
      }
    },
    playAudio(){
      if (this.audio){
        this.audio.play().then(() => {
          console.log('Playback stgarted successfully');
        })
        .catch((error) => {
          this.playStatus = false;
          this.playOnce = false
          console.log('Playback failed:', error);
        });
      }
    },
    pauseAudio(){
      if(this.audio){
        this.audio.pause();
      }
    },
    play_pause_click(){
      if(this.playStatus){
        this.playStatus = false;
        this.pauseAudio();
      }
      else{
        this.playStatus = true;
        this.playAudio();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "OverlayTop";
  //src: url("@/assets/fonts/Deluxe Edition - Demo.ttf") format('truetype');
  //src: url("@/assets/fonts/Birds of Paradise.ttf") format('truetype');
  //src: url("@/assets/fonts/Happy Selfie.ttf") format('truetype');
  //src: url("@/assets/fonts/Huge Salmon.otf") format('truetype');
  //src: url("@/assets/fonts/MilkyVintage.ttf") format('truetype');
  src: url("@/assets/fonts/Mermaid1001.ttf") format('truetype');
  font-weight: normal;
  font-style: normal;
}

.happy-wedding{
  font-family: "OverlayTop";
  //color: rgb(28, 196, 211);
  //color: #95CC90;
  color: #3E7043;
  letter-spacing: 0.1em;
  font-size: 3.5em;
  //font-weight: 600;
  margin: 10px;
  line-height: 1.2;
  .left{
    text-align:left;
    font-size: 1.1em;
  }
  .right{
    text-align:right;
    font-size: 0.9em;
  }
}

.main-page{
  padding-bottom: 2em;
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

.text-overlay-corner {
  position: absolute;
  top: 2%;
  right: 2%;
  //background: rgba(255, 255, 255, 0);
  padding: 0px 0px;
  text-align: center;
  font-size: 1.5em;
}
.pause-play-button{
  color:rgb(30,48,80);
  background-color: rgba(255,255,255,90);
  opacity: 80%;
  border-radius: 7px;
  padding: 5px;
  cursor:pointer;
}
.text-overlay-bottom {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0);
  padding: 0px 0px;
  text-align: center;
  width: 100%;
}

.main-title{
  padding: 0px 10px;
  padding-bottom: 2em;
  text-align: center;

  //font-family: "MaruBuri", serif;
  font-size: 1em;
  text-align: center;
  color: #000000;//#266653;
  margin: 30px 0 10px 0;
  line-height: 1.8;
}

.location-date{
  white-space: nowrap;

  padding-left: $padding-vertical;
  padding-right: $padding-vertical;

  font-size: 1em;
  line-height: 1.8;
  text-align: center;
}

.no-wrap {
  white-space: nowrap;
}
</style>
