<template>
  <head>
    <RouterLink to="/main"> 
      MainView
    </RouterLink>
    <RouterLink to="/gallery">
      BackUpGalleryView
    </RouterLink>
    <RouterLink to="/gallery_test">
      GalleryView
    </RouterLink>
  </head>
  <body>
    <RouterView/>
  </body>
</template>

<script>
export default {
  name: "App",
  components: {
  }
};
</script>
