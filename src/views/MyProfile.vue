<template>
  <div id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="col main-item" :style="main_item_style0">
            <h2>Assuntos estudados por dia</h2>
              <Charts :key="chartsKey" />
          </div>
          <div class="col main-item calendar" :style="main_item_style0">
              <h2>Calendário de revisões</h2>
              <Calendar :key="calendarKey" />
          </div>
        </div>
        <div class="row second-row">
          <div class="col main-item revision" :style="main_item_style0">
            <div class="revision-title">
              <div style="display:table-cell">
                <button class="btn btn-outline-dark " @click="changeTodayRevision('left')"><span><img src="../assets/icons/arrowleft.png" class="arrow"></span></button>
              </div>
              <div style="display:table-cell;width: 100%;text-align: center;">
                <h2 class="revisions rev-today">Revisões {{ nowDayString }}</h2>
              </div>
                <div style="display:table-cell">
                <button class="btn btn-outline-dark" @click="changeTodayRevision('right')"><span><img src="../assets/icons/arrow.png" class="arrow"></span></button>
              </div>
            </div>
            <RevisionTable :key="revisionsKey" :todays_revision="todays_revision"/>
          </div>
          <div class="col main-item" :style="main_item_style0">
              <h2>Inserir assunto estudado</h2>
              <AddLessonForm @update-others="updateComponents"/>
         </div>
      </div>
     </div>
  </div>
</template>

<script>
import Charts from '../components/Charts.vue'
import RevisionTable from '../components/RevisionTable.vue'
import AddLessonForm from '../components/AddLessonForm.vue'
import Calendar from '../components/Calendar.vue'
import axios from 'axios'

export default {
    name: "MyProfile",
    data() {
      return {
        revisionsKey: 0,
        calendarKey: 0,
        chartsKey: 0,
        todays_revision: [],
        date_show_revision: new Date(),
        nowDayString: 'de hoje',
        today0: new Date(),
        alwaysToday:  ''
      };
    },
    components: {
      Charts,
      RevisionTable,
      AddLessonForm,
      Calendar
    },
    props: {
      main_margin: String,
      main_item_style0: String
    },
    methods: {
      updateComponents(){
        this.revisionsKey ++
        this.calendarKey ++
        this.chartsKey ++
        this.changeTodayRevision('left')
        this.changeTodayRevision('right')
      },
      
      getTodaysRevision(date){
                if (date){
                  var today = date
                } else {
                  var today = this.getTodaysDate()
                }
                axios.get('https://pedromendes.xyz/get_todays_revisions/' + today).then((response) => {
                    this.todays_revision = response.data.todaysRevisions
                }).catch(()=>{})
      },

      getTodaysDate(date0){
          if (date0){
            var nowDate = date0
          } else {
            var nowDate = new Date()
          }
          let month = (nowDate.getMonth()+1).toString().padStart(2,'0')
          let date = nowDate.getDate().toString().padStart(2,'0')
          let year = nowDate.getFullYear().toString().padStart(2,'0')
          let today = year + '-' + month + '-' + date
          return today
      },

      changeTodayRevision(side){
        var months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        var revisionInMs = this.date_show_revision.getTime()
        if (side == 'left'){
          var newRevision = new Date(revisionInMs - 86400000)
        } else {
          var newRevision = new Date(revisionInMs + 86400000)
        }
        this.date_show_revision = newRevision
        
        var formatedDate = this.getTodaysDate(newRevision)
        this.getTodaysRevision(formatedDate)
        
        var nowRevisionInString = newRevision.getDate() + '-' + newRevision.getMonth() + '-' + newRevision.getFullYear()
        
        if (nowRevisionInString == this.alwaysToday){
          this.nowDayString = 'de hoje'
        } else {
          this.nowDayString = 'do dia ' + newRevision.getDate() + '/' + months[newRevision.getMonth()]
        }
      }
    },
    mounted(){
      this.getTodaysRevision()
      this.alwaysToday = this.today0.getDate() + '-' +  this.today0.getMonth() + '-' +this.today0.getFullYear()
    }
}
</script>

<style scoped>
.main-item {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  padding: 2px;
  margin: 2px;
  margin-top: 15px;
  background-color:rgba(255, 255, 255, 0.9);
  border-style:ridge !important;
  border: 5px;
  border-color:transparent;
}
.container-fluid {
  max-height: 800px;
  max-width: 1500px;
}


#seconditem-secondrow {
  margin-top: 10px;
}

.arrow{
  height: 20px;
  max-width: 20px;
}
.btn-outline-dark{
  border: none;

}
.btn-outline-dark:hover{
  color: transparent;
  background-color: transparent;
}
.arrow:hover{
  filter: contrast(860%) drop-shadow(0px 0px 5px rgba(51, 255, 0, 0.329));;
}
.arrow:active{
  filter: contrast(1060%);
}
</style>