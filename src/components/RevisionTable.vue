<template>
    <div class="main-table">
    <table class="table">
        <thead class="">
            <tr class="columns">
                <th scope="col">Matéria</th>
                <th scope="col">Assunto</th>
            </tr>
        </thead>
        <tbody class="body-table">
            <tr v-for="(subject, index) in todays_revision" :key="index" class="item0">
                <th scope="row" class="subject-name">{{ subject[0] }}</th>
                <td class="lesson">{{ subject[1] }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>

    export default{
        name: 'RevisionTable',
        props: {
            todays_revision: Array
        },
        mounted(){
        }
    }

</script>

<style scoped>
.main-table {
    max-width: 100%;
    max-height: 350px;
    overflow-y: scroll;
    padding: 0px;
}

.lesson {
    word-wrap: break-word;
    max-width: 1px;
}
.subject-name {
    word-wrap: break-word;
    max-width: 1px;
    width: 30%
}
.columns {
    position: sticky;
    top: 0;
    background-color: rgb(247, 247, 247);
}
.item0{
    background-color:rgba(255, 255, 255, 0.7);
}
.body-table{
    background-color:rgba(255, 255, 255, 0.5);
}

</style>