<template>
  <div class="heartfelt-wishes">
    <div class="header">
      <h2><strong> 종희 & 유진에게 마음 전하기</strong></h2>
    </div>
    <div class="header-body">
      <h3>축복의 의미로 축의금을 전달해보세요.</h3>
    </div>

    <div class="body">
      <div class="section">
        <ul>
          <div class="section-title btn-wrap">
            <a href="javascript:void(0);" :onclick="open_groom" class="an-btn btn type03 groom"> 신랑 측 계좌번호</a>
            <a href="javascript:void(0);" :onclick="open_bride" class="an-btn btn type03 bride"> 신부 측 계좌번호</a>
          </div>
        </ul>
      </div>
    </div>
    <AccountPopup v-show="is_groom_open" brideOrGroom="신랑" :AccountInfo="groom_info" @open_account="open_groom" @close="close_account"/>
    <AccountPopup v-show="is_bride_open" brideOrGroom="신부" :AccountInfo="bride_info" @open_account="open_bride" @close="close_account"/>

  </div>
</template>

<script>
import AccountPopup from "./AccountPopup.vue";
export default {
  name: "HeartfeltWishes",
  components:{
    AccountPopup,
  },
  data() {
    return {
      is_groom_open: false,
      is_bride_open: false,

      groom_info:{
        our:{
          bank: "새마을금고",
          name: "하종희",
          account: "9003280396481",
        },
        family:[
          {
            bank: "농협",
            name: "하창규",
            account: "11502092221",
          },
          {
            bank: "농협",
            name: "정현숙",
            account: "49912030642",
          },
        ]
      },
      bride_info:{
        our:{
          bank: "국민",
          name: "임유진",
          account: "74470200230378",
        },
        family:[
          {
            bank: "농협",
            name: "임채홍",
            account: "20501851049243",
          },
          {
            bank: "농협",
            name: "김년수",
            account: "20501856012504",
          },
        ]
      },
    };
  },
  methods: {
    open_groom(){
      this.is_groom_open = true;
      this.is_bride_open = false;
    },
    open_bride(){
      this.is_groom_open = false;
      this.is_bride_open = true;
    },
    close_account(){
      this.is_groom_open = false;
      this.is_bride_open = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.heartfelt-wishes{
  max-width: 800px;
  margin: auto;
  text-align: center;
  font-family: "MaruBuri", serif;
  background-color: #f9f9fb; 
  padding: 20px;
}

.header {
  justify-content: space-between;
  margin-bottom: 3px;
  flex: 1;
  padding: 10px;
  white-space: nowrap;
  font-size:1.4em;
}
.header-body{
  flex:0.5;
  margin-bottom: 20px;
  font-size:0.9em;
}

.body {
  display: flex;
  justify-content: space-between;
}

.section {
  flex: 1;
  padding: 10px;
  white-space: nowrap;
}
.section-title {
  margin-bottom: 10px;
}

.btn-wrap{
  padding: 0 6%;
  display: block;
}

.an-btn{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  color: #666;
  margin: 0 auto;
  font-size: 15px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 25px;
}

.btn{
  display:block;
  text-align:center;
  font-family: "Noto Sans KR", sans-serif;
  letter-spacing: -0.38px;
  font-weight: bold;
}

.btn.type03:not(:last-child){
  margin-bottom: 10px;

}
ul {
  list-style: none;
  padding: 5px;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

strong {
  margin-left: 10px;
  font-weight: 600;
}

.h3 {
  padding: 10px;
}

h2, h3{
  color: rgba(60,60,60,0.8);
}

a{
  text-decoration: none;
  cursor: pointer;
}



</style>

