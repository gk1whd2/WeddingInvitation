<template>
	<div class="filter-buttons">
		<button class="filter-button" @click="setFilterStatus('All')">All</button>
		<button class="filter-button" @click="setFilterStatus('Selected')">Selected</button>
		<button class="filter-button" @click="setFilterStatus('Unselected')">Unselected</button>
		<button class="filter-button" @click="setFilterStatus('Deleted')">Deleted</button>
		<button class="filter-button" @click="setFilterStatus('liked')">Liked</button>
		<button class="toggle-size-button" @click="toggleAllSize">
			<i class="fas fa-box"></i>
		</button>
	</div>

	<div class="limit-selector">
		<select id="limit" v-model="limit" @change="updateLimit">
		<option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
		</select>
	</div>
</template>

<script>
export default {
  name: "FilterButtons",
  data() {
    return {
		pageSizes: [10,20, 30, 50, 100],
    };
  },
  mounted() {
  },
  methods:{
		setFilterStatus(status){
			this.filterStatus = status;
			this.currentPage = 1;
			this.fetchPhotos();
		},
		toggleAllSize(){
			this.image_size = this.image_size === 'small' ? 'large' : 'small';
		},
		updateLimit() {
			this.currentPage = 1;
			this.loadPage(this.currentPage);
		},
  },
};
</script>

<style lang="scss" scoped>

.filter-button {
	margin-bottom: 10px;
	padding: 10px 10px;
	font-size: 14px;
	color: #333;
	background-color: #f1f1f1;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	text-align: center;
}
</style>
