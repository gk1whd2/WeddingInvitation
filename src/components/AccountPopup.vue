<template>
<div class="account-pop">
  <div class="layer-pop">
    <div class="account-list">
      <SingleAccountInfo :brideOrGroom=this.brideOrGroom :bankInfo=this.AccountInfo.our />
      <div v-for="bank_info in this.AccountInfo.family" v-bind:key="bank_info" >
        <SingleAccountInfo :brideOrGroom=this.brideOrGroomFamily :bankInfo=bank_info />
      </div>
    </div>
    <div class="btn-wrap type01">
      <a href="javascript:void(0);" class="btn close" :onclick="handleClose">닫기</a>
    </div>
  </div>
  <div class="pop-mask"></div>
</div>
</template>

<script>
import SingleAccountInfo from "./SingleAccountInfo.vue";
export default {
  name: "AccountPopup",
  components:{
    SingleAccountInfo,
  },
  props:['brideOrGroom','AccountInfo'],
  computed:{
    brideOrGroomFamily: function (){
      return this.brideOrGroom+" 혼주" 
    },
  },
  methods: {
    handleClose() {
        this.$emit("close");
    },
  }
};
</script>

<style lang="scss" scoped>

.btn{
  display:block;
  text-align:center;
  font-family: "Noto Sans KR", sans-serif;
  letter-spacing: -0.38px;
  font-weight: bold;
}

.account-pop:before{
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

.account-pop{
  display:block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index:100;
  text-align:center;
  .pop-mask{
    position: absolute;
    top: 0;
    right: 0;
    bottom:0;
    left: 0;
    background: rgba(0,0,0,0.3);
  }
  .layer-pop{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    max-width: 450px;
    width: 90%;
    height: auto;
    background: #fff;
    z-index: 1000;
    padding: 0 10px;
    border: 1px solid #ebebeb;
    box-sizing: border-box;
    margin: auto;
    text-align: left;
    .account-list{
      max-height: 480px;
      overflow-y: auto;
      padding: 24px 10px 0;
    }
    dl{
      margin-bottom: 24px;
      dt{
        position: relative;
        font-size: 16px !important;
        line-height: 24px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        padding-bottom: 10px;
        font-family: "Spoqa Han Sans Neo", sans-serif;
        color: #333;
        .copy-btn{
          position: absolute;
          top: 0;
          right: 0;
          width: 55px;
          height: 22px;
          line-height: 22px;
          background: #757575;
          font-size: 12px !important;
          color: #fff;
          text-align: center;
          border-radius: 20px;
          font-family: "Noto Sans Kr", sans-serif;
        }
      }
      dd{
        font-size: 16px;
        line-height: 24px;
        color: #757575;
        font-family: "Spoqa Han Sans Neo", sans-serif;
        font-weight: 300;
        span{
          color: inherit;
        }
      }
    }
    .btn-wrap{
      margin-top: 32px;
      padding: 0 10px 24px;
      .btn{
        height: 45px;
        line-height: 45px;
        background: #98a3f4;
        color: #fff;
        padding: 0;
        font-family: "Noto Sans Kr", sans-serif;
      }
    }
  }
}

a{
  text-decoration: none;
  cursor: pointer;
}



</style>

