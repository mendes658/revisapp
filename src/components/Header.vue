<template>
  <nav class="navbar navbar-dark bg-dark sticky-top">
    <div class="d-flex ">
      <button
        @click="$emit('menuButtonClick')"
        :style="toggle_display_btn"
        class="icon-btn"
        type="button"
      >
        <img src="../assets/icons/menu_hamb_white.png" class="icon-img" />
      </button>
      <router-link to="/" class="navbar-brand" @click="scrollTop"><img src="../assets/icons/revisapp-logo.png" alt="" class="logo"></router-link>
    </div>
    <div>
      <a href="https://github.com/mendes658" target="blank" class="img-link" style="margin-right: 20px">
        <img src="../assets/icons/github_white.png" alt="github" class="icon">
      </a>
      <a href="https://www.linkedin.com/in/pedromendes658" target="blank" class="img-link">
        <img src="../assets/icons/linkedin.png" alt="linkedin" class="icon">
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
    };
  },
  props: {
    toggle_display_btn: String,
  },
  emits: ["menuButtonClick"],
  methods: {
    scrollTop(){
        window.scrollTo(0, 0)
      }
  }
};
</script>

<style scoped>
.navbar {
  z-index: 51;
  position: sticky;
  top: 0;
  background-color: rgb(12, 15, 34) !important;
}
.navbar-brand {
  width: 100px;
  text-align: center;
  margin-left: 10px;
}
.navbar-brand:hover {
    transition: 0.5s;
    filter: drop-shadow(0px 0px 2px rgb(255, 255, 255));
}
.d-flex {
  padding-left: 10px;
}
.icon-img {
  width: 30px;
  height: 30px;
}
.icon-btn {
  outline: none;
  background: none;
  border-style: inset;
  border-color: transparent;
  border-radius: 6px;
  border-spacing: 0px;
}
.icon-img:hover {
  filter: drop-shadow(0px 0px 2px rgb(255, 255, 255));
}
.icon-img:active {
  filter: drop-shadow(0px 0px 2px rgb(0, 17, 255));
}
.logo {
  max-height: 35px;
  width: auto;
}
.icon {
    max-height: 35px;
    margin-right: 10px;
}
</style>