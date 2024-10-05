<template>
  <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-myeongjo.css" rel="stylesheet">
  <div class="player-div">
    <div id="player"></div>
  </div>
  <div class="wedding-invite" @mousemove="play_player()" @touchmove="touchstart()">
    <img src="https://was.jong2.site:3000/images/HYH_1311-2.jpg" class="wedding-photo" />
    <div class="text-overlay-corner">
      <font-awesome-icon class="pause-play-button" :icon="playCounter== 1 ? ['fas', 'pause'] : ['fas','play']" @click="play_pause_click()"/>
    </div>
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
      player: null,
      playCounter : 0,
      playerReady:false,
      onlyOnce: 0,
      touchend_value:false,
      VIDEO_ID :'lwuilvtfS4A',//'5Sx7xqv_oYk',
    };
  },
  mounted(){
    this.loadYouTubeAPI();
  },
  methods:{
    touchstart(){
      if (this.onlyOnce ==0){
        this.play_player();
      }
    },
    loadYouTubeAPI(){
      if (typeof window.YT === "undefined"){
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = this.createPlayer;
      }
      else{
        this.createPlayer();
      }
    },
    createPlayer(){
      console.log("Create Player")
      this.player = new window.YT.Player("player", {
        height: "100",
        width: "100",
        videoId: this.VIDEO_ID,
        playerVars:{
          'enablejsapi':1,
          'controles':0,
        },
        events:{
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange,
        },
      });
      console.log(this.player)
    },
    // 플레이어가 준비되었을 때 호출
    onPlayerReady(event) {
      console.log("YouTube player is ready.",event);
      this.playerReady = true;
    },
    // 플레이어 상태가 변경되었을 때 호출
    onPlayerStateChange(event) {
      console.log("Player state changed:", event.data);
      if (event.data == 1){
        this.playCounter = 1
      }
      else{
        this.playCounter = 0
      }
    },
    playVideo(){
      this.player.playVideo();
    },
    unMuteVideo(){
      this.player.unMute();
    },
    play_player(){
      console.log("play_player")
      if (this.playerReady && this.player && this.playCounter!=1 && this.onlyOnce==0){
        this.player.playVideo();
        this.player.unMute();
      }
    },
    pause_player(){
      console.log("Pause Player");
      if (this.playerReady && this.player && this.playCounter==1){
        console.log("pause")
        this.player.pauseVideo();
        this.player.mute();
      }
    },
    play_pause_click(){
      if (this.playerReady && this.player){
        if(this.playCounter==1){
          this.pause_player();
          this.onlyOnce = 1;
        }
        else{
          this.play_player();
        }
      }
    },
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

.player-div{
  display:none;
}
.text-overlay-corner {
  position: absolute;
  top: 2%;
  right: 5%;
  //background: rgba(255, 255, 255, 0);
  padding: 0px 0px;
  text-align: center;
  font-size: 1.5em;
}
.pause-play-button{
  color:rgb(30,48,80);
  cursor:pointer;
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
  // font-family: "MaruBuri";
  // font-size: 18px;
  // color: #000000;//#295238;
  font-family: "MaruBuri", serif;
  font-size: 28px;
  text-align: center;
  color: #000000;//#266653;
  margin: 30px 0;
  font-weight: 600;
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
