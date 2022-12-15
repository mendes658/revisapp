<!--Gráfico montado com ChartJs, acesse a documentação em: 
    https://www.chartjs.org/docs/latest/getting-started/  -->

<template>
    <div id="charts">
        <canvas id="main-chart"></canvas>
    </div>
</template>

<script>
    import axios from 'axios'

    
    export default {
        name: 'Charts',

        methods: {
            
            /*  Pega os últimos 11 dias e retorna duas listas com eles no formato 
                DD/MM e YYYY-MM-DD*/
            getLast11Days(){
                let today = new Date()
                let todayInMs = today.getTime()
                let date0 = today.getDate().toString().padStart(2, '0')
                let todayStr = date0 + '/' + (today.getMonth() + 1)
                
                let month = (today.getMonth()+1).toString().padStart(2,'0')
                let date = today.getDate().toString().padStart(2,'0')
                let year = today.getFullYear().toString().padStart(2,'0')
                
                let todayPad = year + '-' + month + '-' + date
                let last11 = [todayStr]
                let last11Padronized = [todayPad]

                for (let i=0; i<10; i++){
                    todayInMs = todayInMs - 86400000
                    today = new Date()
                    today.setTime(todayInMs)
                    
                    let month = (today.getMonth()+1).toString().padStart(2,'0')
                    let date = today.getDate().toString().padStart(2,'0')
                    let year = today.getFullYear().toString().padStart(2,'0')
                    todayPad = year + '-' + month + '-' + date
                    last11Padronized = [todayPad].concat(last11Padronized)

                    date0 = today.getDate().toString().padStart(2, '0')
                    todayStr = date0 + '/' + (today.getMonth() + 1)
                    last11 = [todayStr].concat(last11)
                }
                return [last11, last11Padronized]
            }, 
            
            /*  Get para pegar as matérias estudadas nos últimos 11 dias
                e colocar na Chart*/
            getLast11Studied(chart){
                axios.get('/get_last11_studied')
                .then((response) => {
                    let last11 = response.data.last11

                    let subs = Object.keys(last11)
                    let first = true
                    subs.forEach((subject) => {
                        let colors = []

                        for (let i=0;i<2;i++){
                            if (i == 0){
                                var a = 1 /* a = decide a transparência, maior para o ponto e menor para a linha */
                            } else {
                                var a = 0.6
                            }
                            var color = this.getColorByWord(subject) + ',' + a + ')'
                            colors.push(color)
                        }
                        if (first){
                            chart.data.datasets[0] = {backgroundColor: colors[0],
                                borderColor: colors[1],
                                data: last11[subject],
                                label: subject}
                        } else{
                            chart.data.datasets.push(
                                {backgroundColor: colors[0],
                                borderColor: colors[1],
                                data: last11[subject],
                                label: subject
                                })
                        }
                        first = false
                    })
                    chart.update()
                }).catch(()=>{})

            },
            
            /*  Gera uma cor de acordo com as letras da palavra, para que toda vez
                a mesma matéria tenha a mesma cor sem a necessidade de deixar isso
                salvo no banco de dados. O "a" do "rgba" é propositalmente deixado de fora,
                já que a transparência da linha é decidida na função "getLast11Studied" */
            getColorByWord(word){
                let totalSum = 0
                for (let i=0;i<word.length;i++){
                    let n = word.charCodeAt(i)
                    if (i % 2 == 0){
                        n = n*2
                    }
                    totalSum = totalSum + n
                }
                let r = totalSum % 50
                let g = totalSum % 200
                let b = totalSum % 255
                return 'rgba('+r+','+g+','+b
            }
        },
        
        mounted() {
            var last11Days = this.getLast11Days()
            var xValues = last11Days[0];
            
            var mainChart = new Chart("main-chart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{data: [0], label: 'Adicione um novo assunto!'}]
            },
            options:{
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                responsive: true
            }
            });
            
            this.getLast11Studied(mainChart)
        }
    }

</script>

<style scoped>

#main-chart {
    min-height: 200px;
}

</style>