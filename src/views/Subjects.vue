<template>
  <div id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="col main-item">
            <h2>{{ title_subjects }}</h2>
            <SubjectsList @showLessonsFromSubject="showClickedSubjectLessons" :key="refreshSubList"/>
          </div>
          <div class="col main-item">
            <h2>{{ subject_name }}</h2>
            <ShowLessons :lessons0="lessons_data" :to_delete="to_delete0" :now_subject="subject_name" @refreshLessons="updateBothLists"/>
          </div>
      </div>
     </div>
  </div>
</template>

<script>
import SubjectsList from '@/components/SubjectsList.vue';
import ShowLessons from '@/components/ShowLessons.vue';
import axios from 'axios'
axios.defaults.baseURL = 'http://10.0.0.105:8000'

export default {
  name: "Subjects",
  data() {
    return {
      subject_name: 'Escolha uma matéria',
      changeList: 0,
      title_subjects: 'Matérias',
      lessons_data: [],
      to_delete0: {},
      refreshSubList: 0
    }
  },
  methods: {
    showClickedSubjectLessons(sub){
      axios.get('/get_lessons/'+sub).then((response) => {
                this.lessons_data = this.replaceBreakLine(response.data.lessons)
            })
      this.subject_name = sub
    },
    updateBothLists(sub){
      axios.get('/get_lessons/'+sub).then((response) => {
                this.lessons_data = this.replaceBreakLine(response.data.lessons)
            })
      this.to_delete0 = {}
      this.refreshSubList ++
    },
    formatDate(dateString){
      let date = new Date(dateString)
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      formated = day + '/' + month + '/' + year

      return formated
    },
    replaceBreakLine(list){
      list.forEach(s => {
        s[1].replace('kkk', '<br>')
        console.log(s)
      })

      return list
    }
  },
  components: {
    SubjectsList,
    ShowLessons
  }
};
</script>

<style scoped>
  .main-item {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  padding: 2px;
  margin: 2px;
  margin-top: 15px;
  min-width: 400px;
  padding-bottom: 15px;
  background-color:rgba(255, 255, 255, 0.9);
  border-style:ridge !important;
  border: 5px;
  border-color:aliceblue;
  overflow-x: hidden;
  }
  .container-fluid {
    max-height: 800px;
    max-width: 1500px;
  }
</style>