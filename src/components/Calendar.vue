<template>
    <div class="vanilla-calendar" id="calendar">
    </div>
</template>

<script>
    import axios from 'axios'
    axios.defaults.baseURL = 'http://10.0.0.105:8000'

    export default {
        name: 'Calendar',
        data(){
            return{
                calendar: ''
            }
        },
        methods: {
            dayClicked0(dates){
                this.$emit('dayClicked', dates)
            },
            updateCalendar(){
                axios.get('/get_all_revisions').then((response) => {
                    let allRevisions = response.data.allRevisions
                    Object.keys(allRevisions).forEach(date => {
                        this.calendar.settings.selected.dates.push(date)
                        let subs = allRevisions[date]
                        subs = subs.join('<br>')
                        this.calendar.popups[date] = {}
                        this.calendar.popups[date].html = subs
                    });
                }).catch((err) => {console.log(err.response)})
            }
        },
        mounted() {
            this.calendar = new VanillaCalendar('#calendar', {
                settings: {
                    lang: 'define',
                    selected: {
                        dates: [],
                    },
                },
                locale: {
                    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'
                            ,'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    weekday: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
                },
                popups: {
                }
            });
            
            this.calendar.init()
            this.updateCalendar()
            setTimeout(()=>{
                this.calendar.update()
            },300)
            setTimeout(()=>{
                this.calendar.update()
            },500)
        },
    }

</script>
<style scoped>
#calendar {
    width: 90%;
    height: 80%;
    margin: auto;
    position: relative;
    top: 50%;
    -ms-transform: translateY(-65%);
    transform: translateY(-65%);
    background: transparent;
  }

</style>