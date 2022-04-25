let quantasPerguntas = [];


let titulo;
let imagem;
let pergunta;
let nivel;

let quizzes = [];
const divtodosQuizzes = document.querySelector(".corpo").querySelector(".todosQuizzes");
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

/* PEGAR E RENDERIZAR LISTA DE QUIZZES - TODOS */

function pegarListaQuizes(){
    const promise = axios.get(API)
    promise.then(carregarQuizz)
}
function carregarQuizz(response){
    quizzes = response.data;
    renderizarQuizzes(divtodosQuizzes)
}
function renderizarQuizzes(divtodosQuizzes){
    divtodosQuizzes.innerHTML = "";
    for (let i=0; i<quizzes.length; i++){
        divtodosQuizzes.innerHTML +=
        `<div class="imagensQuizzes" onclick="irParaQuizz(this)" alt="imagem do quizz">
            <img src="${quizzes[i].image}" alt="imagem-quizz">
            <span class="legendaQuizz">${quizzes[i].title}</span>
        </div>`
    }
}
pegarListaQuizes()

/* IR PARA CRIAR QUIZZ AO CLICAR NO BOTÃO CRIAR QUIZZ OU + */


function criarQuizz(){
    const botaoCriarQuizz = document.querySelector(".usuario").querySelector("button")

    if (botaoCriarQuizz !== null) {

        const tela1 = document.querySelector(".containerTela1")
        const tela3 = document.querySelector(".tela3")

        setTimeout(() => trocarDeTela(tela1,tela3) , 500);
        
    }
}
function trocarDeTela(telaA, telaB){
    
    telaA.classList.add("escondido");
    telaB.classList.remove("escondido");
}

/* IR PARA O QUIZZ ESCOLHIDO */

function irParaQuizz(elemento){
    const botaoIrParaQuizz = document.querySelector(".todosQuizzes")

    if(botaoIrParaQuizz !== null){
        console.log(elemento)
        const tela1 = document.querySelector(".containerTela1")
        const tela2 = document.querySelector(".containerTela2")
        tela1.classList.add("escondido");
        tela2.classList.remove("escondido") /* renderizarUnicoQuizz() */
        
        /* localizando ID pelo título do Quizz */
        const tituloQuizz = document.querySelector(".imagensQuizzes").querySelector(".legendaQuizz").innerHTML;
        console.log(tituloQuizz)
       
    }
}    

function acharQuizz(){
    const tituloQuizz = document.querySelector(".imagensQuizzes").querySelector(".legendaQuizz").innerHTML;    
    if (quizzes.title === "Quanto otaku você é?"){
        return true
    }else{
        return false
    }
}
const oQuizz = quizzes.filter(acharQuizz)
console.log(oQuizz)

/*tela3-gabs*/
let qtdPerguntas;
function camposPreenchidos(){
    titulo = document.querySelector(".titulo").querySelector("input");
    imagem = document.querySelector(".imagem").querySelector("input");
    pergunta = document.querySelector(".quantidadePerguntas").querySelector("input");
    nivel = document.querySelector(".nivel").querySelector("input");
    botao = document.querySelector("button");
    if (((titulo.value !== "") && (titulo.value.length >= 20)) && (imagem.value !== "") && ((pergunta.value !=="") && (Number(pergunta.value) >= 3)) && ((nivel.value !== "") && (Number(nivel.value) >= 2))){
        const tela3 = document.querySelector(".tela3");
        const tela4 = document.querySelector(".tela4");
        qtdPerguntas = Number(pergunta.value);
        setTimeout(() => trocarDeTela(tela3,tela4) , 500);
    } else {
        alert("Preencha os dados corretamente!");
    }
    entradaPerguntas();
}
/*TELA 4 - GABS*/
adcPergunta();
entradaPerguntas();

function entradaPerguntas(){
    qtdPerguntas = Number(pergunta.value);
    for(let i = 1; i < qtdPerguntas; i++){
        let qtd = adcPergunta(i);
        quantasPerguntas.push(qtd);
    }
}

function adcPergunta(indice){
   let totalPerguntas = document.querySelector(".perguntasRestantes");
   totalPerguntas.innerHTML += `
                                <div class="escondePergunta" onclick="infoPerguntas(this); camposPreenchidosPerguntas()">
                                    <div class="pergunta2">
                                        <h2>Pergunta</h2>
                                        <ion-icon name="create-outline"></ion-icon>
                                    </div>
                                </div>`
}
function infoPerguntas(elemento){
    elemento.classList.add("escondido");

    let form2 = document.querySelector(".formulario2");

    form2.innerHTML +=`<div class="formulario2-1">
    <h3 class="pergunta1">Pergunta</h3>
    <form class="pergunta1texto">
        <input type="text" placeholder="Texto da pergunta">
    </form>
    <form class="pergunta1cor">
        <input type="text" placeholder="Cor de fundo da pergunta">
    </form>
</div>
<div class="formulario2-2">
    <h3 class="respostaCorreta">Resposta correta</h3>
    <form class="respostaTexto">
        <input type="text" placeholder="Resposta correta">
    </form>
    <form class="imagemCorreta">
        <input type="url" name="url" id="url" placeholder="URL da imagem" pattern="https://.*" required>
    </form>
</div>
<div class="formulario2-3">
    <h3 class="respostasIncorreta">Respostas incorretas</h3>
    <form class="incorreta1">
        <input type="text" placeholder="Resposta incorreta 1">
    </form>
    <form class="imagemIncorreta1">
        <input type="url" name="url" id="url" placeholder="URL da imagem 1" pattern="https://.*" required>
    </form>
    <form class="incorreta2">
        <input type="url" name="url" id="url" placeholder="Resposta incorreta 2">
    </form>
    <form class="imagemIncorreta2">
        <input type="text" placeholder="URL da imagem 2" pattern="https://.*" required>
    </form>
    <form class="incorreta3">
        <input type="text" placeholder="Resposta incorreta 3">
    </form>
    <form class="imagemIncorreta3">
        <input type="url" name="url" id="url" placeholder="URL da imagem 3" pattern="https://.*" required>
    </form>
</div>` 
}

function camposPreenchidosPerguntas(){
    let textoPergunta = document.querySelector(".pergunta1texto input");
    let corPergunta = document.querySelector(".pergunta1cor input");
    let repostaCerta = document.querySelector(".respostaTexto input");
    let imgRespostaCerta = document.querySelector(".imagemCorreta input");
    let resptIncorreta1 = document.querySelector(".incorreta1 input");
    let imgIncorreta1 = document.querySelector(".imagemIncorreta1 input");
    let resptIncorreta2 = document.querySelector(".incorreta2 input");
    let imgIncorreta2 = document.querySelector(".imagemIncorreta2 input");
    let resptIncorreta3 = document.querySelector(".incorreta3 input");
    let imgIncorreta3 = document.querySelector(".imagemIncorreta3 input");

    if((textoPergunta.value.length >= 20) && (corPergunta.value !== "") && (repostaCerta.value !== "") && 
    (imgRespostaCerta.value !== "") && (resptIncorreta1.value !== "") && (imgIncorreta1.value !== "") && 
    (resptIncorreta2.value !== "") && (imgIncorreta2.value !== "") && (resptIncorreta3.value !== "") && (imgIncorreta3.value !== "")){
        console.log("botão funciona")
    } else {
        alert("Preencha os dados corretamente!");
    }
}




