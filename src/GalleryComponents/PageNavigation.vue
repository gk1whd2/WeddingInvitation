<template>
	<!-- 페이지 네비게이션 -->
	<div class="pagination">
		<button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
		<button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
		<span>Page {{ currentPage }} of {{ totalPages }}</span>
		<button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
		<button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
	</div>
</template>

<script>
export default {
  name: "PageNavigation",
  props:['currentPageProps','totalPagesProps'],
  data() {
    return {
    };
  },
  computed: {
	currentPage: function(){
		return this.currentPageProps
	},
	totalPages: function(){
		return this.totalPagesProps
	}
  },
  mounted() {
  },
  methods:{
		goToPage(page) {
			this.$emit('loadPage',page);
		},
  },
};
</script>

<style lang="scss" scoped>

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.pagination button {
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
