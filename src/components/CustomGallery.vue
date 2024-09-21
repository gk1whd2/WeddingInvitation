<template>
  <div class="gallery" ref="gallery">
    <div class="description">
      Photo Gallery
    </div>

    <div class="gallery-container" ref="gal">
      <div class="gallery-item" v-for="(photo, index) in photos" :key="index">
        <img :src="thumbnailUrl(photo.filename)" :alt="'photo' + photo.filename + '_' + (index + 1)"
          @click=handleClick(thumbnailUrl(photo.filename)) :style="{
          filter: `blur(${zoom_level}px)`,
        }" />
      </div>
    </div>
  </div>
  <DetailImageView :is-open="isOpen" :PhotoUrl="selectedPhotoUrl" @close="handleClose" v-scroll-lock="isOpen" />
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

      scrollX: 0,
      zoom_width: 0,
      zoom_level: 0,
      width: 320,
      zoomX: 1,
      zoomLevel: -1,
    };
  },
  mounted() {
    this.width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    this.$refs.gal.scrollLeft = 0;
    this.zoom_width = window.innerWidth;
    this.updateZoomX();
    window.addEventListener('resize', this.updateZoomX);

    this.updateZoomX();
    this.fetchPhotos();
  },
  beforeUnmount() {
    // window.removeEventListener('resize');
  },
  methods: {
    updateZoomX() {
      let new_zw = window.innerWidth;
      this.zoom_level = 10 * ((this.zoom_width / new_zw) - 1) <=
        1
        ? 0
        : 10 * ((this.zoom_width / new_zw) - 1) > 3
          ? 3
          : 10 * ((this.zoom_width / new_zw) - 1)
      this.zoomX = (new_zw / this.zoom_width)
      this.zoom_level = 0;
    },
    thumbnailUrl(filename) {
      return `https://was.jong2.site:3000/thumbnails/${filename}`;
    },
    photoUrl(filename) {
      return `https://was.jong2.site:3000/images/${filename}`;
    },
    handleClick(url) {
      console.log(url)
      this.isOpen = true;
      this.selectedPhotoUrl = url;
    },
    handleClose() {
      this.isOpen = false;
    },
    async fetchPhotos() {
      if (this.loading) return;
      this.loading = true;

      try {
        const response = await axios.get('https://was.jong2.site:3000/api/gallery_photos', {
          params: {
            page: 1,
            limit: 20,
            filter: 'liked'
          }
        });
        const { images, total_pages } = response.data;
        this.photos = images;
        this.totalPages = total_pages;
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
  padding-top: 32px;
  padding-bottom: 50px;
  padding-left: $padding-vertical/2;
  padding-right: $padding-vertical/2;
  text-align: center;
  color: #000000;//#295138;
  // overflow: hidden;

  .description {
    font-size: 24px;
    letter-spacing: 6px;
    margin-bottom: 30px;
  }

  .gallery-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
  }
  .gallery-item {
    width:100%;
    overflow: hidden;
  }
  .gallery-item img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
