<template>
    <form>  
        <div class="form-group">
            <label for="chooseSubject" v-if=" subjects != '' ">Escolha a matéria</label>
            <label for="chooseSubject" v-else>Adicione uma matéria em "Minhas Matérias"</label>
            <select class="main-select" id="chooseSubject" v-model="chosen_subject">
                <option v-for="(subject, index) in subjects" :key="index" :value="subject[0]">{{ subject[0] }}</option>
            </select>
        </div>
        
        <div class="form-group" style="margin-top: 5px">
            <label for="lessonInput">Digite o assunto</label>
            <textarea rows="3" name="" id="lessonInput" class="main-select" v-model="lesson_taken"></textarea>
        </div>
        
        <div class="form-group">
            <p>Frequência das revisões (em dias após última revisão):</p> 
            <label for="revision1">1º</label>
            <select class="secondary-select" @change="allowOtherSelects(reviews[0])" id="revision1" :disabled="reviews[0][1]" v-model="reviews[0][0]">
                <option></option>
                <option>1</option>
                <option>7</option>
                <option>15</option>
                <option>30</option>
                <option>90</option>
            </select>
            <label for="revision2">2º</label>
            <select class="secondary-select" @change="allowOtherSelects(reviews[1])" id="revision2" :disabled="reviews[1][1]" v-model="reviews[1][0]">
                <option></option>
                <option>1</option>
                <option>7</option>
                <option>15</option>
                <option>30</option>
                <option>90</option>
            </select>
            <label for="revision3">3º</label>
            <select class="secondary-select" @change="allowOtherSelects(reviews[2])" id="revision3" :disabled="reviews[2][1]" v-model="reviews[2][0]">
                <option></option>
                <option>1</option>
                <option>7</option>
                <option>15</option>
                <option>30</option>
                <option>90</option>
            </select>
            <label for="revision4">4º</label>
            <select class="secondary-select" @change="allowOtherSelects(reviews[3])" id="revision4" :disabled="reviews[3][1]"  v-model="reviews[3][0]">
                <option></option>
                <option>1</option>
                <option>7</option>
                <option>15</option>
                <option>30</option>
                <option>90</option>
            </select>
            <label for="revision5">5º</label>
            <select class="secondary-select" @change="allowOtherSelects(reviews[4])" id="revision5" :disabled="reviews[4][1]" v-model="reviews[4][0]">
                <option></option>
                <option>1</option>
                <option>7</option>
                <option>15</option>
                <option>30</option>
                <option>90</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="dateInput" style="margin-top: 20px; margin-right: 6px">Data:</label>
            <input type="date" class="main-select" style="width:50%" id="dateInput" v-model="lesson_date" :max="today" min="2022-01-01">
        </div>
        
        <div class="send-btn-alert" style="display:table;">
            <div style="display:table-cell;">
                <button type="" class="btn btn-success" @click="sendLesson">Enviar</button>
            </div>
            <div class="alert alert-danger" role="alert" :style="alertVisibility" v-show="alertErrorSend">
                <span style="vertical-align: middle;">Escolha uma matéria e digite um assunto</span> 
            </div>
            <div class="alert alert-success" role="alert" :style="alertVisibility" v-show="sendSuccess">
               <span>Assunto adicionado com sucesso!</span>
            </div>
        </div>
    </form>
</template>

<script>
    import axios from 'axios'


    export default {
        name: 'AddLessonForm',
        data() {
            return {
                reviews: [['',false,0],['',true,1],['',true,2],['',true,3],['',true,4]],
                lesson_date: '2022-01-01',
                today: '',
                chosen_subject: '',
                lesson_taken: '',
                subjects: '',
                alertErrorSend: false,
                sendSuccess: false,
                alertVisibility: 'opacity: 1;',
                tokenJWT: ''
            }
        },
        methods: {
            sendLesson(){
                let chosenInMs = new Date(this.lesson_date).getTime()
                let today1 = new Date().getTime()

                if (this.chosen_subject == '' || this.lesson_taken == '' || chosenInMs > today1){
                    this.alertErrorSend = true
                    setTimeout(()=>{
                        this.alertVisibility = 'opacity: 0;'
                    }, 2000)
                    setTimeout(()=>{
                        this.alertErrorSend = false
                        this.alertVisibility = 'opacity: 1;'
                    }, 4000)
                } else {
                    let onlyDates = []
                    this.reviews.forEach((r)=> {
                        if (r[0] != ''){
                            onlyDates.push(parseInt(r[0]))
                        }
                    })
                    let revisionDates = this.calculateRevisionDates(this.lesson_date, onlyDates)
                    let standardDate = new Date(this.lesson_date).toISOString()
                    let revisionDatesString = revisionDates.join(',')
                    let firstRev = revisionDates[0]
                    let lastRev = revisionDates[revisionDates.length -1]
                    if (revisionDates.length == 0){
                        revisionDatesString= null
                        firstRev = null
                        lastRev = null
                    }

                    axios.post('/add_lesson',{
                        revision_dates: revisionDatesString,
                        date: standardDate,
                        chosen_subject: this.chosen_subject,
                        lesson: this.lesson_taken,
                        first_rev_date: firstRev,
                        last_rev_date: lastRev
                    })
                    .catch((err)=>{
                        var status = err.response.status
                        if (status == 429){ /*too many requests*/
                            window.alert('O limite diário de assuntos criadas por todos os usuários (10000)'+
                                        ' foi excedido.'+
                                        ' Tente novamente amanhã.')
                        }
                    })
                    .then(()=>{
                        this.$emit('updateOthers')
                        this.sendSuccess = true
                        
                        setTimeout(()=>{
                            this.alertVisibility = 'opacity: 0;'
                        }, 2000)
                        
                        setTimeout(()=>{
                            this.sendSuccess = false
                            this.alertVisibility = 'opacity: 1;'
                        }, 4000)
                    })
                }
            },
            
            allowOtherSelects(chosen_value){
                let day = chosen_value[0]
                let index = chosen_value[2]
                if (day != '' && index != 4){
                    this.reviews[index+1][1] = false
                } else if (day == ''){
                    for (let i=index+1;i<5;i++){
                        this.reviews[i][1] = true
                        this.reviews[i][0] = ''
                    }
                }
            },

            updateSubjects(){
                axios.get('/get_all_subjects', {
                    }).then((response) => {
                        if (response.data.subjects != []){
                            this.subjects = response.data.subjects
                        }
                    }).catch(()=>{})
            },

            calculateRevisionDates(date, frequency){
                let today = new Date(date)
                let todayInMs = today.getTime()
                let revision_dates = []
                var nowDate = ''
                frequency.forEach((day) => {
                    todayInMs = todayInMs + (day * 86400000)
                    nowDate = new Date(todayInMs)
                    revision_dates.push(nowDate.toISOString())
                })
                return revision_dates
            },
            getToday(){
                let today = new Date()
                let month = (today.getMonth()+1).toString().padStart(2,'0')
                let date = today.getDate().toString().padStart(2,'0')
                let year = today.getFullYear().toString().padStart(2,'0')
                
                let todayPad = year + '-' + month + '-' + date
                return todayPad
            },
            getJWTToken(){
                
            }
        },
        mounted(){
            this.updateSubjects()
            this.lesson_date = this.getToday()
            this.today = this.getToday()
        },
        emits: ['updateOthers']
    }

</script>

<style scoped>

.main-select {
    width: 100%;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    border-radius: 5px;
    border-color: lightgrey;
    background-color: white;
    outline: none ;
}
.secondary-select {
    width: 10%;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    border-radius: 5px;
    border-color: lightgrey;
    outline: none ;
    margin-left: 3px;
    margin-right: 12px;
    background-color: white;
}
.send-btn-alert {
    margin-top: 20px;
    margin-bottom: 20px;
}
.alert {
    left: 20px;
    padding-left:5px; padding-right: 5px;
    padding-top: 0;
    padding-bottom: 0;
    transition: opacity 2s;
    display: table-cell;
    opacity: 1;
}
.btn {
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}
</style>