<template>
  <div class="guestbookcard">
    GuestBookCard
    <button :onclick="this.print_data">출력</button>
    <br/>
    {{ this.guestbook_data.contents }}
  </div>
</template>

<script>

export default {
  name: "CustomMap",
  props: ['guestbook_data',],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    print_data(){
        console.log(this.guestbook_data);
    },
  }
};
</script>

<style scoped>
.guestbookcard {
}
</style>