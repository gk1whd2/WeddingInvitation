<template>
  <head>
    <RouterLink to="/"> 
      MainView
    </RouterLink>
    <RouterLink to="/gallery">
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
