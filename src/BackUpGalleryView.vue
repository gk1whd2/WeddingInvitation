<template>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

	<FilterButtons />
	<div class="filter-buttons">
		<button class="filter-button" @click="setFilterStatus('All')">All</button>
		<button class="filter-button" @click="setFilterStatus('Selected')">Selected</button>
		<button  class="filter-button" @click="setFilterStatus('Unselected')">Unselected</button>
		<button  class="filter-button" @click="setFilterStatus('Deleted')">Deleted</button>
		<button  class="filter-button" @click="setFilterStatus('liked')">Liked</button>
		<button  class="toggle-size-button" @click="toggleAllSize">
			<i class="fas fa-box"></i>
		</button>
	</div>

	<div class="limit-selector">
		<select id="limit" v-model="limit" @change="updateLimit">
		<option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
		</select>
	</div>

	<div class="photo-gallery">
	<div class="photo" v-for="(photo, index) in photos" :key="index">
		<div class="icon-buttons">
				<button :class="['icon-button', getStatusClass(photo,'trash')]" @click="toggleStatus(photo,'trash')">
					<i class="fas fa-circle-minus"></i>
				</button>
				<button :class="['icon-button', getStatusClass(photo, 'check')]" @click="toggleStatus(photo,'check')">
					<i class="fas fa-circle-check"></i>
				</button>
		</div>
		<div class="like-button">
			<div id="heart" :class="['heart', { 'is-active': photo.liked}]" @click="toggleLiked(photo)"> </div>
		</div>

		<img :src="thumbnailUrl(photo.filename)" :class="getSizeClass()" alt="photo" @click=handleClick(photoUrl(photo.filename))>
		<br/> {{ photo.filename }}
	</div>
	</div>

	<!-- 페이지 네비게이션 -->
	<div class="pagination">
		<button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
		<button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
		<span>Page {{ currentPage }} of {{ totalPages }}</span>
		<button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
		<button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
	</div>

	<BottomSheet
		:is-open="isOpen"
		:PhotoUrl="selectedPhotoUrl"
		@close="handleClose"
		v-scroll-lock="isOpen"
	/>
</template>

<script>
import axios from 'axios';
import BottomSheet from "./components/BottomSheet.vue";

export default {
	name: "BackUpGalleryView",
	components: {
		BottomSheet,
	},
	data() {
		return {
			photos: [],
			image_size: 'small',
			currentPage: 1,
			totalPages : 1,
			limit: 20,
			pageSizes: [10,20, 30, 50, 100],
			loading: false,

			filterStatus: 'liked',

			isOpen: false,
			selectedPhotoUrl:'',
			width: 250,
		};
	},	
	created(){
		this.fetchPhotos();
	},
	mounted() {
		this.width = Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		);
	},
	methods:{
		handleClick(url) {
			this.isOpen = true;
			this.selectedPhotoUrl = url;
		},
		handleClose() {
			this.isOpen = false;
		},
		async fetchPhotos(){
			if (this.loading) return ;
			this.loading = true;

			try{
				const response = await axios.get('http://125.178.112.194:3000/api/photos',{
					params:{
						page: this.currentPage,
						limit: this.limit,
						filter: this.filterStatus
					}});
				const {images, total_pages} = response.data;
				this.photos = images;
				this.totalPages = total_pages;
			} catch (error){
				console.error('Error fetching photos:',error);
			} finally{
				this.loading=false;
			}
		},
		async updateImageStatus(photo){
			await axios.post('http://125.178.112.194:3000/api/set_status',{
				file_name: photo.filename,
				status: photo.status,
				liked: photo.liked
			});
		},
		loadMore(){
			if (this.currentPage < this.totalPages) {
				this.currentPage++;
				this.fetchPhotos();
			}
		},
		thumbnailUrl(filename){
			return `http://125.178.112.194:3000/thumbnails/${filename}`;
		},
		photoUrl(filename) {
			return `http://125.178.112.194:3000/images/${filename}`;
		},
		setFilterStatus(status){
			this.filterStatus = status;
			this.currentPage = 1;
			this.loading=false;
			this.fetchPhotos();
		},
		toggleStatus(photo,button_type){
			if (button_type === 'trash'){
				if (photo.status === 'Deleted'){
					photo.status = 'Unselected';
				}else{
					photo.status = 'Deleted';
				}
			}else if(button_type == 'check'){
				if (photo.status === 'Selected'){
					photo.status = 'Unselected';
				}else{
					photo.status = 'Selected';
				}
			}
			this.updateImageStatus(photo);
			//this.fetchPhotos();
		},
		getStatusClass(photo,button_type){
			if (button_type == 'trash'){
				if (photo.status === 'Deleted') {
					return 'deleted-icon';
				} else {
					return 'unselected-icon';
				}
			}
			else if (button_type == 'check'){
				if (photo.status === 'Selected') { 
					return 'selected-icon';
				} else {
					return 'unselected-icon';
				}
			}
		},
		toggleLiked(photo){
			if (photo.liked == 1){
				photo.liked = 0;
			}
			else{
				photo.liked = 1;
			}
			this.updateImageStatus(photo);
		},
		toggleAllSize(){
			this.image_size = this.image_size === 'small' ? 'large' : 'small';
		},
		getSizeClass(){
			return this.image_size === 'small' ? 'small-image' : 'large-image';
		},
		async loadPage(page) {
			if (page >= 1 && page <= this.totalPages) {
				this.currentPage = page;
				this.fetchPhotos();
			}
		},
		goToPage(page) {
			this.loadPage(page);
		},
		updateLimit() {
			this.currentPage = 1;
			this.loadPage(this.currentPage);
		},
	}
};
</script>

<style lang="scss" scoped>
.photo-gallery {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.photo {
	margin: 10px;
	position: relative;
}
.photo img {
	object-fit: cover;
	border-radius: 5px;
}
.small-image{
	max-height: 255px;
}
.large-image{
	max-width: 100%;
}
.size-icon{
	right: 50px;
}
.spinner {
	border: 2px solid #f3f3f3;
	border-radius: 50%;
	border-top: 2px solid #fff;
	width: 16px;
	height: 16px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 50%;
	transform: translateY(-50%) translateX(-50%);
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

.load-more-button {
	width:100%;
	padding: 10px 20px;
	font-size: 16px;
	color: #333;
	background-color: #f1f1f1;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	text-align: center;
	transition: background-color 0.3s, border-color 0.3s;
}
.load-more-button:hover {
	background-color: #e1e1e1;
	border-color: #ccc;
}
.load-more-button:active {
	background-color: #d1d1d1;
	border-color: #bbb;
}
.load-more-button:disabled {
	background-color: #6c757d;
	cursor: not-allowed;
}

.icon-buttons{
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	gap: 5px;
}
.icon-button {
	color: white; /* 아이콘 색상 */
	border: none;
	border-radius: 50%;
	padding: 0px;
	cursor: pointer;
	font-size: 1.5em;
	text-align: center;
	vertical-align: middle;
	transition: background-color 0.3s;
	width: 1em;
	height: 1em;
	background-color: rgba(0,0,0,0);
}
.icon-button:hover {
	//background-color: rgba(128,128,128, 0.8); /* 호버 시 배경색 변화 */
}

.icon-button i {
	pointer-events: none; /* 아이콘 클릭 이벤트 방지 */
}

.unselected-icon {
	//background-color: rgba(0,0,0,0);
}
.selected-icon {
	//background-color: #28a745;
	color: #28a745;
}
.deleted-icon {
	//background-color: #dc3545;
	color: #dc3545;
}
.like-icon {
	//background-color: pink;
	color: pink;
}

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


.loading-indicator {
  text-align: center;
  font-size: 18px;
}

.like-button{
	position: absolute;
	bottom: -5px;
	left: -20px;
	display: flex;
}

.heart {
  width: 80px;
  height: 80px;
  background: url("~@/assets/heart.png") no-repeat;
  background-position: 0px 0px;
  background-size: cover;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
  &.is-active {
    transition-duration: 1s;
    background-position: -2240px 0;
  }
  -webkit-tap-highlight-color: transparent;
}

.preload{
	display:none;
}

</style>
