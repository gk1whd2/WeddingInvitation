<template>
    <div class="account-info">
        <dl>
            <dt>
                <span>{{this.brideOrGroom}}</span>
                계좌 
            </dt>
            <dd v-for="(bankInfo, index) in this.bankInfo" :key="index" class="each-account">
                <p>
                    {{ bankInfo.bank }}&nbsp;&nbsp;(예금주: {{ bankInfo.name }})
                    <br/>
                    {{ bankInfo.account}}
                    <a href="javascript:void(0);" :onclick="this.copy_account" class="copy-account copy-btn" :data-account-name="bankInfo.bank" :data-account="bankInfo.account"> 복사하기</a>
                </p>
                <br/>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
  name: "SingleBankInfo",
  props:['brideOrGroom', 'bankInfo'],
  methods: {
    copy_account(e){
        console.log(e)
        let account_value = e.target.attributes['data-account'].value
        let account_bank = e.target.attributes['data-account-name'].value
        
        var tempInput = document.createElement('input');
        tempInput.value = account_value
        document.body.appendChild(tempInput);

        tempInput.style.position= 'absolute';
        tempInput.style.left = '-9999px';

        tempInput.select();
        tempInput.setSelectionRange(0, 99999);

        var successful = document.execCommand('copy');

        if (successful){
            alert("계좌번호가 복사되었습니다: " + account_bank + " " + account_value);
        } else {
            alert("복사에 실패했습니다.");
        }

        document.body.removeChild(tempInput);
        
    }
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
    }
    dd{
        display:flex;
        position: relative;
        font-size: 16px;
        line-height: 24px;
        color: #757575;
        font-family: "Spoqa Han Sans Neo", sans-serif;
        font-weight: 300;
        span{
            color: inherit;
        }
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
}

a{
  text-decoration: none;
  cursor: pointer;
}
.each-account{
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 5px;
    margin-bottom: 5px;
}



</style>
