<template>
  <div >
    <div v-if="logged">
      <Header :toggle_display_btn="toggle_btn" @menuButtonClick="hideOrShowSidebar()"/>
      <Sidebar :showSidebar="toggle_sidebar" @hideSidebarOnClick="closeSidebarMobile" @logOut="logOut"/>
      <div :style="main_margin0" id="main" @click="closeSidebarMobile">
        <div>
        <router-view :main_item_style0="main_item_style">
        </router-view>
        </div>
      </div>
    </div>
    <div class="login_page" v-else>
      <Login @loggedIn="login" />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Login from './components/Login.vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://10.0.0.105:8000'
axios.defaults.withCredentials = true


export default {
  name: "App",
  
  data() {
    return {
      toggle_btn: '',
      toggle_sidebar: '',
      main_margin0: 'margin-left: 10px',
      main_item_style: '',
      logged: true
    };
  },
  
  components: {
    Sidebar,
    Header,
    Login
  },
  
  methods: {
    hideOrShowSidebar(){
      if (this.toggle_sidebar == 'width: 0px;'){
        this.toggle_sidebar = 'width: 200px;'
      } else {
        this.toggle_sidebar = 'width: 0px;'
        this.main_margin0 = 'margin-left: 0px'
      }
    },
    
    closeSidebarMobile(){
      if (this.toggle_sidebar == 'width: 200px;' && window.innerWidth < 1200){
        this.toggle_sidebar = 'width: 0px;'
      }
    },

    addResizeListener(){
      window.addEventListener('resize', (event) => {this.checkScreenWidth()})
    },

    checkScreenWidth(){
      if (window.innerWidth < 1200){
            this.toggle_btn = 'display: inline-block'
            this.toggle_sidebar = 'width: 0px;'
            this.main_margin0 = 'margin-left: 0px'
            this.main_item_style = 'max-width:500px;max-height:400px;min-width: 400px;'
        } else {
            this.toggle_btn = 'display: none'
            this.toggle_sidebar = 'width: 200px;'
            this.main_margin0 = 'margin-left: 210px'
            this.main_item_style = 'max-width:400vw;max-height:400vh;min-width: 400px;'
        }
    },

    login(status){
      if (status){
        this.logged = true
        this.$router.push('/')
        location.reload()
      } else {
        this.logged = false
      }
    },

    logOut(){
      this.logged = false
    },
    
    autoLogin(){
                axios.get('/auth_user').then((response)=> {
                }).catch((err)=> {
                    this.logged = false
                })
            }
  },
  
  mounted() {
    this.addResizeListener()
    this.checkScreenWidth()
    this.autoLogin()
  }
};
</script>

<style scoped>
#main {
  margin-right: 10px;
}

</style>