<template>
  <div class="gallery" ref="gallery">
    <div class="description">
      Photo Gallery
    </div>

    <div class="gallery-container" ref="gal">
      <div class="gallery-item" v-for="(photo, index) in displayedImages" :key="index">
        <img class="gallery-img" :src="thumbnailUrl(photo.filename)" :alt="'photo' + photo.filename + '_' + (index + 1)"
          @click=handleClick(photoUrl(photo.filename),index) />
      </div>
    </div>

    <div v-if="hasMoreImages" class="load-more-images">
      <button @click="loadMoreImages" class="load-more-btn"> 더보기 </button>
    </div>
  </div>
  <DetailImageView :is-open="isOpen" :PhotoUrl="selectedPhotoUrl" @getOtherImage="getOtherImage" @close="handleClose" v-scroll-lock="isOpen" />
</template>

<script>
import axios from 'axios';
import DetailImageView from './DetailImageView.vue';
export default {
  name: "CustomGallery",
  components: {
    DetailImageView,
  },
  data() {
    return {
      photos: [],
      loading: false,
      isOpen: false,
      selectedPhotoUrl: '',

      imagesPerRow: 3,
      displayedRows: 3,
    };
  },
  computed: {
    displayedImages(){
      return this.photos.slice(0, this.imagesPerRow * this.displayedRows);
    },
    hasMoreImages(){
      return this.photos.length > this.displayedImages.length;
    }
  },
  mounted() {
    this.fetchPhotos();
  },
  methods: {
    loadMoreImages(){
      this.displayedRows+=1;
    },
    thumbnailUrl(filename) {
      return `https://was.jong2.site:3000/thumbnails/${filename}`;
    },
    photoUrl(filename) {
      //return `https://was.jong2.site:3000/images/${filename}`;
      return `https://was.jong2.site:3000/resized/${filename}`;
    },
    handleClick(url,index) {
      //console.log(url)
      this.isOpen = true;
      this.current_index = index;
      this.selectedPhotoUrl = url;

      document.body.style.overflow = 'hidden';
    },
    handleClose() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },
    getOtherImage(index){
      let other_index = this.current_index + index;
      if (other_index<0) {
        other_index = this.photos.length-1;
      } else if (other_index >= this.photos.length){
        other_index =0;
      }
      
      this.current_index = other_index;
      this.selectedPhotoUrl = this.photoUrl(this.photos[this.current_index].filename);
      return this.selectedPhotoUrl;
    },
    async fetchPhotos() {
      if (this.loading) return;
      this.loading = true;

      try {
        const response = await axios.get('https://was.jong2.site:3000/api/gallery_photos', {
          params: {
            page: 1,
            limit: 50,
            filter: 'liked'
          }
        });
        const { images, total_pages } = response.data;
        this.photos = images;
        this.totalPages = total_pages;
        console.log(images);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        this.loading = false;
      }
    },
    getStatusClass(photo, button_type) {
      if (button_type == 'trash') {
        if (photo.status === 'Deleted') {
          return 'deleted-icon';
        } else {
          return 'unselected-icon';
        }
      }
      else if (button_type == 'check') {
        if (photo.status === 'Selected') {
          return 'selected-icon';
        } else {
          return 'unselected-icon';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery {
  padding-top: 2em;
  padding-bottom: 3em;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  color: #000000;//#295138;
  //overflow: hidden;

  .description {
    font-size: 1.2em;
    letter-spacing: 2px;
    padding-bottom: 2em;
    font-weight: 600;
    color: #3E4F43;//#505050;
  }

  .gallery-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
  }
  .gallery-item {
    width: 100%;
    overflow: hidden;

    .gallery-img{
      object-fit: over;
      width:100%;
    }
  }
  .load-more-btn{
    padding: 1em 2em;
    background-color: #A0A0A0;
    color: white;
    border: none;
    cursor: pointer;
    border-radius:5ps;
    margin-top: 20px;
  }
}
</style>
