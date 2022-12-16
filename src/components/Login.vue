<template>
    <div>
        <div class="container0 container-fluid">
            <div class="logo-div">
                <img src="../assets/icons/revisapp-logo.png" alt="revisapp-logo" class="logo">
            </div>
            <div class="container main-login">
                <div class="form-group">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" v-model="user" id="username" class="form-control">
                </div>
                <div class="form-group" @keypress="pressedEnter($event)">
                    <label for="password" class="form-label">Senha</label>
                    <input type="password" v-model="pass" id="password" class="form-control">
                </div>
                <div class="form-group" v-if="createAccountScreen" @keypress="pressedEnter($event)">
                    <label for="password-confirm" class="form-label">Confirme sua senha</label>
                    <input type="password" v-model="passConfirm" id="password-confirm" class="form-control">
                </div>
                <div class="main-btns" style="display:table;">
                    <div style="display:table-cell;" v-if="!createAccountScreen">
                        <button @click="login" class="btn btn-success">Login</button>
                    </div>
                    <div style="display:table-cell;" v-if="createAccountScreen" >
                        <button @click="createNewAccount()" class="btn btn-success new-user create-new" :style="marginCreate">Cadastrar</button>
                    </div>
                    <div style="display:table-cell;" v-else>
                        <button @click="showCreateAccount()" class="btn btn-success new-user" :style="marginCreate">Criar nova conta</button>
                    </div>
                    <div style="display:table-cell;"  v-if="createAccountScreen">
                        <button @click="showCreateAccount()" class="btn btn-secondary cancel">Voltar</button>
                    </div>
                    <div class="alert alert-danger" role="alert" :style="alerts['wrongUser']">
                        Usuário e/ou senha incorretos
                    </div>
                    <div class="alert alert-success" role="alert" :style="alerts['successAlert']">
                        Conta criada com sucesso!
                    </div>
                    <div class="alert alert-danger" role="alert" :style="alerts['unavailableUser']">
                        Nome de usuário indisponível
                    </div>
                    <div class="alert alert-danger" role="alert" :style="alerts['sizeErrorPassword']">
                        A senha precisa ter 5 ou mais caracteres
                    </div>
                    <div class="alert alert-danger" role="alert" :style="alerts['sizeErrorUser']">
                        O username precisa ter 5 ou mais caracteres
                    </div>
                    <div class="alert alert-danger" role="alert" :style="alerts['confirmPassError']">
                        Senhas não conferem
                    </div>
                </div>
            </div>
        </div>
        <div class="container0" style="margin-top: 5px; padding-top: 10px; max-height: max-content; margin-bottom: 30px;">
            <div style="display: flex;" class="section-title">
                <div class="triangle"></div>
                <div class="triangle-text"><h2>SOBRE MIM</h2></div>          
            </div>
            <div class="main-text">
                <p>&nbsp;Olá! Meu nome é Pedro Mendes, tenho 20 anos e atualmente estou no segundo semestre de Engenharia de Computação na Universidade
                    Estadual de Feira de Santana. No momento estou em busca de uma oportunidade de emprego na área, como estagiário
                    ou desenvolvedor júnior. Possuo inglês avançado e conhecimentos intermediários em:
                </p>
                <ul>
                    <li>Python (FastAPI, Pandas, ...) </li>
                    <li>Javascript (VueJs)</li>
                    <li>Banco de dados (PostgreSQL, MySQL)</li>
                </ul>
                <p>&nbsp;Estou disposto a aprender qualquer tecnologia que seja necessária para realizar o trabalho, o principal
                    objetivo deste site é mostrar minha capacidade em "me virar" e resolver problemas.
                </p>
                <div style="margin-top: 10px; max-width: fit-content;">
                    <a href="https://github.com/mendes658" target="blank" class="img-link">
                        <div style="display: flex; align-items: flex-end;">
                            <img src="../assets/icons/github.png" alt="github" class="icon">
                            <h4 class="icon-name">mendes658</h4>
                        </div>
                    </a>
                </div>
                <div style="margin-top: 10px; max-width: fit-content;">
                    <a href="https://www.linkedin.com/in/pedromendes658" target="blank" class="img-link" >
                        <div style="display: flex; align-items: flex-end;">
                            <img src="../assets/icons/linkedin.png" alt="linkedin" class="icon">
                            <h4 class="icon-name"> Pedro Mendes</h4>
                        </div>
                    </a>    
                </div>    
            </div>
            
            <div style="display: flex; margin-top: 20px;" class="section-title">
                <div class="triangle"></div>
                <div class="triangle-text"><h2>SOBRE O REVISAPP</h2></div>          
            </div>
            <div class="main-text">
                <p>&nbsp;O Revisapp é um projeto pessoal que serve para ajudar estudantes que utilizam o método de revisões espaçadas.</p>
                   <p>&nbsp;O front-end foi feito em VueJs, a API foi desenvolvida em Python
                    utilizando FastAPI que se relaciona com um banco PostgreSQL. O sistema de autenticação
                utiliza tokens JWT e Oauth2.</p>
                <p>&nbsp;Do bootstrap foram utilizados containers, listas e tabelas. Porém nenhum template pronto foi usado.
                    
                </p>
                    <p>&nbsp;Busquei criar algo bem específico para que fique claro que não segui algum tutorial de um curso
                    qualquer na internet.</p><p>&nbsp;O código fonte do projeto pode ser acessado em:<br>&nbsp;..........<br></p>
                    <p>&nbsp;O site funciona da seguinte forma:</p>
                <ul>
                    <li>Insira as matérias que você está estudando atualmente</li>
                    <li>Adicione os assuntos estudados a cada dia</li>
                    <li>Especifique de quantos em quantos dias você quer fazer as revisões.</li>
                </ul>
                <p>
                    &nbsp;Pronto! Agora quando chegar o dia das revisões, você poderá ver cada assunto na seção "Revisões de hoje".
                </p>
                <div class="tutorial-gif">
                    <img src="../assets/icons/revisapp.gif" alt="how-to-revisapp" class="gif">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    axios.defaults.withCredentials = true 

    export default{
        name: 'Login',
        data(){
            return {
                showVisibility: 'display: none;',
                alerts: {'successAlert': 'display: none',
                        'wrongUser': 'display: none',
                        'unavailableUser': 'display: none',
                        'sizeErrorPassword': 'display: none',
                        'sizeErrorUser': 'display:none',
                        'confirmPassError': 'display:none'},
                createAccount: 'Criar nova conta',
                createAccountScreen: false,
                marginCreate: 'margin-left: 10px;',
                user: '',
                pass: '',
                animation1: false,
                animation2: false,
                passConfirm: '',
            }
        },
        methods: {
            login(){

                let loginForm = new FormData()
                loginForm.append('username', this.user)
                loginForm.append('password', this.pass)

                axios.post('https://pedromendes.xyz/login', {loginForm}, {
                    transformRequest: () => {
                        return loginForm
                    }
                }).then((response) => {
                    var token = response.data.access_token
                    if (token){
                        this.$emit('loggedIn', true)
                    }
                }).catch( () => {
                    this.showAlert('wrongUser')
                })

            },

            showAlert(alertName){
                Object.keys(this.alerts).forEach(key =>{
                    if (alertName != key){
                        this.alerts[key] = 'display: none'
                    }
                })
                if (this.animation1){
                    clearTimeout(this.animation1)
                    clearTimeout(this.animation2)
                }


                this.alerts[alertName] = 'display: table-cell'
                this.animation1 = setTimeout(() => {
                    this.alerts[alertName] = 'opacity: 0;'
                }, 3000)
                this.animation2 = setTimeout(() => {
                    this.alerts[alertName] = 'display: none; opacity: 1;'
                }, 5000)
            },

            showCreateAccount(){
                if (!this.createAccountScreen){
                    this.createAccountScreen = true
                    this.marginCreate = 'margin-left: 0px;'
                } else {
                    this.createAccountScreen = false
                    this.marginCreate = 'margin-left: 10px;'
                }
                this.user = ''
                this.pass = ''
                this.passConfirm = ''
            },

            createNewAccount(){
                if (this.user.length < 5 || this.user.length > 50){
                    this.showAlert('sizeErrorUser')
                } else if (this.pass.length < 5 || this.pass.length > 50){
                    this.showAlert('sizeErrorPassword')
                } else if (this.pass != this.passConfirm){
                    this.showAlert('confirmPassError')
                } else {
                    axios.post('https://pedromendes.xyz/create_user', {
                        username: this.user,
                        password: this.pass
                    }).then(()=>{
                        this.showAlert('successAlert')
                        this.showCreateAccount()
                    }).catch((err)=>{
                        let status = err.response.status
                        if (status == 409){ /*conflict*/
                            this.showAlert('unavailableUser')
                        } else if (status == 429){ /*too many requests*/
                            window.alert('O limite diário de contas criadas (1500)'+
                                        ' foi excedido.'+
                                        ' Tente novamente amanhã.')
                        }

                    })
                }
            },
            
            test(){
                this.showIncorrectAlert('unavailableUser')
            },

            pressedEnter(e){
                let id = e.target.id
           
                if (e.key === 'Enter'){
                    if (id === 'password'){
                        this.login()
                    } else if (id === 'password-confirm'){
                        this.createNewAccount()
                    }
                }
            },
        },
        emits: ['loggedIn'],
        created() {
        },
        mounted(){

        }
    }
</script>

<style scoped>
.container0 {
    background-color:rgba(255, 255, 255, 0.9);
    margin: 0 auto;
    margin-top: 5vw;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 15px;
    max-width: 600px;
}
.logo {
    max-height: 50px;
    width: auto;
    display: block;
    top: 0;
    bottom: 0;
    margin: auto;
}
.logo:hover {
    transition: 0.5s;
    filter: drop-shadow(0px 0px 2px rgb(255, 255, 255));
}
.img-span{
    margin: auto;
}
.logo-div{
    width: 100%;
    height: 60px;
    background-color:rgba(3, 13, 58, 0.9);
    overflow: hidden;
}
.form-group{
    width: 100%;
}
.container {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 15px;
}
.main-btns {
    margin-top: 10px;
}
.alert {
    left: 20px;
    padding-left:5px; 
    padding-right: 5px;
    right: 5px;
    padding-top: 0;
    padding-bottom: 0;
    transition: opacity 2s;
    display: table-cell;
    opacity: 1;
}
.new-user {
    margin-left: 10px;
    background-color: rgb(45, 187, 17);
    border-color:  rgb(45, 187, 17);
    max-height: 40px;
    text-align: center;
    min-width: 145px;
}
.new-user:hover {
    background-color: rgb(33, 141, 11);
    border-color:   rgb(33, 141, 11);
}
.create-new {
    min-width: 100px;
}
.cancel {
    margin-left: 10px;
}
.triangle {
	width: 0;
	height: 0;
	border-top: 25px solid transparent;
	border-left: 50px solid #555;
	border-bottom: 25px solid transparent;
    margin-right: 10px;
    border-left-color: rgb(255, 196, 0)
}
.triangle-text {
    margin: auto 0;
}

p {
    border-left-style: solid;
    border-left-width: 2px;
    border-color: rgb(255, 196, 0);
    padding-left: 5px;
    font-size: large;
    text-align: justify;
    text-justify: inter-word;
}
ul {
    font-size: large;
}
.tutorial-gif{
    margin: 0 auto;
    width: 80%;
    height: auto;
}
.gif{
    width: 100%;
    height: auto;
    box-shadow: 5px 5px 8px 0px  rgba(0, 0, 0, 0.541);
}
.main-text {
    margin-left: 5px;
    margin-top: 10px;
    margin-right: 5px;
}
.main-login {
    padding-bottom: 20px;
}
.icon {
    max-height: 30px;
}
.img-link{
    text-decoration: none;
    margin-bottom: 10px;
}
.icon-name{
    margin-bottom: 0; 
    margin-left: 10px;
    color: rgb(0, 0, 119);
}
.img-link:hover{
    color: rgb(0, 37, 158);
    filter: drop-shadow(0px 0px 2px  rgb(255, 196, 0));
}
.section-title{

    color:rgba(3, 13, 58, 0.9);
}
</style>