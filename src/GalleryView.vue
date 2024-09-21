<template>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

	<FilterButtons @loadPage="loadPage" @fetchPhotos="fetchPhotos" @updateFilterStatus="updateFilterStatus"/>

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

	<PageNavigation @loadPage="loadPage" @fetchPhotos="fetchPhotos" :currentPageProps=this.currentPage :totalPagesProps=this.totalPages />

	<BottomSheet
		:is-open="isOpen"
		:PhotoUrl="selectedPhotoUrl"
		@close="handleClose"
		v-scroll-lock="isOpen"
	/>
</template>

<script>
import axios from 'axios';
import FilterButtons from "./GalleryComponents/FilterButtons.vue";
import PageNavigation from "./GalleryComponents/PageNavigation.vue";
import BottomSheet from "./components/BottomSheet.vue";

export default {
	name: "GalleryView",
	components: {
		BottomSheet,
		FilterButtons,
		PageNavigation,
	},
	data() {
		return {
			photos: [],

			image_size: 'small',
			currentPage: 1,
			totalPages : 1,
			limit: 20,
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
				const response = await axios.get('https://was.jong2.site:3000/api/photos',{
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
			await axios.post('https://was.jong2.site:3000/api/set_status',{
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
			return `https://was.jong2.site:3000/thumbnails/${filename}`;
		},
		photoUrl(filename) {
			return `https://was.jong2.site:3000/images/${filename}`;
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
		getSizeClass(){
			return this.image_size === 'small' ? 'small-image' : 'large-image';
		},
		updateFilterStatus(status, page, limit){
			this.filterStatus = status
			this.currentPage = page
			this.limit = limit
		},
		async loadPage(page) {
			if (page >= 1 && page <= this.totalPages) {
				this.currentPage = page;
				this.fetchPhotos();
			}
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

</style>
