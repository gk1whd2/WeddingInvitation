<template>
  <div class="guestbook">
    <div class="description">
      방명록
    </div>
    <GuestBookCard v-for="(guestbook, index) in guestbook_data" :key="index" :guestbook_data="guestbook"/>

    <!-- 방명록 남기기 부분 -->

    </div>
</template>

<script>
import axios from 'axios';
import GuestBookCard from "./GuestBookComponents/GuestBookCard.vue";

export default {
  name: "GuestBook",
  components: {GuestBookCard},
  data() {
    return {
        guestbook_data:[],
    }
  },
  mounted() {
    this.fetchGuestbookData()
  },
  methods: {
    async fetchGuestbookData(){
        try{
            const response = await axios.get('https://was.jong2.site:3000/api/guest_book/latest');
            this.guestbook_data = response.data.guestbook_data;
            console.log(this.guestbook_data)
        } catch (error){
            console.error('Error fetching guestbook data:',error);
        }
    },
  }
};
</script>
<style scoped>
.guestbook {
  max-width: 600px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  background-color: #f9f9fb; 
  .description {
    font-size: 24px;
    letter-spacing: 6px;
    margin-bottom: 30px;
  }
}

.form-group {
  margin-bottom: 15px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.guestbook-list {
  list-style-type: none;
  padding: 0;
}

.guestbook-list li {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>
