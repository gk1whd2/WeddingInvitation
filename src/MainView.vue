<template>
  <div id="jong2">
    <MainPage />
    <MainDivider />
    <MainSpacer />
    <HeaderImage />
    <Story />
    <Contact />
    <CustomGallery />
    <Map />
	<HeartfeltWishes />
  </div>
</template>

<script>
import MainPage from "./components/MainPage.vue";
import MainSpacer from "./components/MainSpacer.vue";
import MainDivider from "./components/MainDivider.vue";
import HeaderImage from "./components/HeaderImage.vue";
import Contact from "./components/Contact.vue";
import Story from "./components/Story.vue";
import CustomGallery from "./components/CustomGallery.vue";
import Map from "./components/Map.vue";
import HeartfeltWishes from "./components/HeartfeltWishes.vue";

export default {
  name: "MainView",
  components: {
    MainPage,
    MainSpacer,
    MainDivider,
    HeaderImage,
    Story,
    Contact,
    CustomGallery,
    Map,
	HeartfeltWishes,
  },
  data() {
  },
};
</script>

<style>
@font-face {
  font-family: "Cafe24Oneprettynight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Noto Sans KR", sans-serif;
  src: url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap");
  font-weight: normal;
  font-style: normal;
}

@font-face{
  font-family: "Nanum Myeongjo";
  src: url("https://hangeul.pstatic.net/hangeul_static/css/nanum-myeongjo.css");
  font-weight: normal;
  font-style: normal;
}


html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

#jong2 {
  font-family: "MaruBuri", serif;/*"Nanum Myeongjo", serif;*/
  margin: 0 auto;
  font-size: 17px;
  color: #000000; /* #202121; */
  background-color: #FFFFFF; /* #fffdf9;*/
  max-width: 1000px !important;
}
</style>
