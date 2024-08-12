<template>
  <div class="contact">
    <div class="header">
      <div class="section">
        <h2><strong> 신랑 </strong></h2>
        <div class="icons">
          <a :href="`tel:${groomPhone}`">
            <font-awesome-icon icon="phone" />
          </a>
          <a :href="`sms:${groomPhone}`">
            <font-awesome-icon :icon="['far', 'envelope']" />
          </a>
        </div>
      </div>
      <div class="section">
        <h2><strong> 신부 </strong></h2>
        <div class="icons">
          <a :href="`tel:${bridePhone}`">
            <font-awesome-icon icon="phone" />
          </a>
          <a :href="`sms:${bridePhone}`">
            <font-awesome-icon :icon="['far', 'envelope']" />
          </a>
        </div>
      </div>
    </div>

    <div class="body">
      <div class="section">
        <div class="section-title">
          <h3> 신랑 측 혼주</h3>
        </div>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div v-show="isSectionVisible" class="content">
            <ul>
              <li> 아버지 <b><strong>하창규</strong></b></li>
              <li>
                <div class="icons">
                  <a :href="`tel:${groomFatherPhone}`">
                    <font-awesome-icon icon="phone" />
                  </a>
                  <a :href="`sms:${groomFatherPhone}`">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                  </a>
                </div>
              </li>
            </ul>
            <ul>
              <li> 어머니 <strong>정현숙</strong></li>
              <li>
                <div class="icons">
                  <a :href="`tel:${groomMotherPhone}`">
                    <font-awesome-icon icon="phone" />
                  </a>
                  <a :href="`sms:${groomMotherPhone}`">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <div class="section">
        <h3 class="expand-button" @click="toggleSection">
          <font-awesome-icon :icon="isSectionVisible ? 'chevron-up' : 'chevron-down'" />
        </h3>
      </div>

      <div class="section">
        <div class="section-title">
          <h3> 신부 측 혼주</h3>
        </div>
        <transition 
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div v-show="isSectionVisible" class="content">
            <ul>
              <li> 아버지 <strong>임채홍</strong></li>
              <li>
                <div class="icons">
                  <a :href="`tel:${brideFatherPhone}`">
                    <font-awesome-icon icon="phone" />
                  </a>
                  <a :href="`sms:${brideFatherPhone}`">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                  </a>
                </div>
              </li>
            </ul>
            <ul>
              <li> 어머니 <strong>김연수</strong></li>
              <li>
                <div class="icons">
                  <a :href="`tel:${brideMotherPhone}`">
                    <font-awesome-icon icon="phone" />
                  </a>
                  <a :href="`sms:${brideMotherPhone}`">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPhone, faEnvelope, faChevronDown, faChevronUp);

export default {
  name: "CustomContact",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isSectionVisible:false ,
      groomFatherPhone: '010-5026-1129',
      groomMotherPhone: '010-8863-6438',
      brideFatherPhone: '010-6581-8811',
      brideMotherPhone: '010-4340-6805',
      groomPhone: '010-8543-3435',
      bridePhone: '010-5163-2461',
    }
  },
mounted() {
	this.toggleSection();
},
  methods: {
    toggleSection() {
      this.isSectionVisible = !this.isSectionVisible;
    },
    beforeEnter(e){
      e.style.maxHeight = '0';
      e.style.opacity = '0';
      e.style.transition = 'none';
    },
    enter(el){
      el.offsetHeight;
      el.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity='1';
    },
    leave(el){
      el.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
      el.style.maxHeight = '0';
      el.style.opacity = '0';
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  max-width: 800px;
  margin: auto;
  text-align: center;
  font-family: "MaruBuri", serif;
  background-color: #f9f9fb; 
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.body {
  display: flex;
  justify-content: space-between;
}


.section {
  flex: 1;
  padding: 10px;
  white-space: nowrap;
}
.section-title {
  flex: 1;
  padding: 10px;
  white-space: nowrap;
}

.icons {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  font-size: 1.4em;
}

.icons font-awesome-icon {
  margin: 10px 10px;
  padding: 5px;
}

.icons a{
  color: inherit !important;
  text-decoration: none;
}

.icons a:hover{
  color:inherit !important;
}

ul {
  list-style: none;
  padding: 5px;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

svg {
  margin: 0px 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

strong {
  margin-left: 10px;
  font-weight: 600;
}

expand-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h3 {
  padding: 10px;
}

h2, h3{
  color: rgba(60,60,60,0.8);
}

h3 font-awesome-icon {
  margin-left: 5px;
}


.content{
  overflow: hidden;
  padding: 10ps;
  max-height: 200px;
  opacity:0;
  transition: max-height 0.5s ease, opacity 0.5s ease;
}

</style>
