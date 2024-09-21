<template>
    <div class="account-info">
        <dl>
            <dt>
                <span>{{this.brideOrGroom}}</span>
                계좌 
                <a href="#" class="copy-account copy-btn" data-account=this.bankInfo.account> 복사하기</a>
            </dt>
            <dd>
                <span> {{ this.bankInfo.bank }}</span>
                &nbsp;&nbsp;(예금주: 
                <span>{{ this.bankInfo.name }}</span>
                )
            </dd>
            <dd>
                <span>{{ this.bankInfo.account}}</span>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
  name: "SingleBankInfo",
  props:['brideOrGroom', 'bankInfo'],
  methods: {
    mounted() {
        console.log(this.bankInfo)
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

a{
  text-decoration: none;
  cursor: pointer;
}



</style>
