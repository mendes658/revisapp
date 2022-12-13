<template>
    <div class="main-list">
        <div class="add-subject container-fluid" v-if="add_subject_div">
            <label for="subject-input">Digite o nome da matéria:</label>
            <input type="text" class="form-control" id="subject-input" v-model="typed_subject" @keypress="pressedEnter($event)">
            <div class="addsub-btns">
            <button type="button" class="btn btn-success addsub-btn" @click="sendLesson0()">Adicionar</button>
            <button type="button" class="btn btn-secondary" @click="openAddSubjectDiv">Voltar</button>
            </div>
            <div class="alert alert-success" role="alert" v-show="show_created_alert">
                Matéria "{{sent_subject}}" adicionada com sucesso!
            </div>
            <div class="alert alert-danger" role="alert" v-show="show_not_created_alert">
                A matéria "{{ sent_subject }}" já foi adicionada anteriormente.
            </div>
            <div class="alert alert-warning" role="alert" v-show="show_wordsize_error">
                O nome da matéria não pode ter mais de 25 caracteres.
            </div>
        </div>
        <ul class="list-group" v-else>
            <li v-for="(subject, index) in subjects" :key="index"
            class="list-group-item d-flex justify-content-between" @click="sendSubjectName(subject[0])">
            <input class="form-check-input" @change="checkboxAction($event)" type="checkbox" :value="subject[0]" :id="index+'checkbox'" :style="checkbox_display">
            <span class="subject-name-in-list" @click="none">{{ subject[0] }}</span>
            <span class="badge">{{ subject[1] }}</span>
            </li>
        </ul>
        <div class="main-buttons">
            <div v-if="choose_delete">
            <button type="button" class="btn btn-danger"  @click="deleteSubjects">Deletar</button>
            <button type="button" class="btn btn-secondary"  @click="chooseSubjectsToDelete">Voltar</button>
            </div>
            <div v-else-if="add_subject_div == false">
            <button type="button" class="btn btn-warning"  @click="chooseSubjectsToDelete">Deletar matérias</button>
            <button type="button" class="btn btn-success" @click="openAddSubjectDiv">Adicionar nova matéria</button>
            </div>
        </div>
    </div>
</template>

<script>
    import mainMethods from '../assets/methods.js'
    import axios from 'axios'
    axios.defaults.baseURL = 'http://10.0.0.105:8000'
    axios.defaults.withCredentials = true

    export default {
        name: 'SubjectsList',
        data() {
            return {
                subjects: [],
                choose_delete: false,
                checkbox_display: 'display: none',
                to_delete: {},
                add_subject_div: false,
                typed_subject: '',
                show_created_alert: false,
                show_not_created_alert: false,
                sent_subject: '',
                show_wordsize_error: false
            }
        },
        methods: {
            sendLesson0(){
                    this.sent_subject = this.typed_subject
                    axios.post('/add_subject', {
                        subject: this.sent_subject
                    }, 
                    ).then(() => {
                        this.show_created_alert = true;
                        this.show_not_created_alert = false;
                        this.show_wordsize_error = false;
                    }).catch((err) => {
                        let status = err.response.status
                        if (status == 406){ /*sizeerror*/
                            this.show_wordsize_error = true;
                            this.show_not_created_alert = false;
                            this.show_created_alert = false;
                        } else if (status == 409){ /*alreadyondatabase*/
                            this.show_not_created_alert = true;
                            this.show_created_alert = false;
                            this.show_wordsize_error = false;
                        }
                    }) 
                    setTimeout(()=>{
                        this.updateSubjects()
                    }, 200)
            },
            
            checkboxAction(e){
                let isChecked = e.srcElement.checked
                let checkName = e.srcElement.value

                if (isChecked){
                    this.to_delete[checkName] = true
                } else {
                    delete this.to_delete[checkName]
                }
            },
            
            chooseSubjectsToDelete: mainMethods[0], 
            
            openAddSubjectDiv(){
                this.add_subject_div = !this.add_subject_div
            },
            
            updateSubjects(){
                axios.get('/get_all_subjects', {
                    }).then((response) => {
                        console.log(response)
                        this.subjects = response.data.subjects
                    }).catch(()=>{})
            },

            deleteSubjects(){
                let subjectsToDelete = Object.keys(this.to_delete)
                console.log(subjectsToDelete)
                axios.post('/delete_subjects', {
                        subjects: subjectsToDelete
                    }).then(() => {
                        this.updateSubjects()
                        location.reload()
                    }).catch(()=>{})
                this.to_delete = {}
            },

            sendSubjectName(name){
                this.$emit('showLessonsFromSubject', name)
            },
            
            pressedEnter(e){
                if (e.key === 'Enter'){
                    this.sendLesson0()
                }
            },

        },
        emits: ['showLessonsFromSubject'],
        mounted(){
            this.updateSubjects()
        }
    }

</script>

<style scoped>
    .badge {
        color: white;
        border-width: 2px;
        border-radius: 20px;
        background-color: blue;
        pointer-events: none;
        max-height: 22px;
    }
    .list-group-item:hover {
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
        background-color: rgba(236, 236, 236, 0.521);
    }
    .list-group-item {
        cursor: pointer;
        word-wrap: break-word;
        background-color:rgba(255, 255, 255, 0.5);
    }
    .list-group-item:active {
        background-color: rgba(206, 206, 206, 0.911);
    }
    .list-group {
        overflow-y: scroll;
        max-height: 60vh;
        max-width: 100%;
        min-height: 60vh;
        border: 1px;
        border-style: solid;
        border-color: rgba(236, 236, 236, 0.753);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
    .main-buttons {
        margin-top: 20px;
    }
    .btn {
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    }
    .btn-secondary, .btn-success {
        margin-left: 20px;
    }
    .subject-name-in-list {
        pointer-events: none;
    }
    .add-subject {
        position:relative;
        max-height: 60vh;
        max-width: 600px;
        min-height: 20vh;
        border: 1px;
        border-style: solid;
        border-color: rgba(236, 236, 236, 0.753);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
    .addsub-btns{
        margin-top: 5px;
    }
    .addsub-btn{
        margin-left: 0px !important;
    }
    .alert {
        margin-top: 10px;
    }
</style>