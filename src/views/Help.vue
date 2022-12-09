<template>
    <div class="container main-text">
            <h3>Como funciona?</h3>
            <p>O Revisapp foi feito para facilitar o dia-a-dia dos estudantes que utilizam o método de revisões espaçadas.</p>
            <ul>
                <li>Insira as matérias que você está estudando atualmente</li>
                <li>Adicione os assuntos estudados a cada dia</li>
                <li>Especifique de quantos em quantos dias você quer fazer as revisões.</li>
            </ul>
            <p>
                Pronto! Agora quando chegar o dia das revisões, você poderá ver cada assunto na seção "Revisões de hoje".
            </p>
            <div class="tutorial-gif">
                <img src="../assets/icons/revisapp.gif" alt="how-to-revisapp" srcset="" class="gif">
            </div>
    </div>
</template>

<script>
    export default {
        name: 'Help'
    }

</script>

<style scoped>
    .main-text {
        max-width: 750px;
        background-color:rgba(255, 255, 255, 0.9);
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
        border-style: ridge;
        border-color:aliceblue;
        border-width: 5px;
        padding-bottom: 10px;
    }
    p {
        border-left-style: solid;
        border-left-width: 2px;
        border-color: rgb(255, 196, 0);
        padding-left: 5px;
        font-size: large;
    }
    ol {
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
</style>