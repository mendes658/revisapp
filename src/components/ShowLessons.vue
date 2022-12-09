<template>
    <div class="main-list">
        <ul class="list-group">
            <li v-for="(lesson, index) in lessons0" :key="[index, lesson]"
            class="list-group-item d-flex justify-content-between ">
                <input class="form-check-input" type="checkbox" :value="lesson[0]" @change="checkboxAction($event)" :id="index+'checkbox'" :style="checkbox_display">
                <p class="lesson-text">{{ lesson[1]}}</p>
                <span class="badge">{{ lesson[2] }}</span>
            </li>
        </ul>
        <div class="main-buttons">
            <div v-if="choose_delete">
            <button type="button" class="btn btn-danger"  @click="deleteLesson">Deletar</button>
            <button type="button" class="btn btn-secondary"  @click="chooseSubjectsToDelete">Voltar</button>
            </div>
            <button type="button" class="btn btn-warning" v-else @click="chooseSubjectsToDelete">Deletar assuntos</button>
        </div>
    </div>
</template>

<script>
    import mainMethods from '../assets/methods.js'
    import axios from 'axios'
    axios.defaults.baseURL = 'http://10.0.0.105:8000'

    export default {
        name: 'ShowLessons',
        data() {
            return {
                choose_delete: false,
                checkbox_display: 'display: none',
            }
        },
        props: {
            lessons0: Array,
            to_delete: Object,
            now_subject: String
        },
        methods: {
            chooseSubjectsToDelete: mainMethods[0],
            
            checkboxAction(e){
                let isChecked = e.srcElement.checked
                let checkName = e.srcElement.value

                if (isChecked){
                    this.to_delete[checkName] = true
                } else {
                    delete this.to_delete[checkName]
                }
                console.log(this.to_delete)
            },
            
            deleteLesson(){
                let toDel = Object.keys(this.to_delete)
                console.log(toDel)
                axios.post('/delete_lessons', {
                    ids: toDel
                }).then((response) => {
                    console.log(response.data)
                    this.$emit('refreshLessons', this.now_subject)
                })
            },

            formatDateToBrazil(date){
                console.log(date)
                let oldDate = date.split('-')
                let newDate = oldDate[2] + '/' + oldDate[1] + '/' + oldDate[0]
                return newDate
            }
        },
        emits: ['refreshLessons']
    }

</script>

<style scoped>
    .badge {
            color: white;
            border-width: 2px;
            border-radius: 20px;
            background-color: blue;
            max-height: 22px;
        }

    .list-group {
            overflow-y: scroll;
            max-height: 60vh;
            max-width: 100%;
            min-width: 400px;
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
    .btn-secondary {
        margin-left: 20px;
    }
    .form-check-input {
        min-width: 18px;
    }
    .lesson-text {
        word-wrap: break-word;
        max-width: 300px;
    }
    .list-group-item{
        background-color:rgba(255, 255, 255, 0.5);
    }

</style>