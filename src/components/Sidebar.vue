<template>
  <div class="sidebar0">
    <nav id="sidebarMenu" :style="showSidebar" class="d-lg-block sidebar bg-white" >
      <div class="position-sticky">
        <div class="list-group list-group-flush mt-3">
          <router-link to="/" @click="scrollTop" :class="'list-group-item list-group-item-action py-2 ripple ' + activeBar['']">
            <img src="../assets/icons/myprofile.png" alt="" class="icon">  Meu Perfil
          </router-link>
          <router-link to="/subjects" @click="scrollTop" :class="'list-group-item list-group-item-action py-2 ripple ' + activeBar.subjects">
            <img src="../assets/icons/subjects.png" alt="" class="icon">  Minhas Matérias
          </router-link>
          <router-link to="/help" @click="scrollTop" :class="'list-group-item list-group-item-action py-2 ripple ' + activeBar.help">
           <img src="../assets/icons/help.png" alt="" class="icon-help"> Ajuda
          </router-link>
          <router-link to="" @click="logOut" :class="'list-group-item list-group-item-action py-2 ripple '">
            <img src="../assets/icons/logout.png" alt="" class="icon">  Sair
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios from 'axios'


  export default {
    name: "Sidebar",
    props: {
      showSidebar: String
    },
    data(){
      return{
        activeBar: {'logout': '', '': '', 'subjects': '', 'help': ''}
      }
    },
    components: {
    },
    methods: {
      scrollTop(){
        window.scrollTo(0, 0)
        this.$emit('hideSidebarOnClick')
        setTimeout(()=>{
          this.updateHighlightBar()
        }, 50)
        
      },
      
      /*Lê o fim da url atual e adiciona uma classe ao dicionário "activeBar" 
        Essa classe é lida pelo link respectivo na sidebar e adiciona o efeito de "ativo"*/
      updateHighlightBar(){
        let linkName = window.location.href
        linkName = linkName.split('/')
        linkName = linkName[linkName.length - 1]

        let keys = Object.keys(this.activeBar)   
        keys.forEach(key => {
          if (key === linkName){
            this.activeBar[key] = 'active0'
          } else {
            this.activeBar[key] = ''
          }

        });

      },

      /*Manda um get para a API excluir o token salvo no navegador */
      logOut(){
        axios.get('/log_out').catch(()=>{
        }).then(()=>{
          this.$emit('logOut')
        })
      }

    },
    emits: ['hideSidebarOnClick', 'logOut'],
    mounted(){
      this.updateHighlightBar()
    }
  }

</script>

<style scoped>
#sidebarMenu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 50px 0 0; /* Height of navbar */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 200px;
  z-index: 50;
  overflow-x: hidden;
  transition: width 0.3s;
  background-color: rgba(255, 255, 255, 0.95) !important;
}

.active0 {
  box-shadow: 0px 3px 0px 0 rgba(255, 196, 0, 0.541), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.list-group-item:hover {
  box-shadow: 0px 3px 0px 0 rgba(255, 196, 0, 0.541), 0 2px 10px 0 rgb(0 0 0 / 12%);
}
.list-group-item {
  width: 200px;
  background-color: transparent;
}
.icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}
.icon-help{
  height: 30px;
  width: 30px;
  margin-right: 5px;
}

</style>