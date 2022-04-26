let titulo;
let imagemQuizz;
let pergunta;
let nivel;
let quizz;

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

        const tela1 = document.querySelector(".containerTela1")
        const tela2 = document.querySelector(".containerTela2")
        
        setTimeout(() => trocarDeTela(tela1,tela2) , 500);

        /* localizando ID pelo título do Quizz */
        const tituloQuizz = elemento.querySelector(".legendaQuizz");
        const oQuizz = quizzes.filter(quizz => quizz.title === tituloQuizz.innerHTML);

        const promise = axios.get(API + `/${oQuizz[0].id}`);
        promise.then(carregarUnicoQuizz);

    }   
}    
function carregarUnicoQuizz(response){
    quizz = response.data
    renderizarUnicoQuizz(quizz)
}
function renderizarUnicoQuizz(quizz){
    const divUnicoQuizzTopo = document.querySelector(".containerTela2").querySelector(".tela2");

    divUnicoQuizzTopo.innerHTML += `
        <div class="cabecalhoTela2">   
            <div class="top">BuzzQuizz</div>
            <div class="imagemTop"><img src=${quizz.image} alt="imagem do quizz"></div>
            <span class="tituloQuizz">${quizz.title}</span>
        </div>
        <main class="corpo2">
        </main>`;

    const divUnicoQuizzPerguntas = document.querySelector(".containerTela2").querySelector(".tela2").querySelector(".corpo2");
    let stringUnica = "";
    for (let i=0; i<quizz.questions.length; i++){
        stringUnica += `
            <div class="perguntas">
                <div class="pergunta" style='background-color:${quizz.questions[i].color}'"><span>${quizz.questions[i].title}</span></div>
                <div class="opcoes">`
                    for (let j=0; j<quizz.questions[i].answers.length; j++){
                        if (quizz.questions[i].answers[j].isCorrectAnswer){
                            stringUnica += 
                            `<div class="opcao respostaCerta" onclick="selecionarOpcao(this)">
                                <img src=${quizz.questions[i].answers[j].image} alt="imagem da primeira opcao">
                                <span>${quizz.questions[i].answers[j].text}</span>
                            </div>`
                        }else{
                            stringUnica += 
                            `<div class="opcao respostaErrada" onclick="selecionarOpcao(this)">
                                <img src=${quizz.questions[i].answers[j].image} alt="imagem da primeira opcao">
                                <span>${quizz.questions[i].answers[j].text}</span>
                            </div>`
                        }
                    }
            
        stringUnica+=`</div>
            </div>`
            
    document.querySelector(".imagemTop").scrollIntoView()
}
    stringUnica +=`
            <div class="pontos escondido">
                
            </div>
            <div class="botaoReiniciarQuizz" onclick="reiniciar()">
                <span>Reiniciar Quizz</span>
            </div>
            <div class="botaoHome" onclick="home()">
                <span>Voltar pra home</span>
            </div>`

    divUnicoQuizzPerguntas.innerHTML= stringUnica

    document.querySelector(".imagemTop").scrollIntoView()

}

let qtdAcertos = 0;
let qtdEscolhas = 0;
let porcentagemAcertos;
function selecionarOpcao(elemento){
    let perguntaReferente = elemento.parentNode;
    let opcoesReferentes = perguntaReferente.querySelectorAll(".opcao")
    if (elemento.classList.contains("respostaCerta")){
        qtdAcertos+=1
    }

    for (let i=0; i<opcoesReferentes.length; i++){
        opcoesReferentes[i].classList.add("esmaecido")

        if (opcoesReferentes[i].classList.contains("respostaCerta")){
            opcoesReferentes[i].classList.add("verde");

            opcoesReferentes[i].removeEventListener("click", selecionarOpcao);

        }else{
            opcoesReferentes[i].classList.add("vermelho")

            opcoesReferentes[i].removeEventListener("click", selecionarOpcao)
        }

    }
    qtdEscolhas+=1
    elemento.classList.remove("esmaecido")

    const divResultado = document.querySelector(".containerTela2").querySelector(".tela2").querySelector(".pontos")

    if (qtdEscolhas=== quizz.questions.length){
        divResultado.classList.remove("escondido")
        porcentagemAcertos=((qtdAcertos/qtdEscolhas)*100).toFixed(0)
        divResultado.innerHTML+=`
                <div class="resultado">
                    <div class="cabecalhoResultado">
                        <span>${porcentagemAcertos}% de acerto: ${quizz.levels[qualNivel(quizz, porcentagemAcertos)].title}</span>
                    </div>
                    <div class="imagemTextoResultado">
                        <img src=${quizz.levels[qualNivel(quizz, porcentagemAcertos)].image}>
                        <div>
                            <p>${quizz.levels[qualNivel(quizz, porcentagemAcertos)].text}</p>
                        </div>
                    </div>
                </div>` 
    }
    
}
function qualNivel(quizz,porcentagemAcertos){
    let minLevelsValue =[]
    for (let i=0;i<quizz.levels.length; i++){
         minLevelsValue.push(quizz.levels[i].minValue)
    }
    minLevelsValue.push(porcentagemAcertos)
    minLevelsValue.sort()
    
    let index = minLevelsValue.indexOf(porcentagemAcertos)
    let valorMinimo;

    if (minLevelsValue[index] === minLevelsValue[index+1]){
        valorMinimo = minLevelsValue[index+1]
    }else{
        valorMinimo = minLevelsValue[index-1]
    }

    for (let x = 0; x<quizz.levels.length; x++){
        if(quizz.levels[x].minValue === valorMinimo){
            return (x)
        }
    }
}

function home(){
    window.location.reload();
}


/*tela3-gabs*/
const infoQuizzUsuario = {
            
}

let qtdPerguntas;
function camposPreenchidos(){
    titulo = document.querySelector(".titulo").querySelector("input");
    imagemQuizz = document.querySelector(".imagem").querySelector("input");
    pergunta = document.querySelector(".quantidadePerguntas").querySelector("input");
    nivel = document.querySelector(".nivel").querySelector("input");
    botao = document.querySelector("button");
    if ((titulo.value.length >= 20) && (imagemQuizz.value !== "") && ((pergunta.value !=="") && (Number(pergunta.value) >= 3)) && ((nivel.value !== "") && (Number(nivel.value) >= 2))){
        const tela3 = document.querySelector(".tela3");
        const tela4 = document.querySelector(".tela4");
        qtdPerguntas = Number(pergunta.value);
        setTimeout(() => trocarDeTela(tela3,tela4) , 500);
    } else {
        alert("Preencha os dados corretamente!");
    }
    entradaPerguntas();
    infoQuizzUsuario = {
    title:`${titulo.value}` ,
    image:`${imagemQuizz.value}`,
    questions:`${pergunta}`,
    levels:`${nivel}` 
}  
}
/*TELA 4 - GABS*/
entradaPerguntas();

function entradaPerguntas(){
    qtdPerguntas = Number(pergunta.value);
    for(let i = 1; i <= qtdPerguntas; i++){
        adcPergunta(i);
        
    }
}

function adcPergunta(i){
   let totalPerguntas = document.querySelector(".perguntasRestantes");
   for(let i = 1; i <= qtdPerguntas; i++);
   totalPerguntas.innerHTML += `<div class="formu">
                                    <div class="escondePergunta" onclick="infoPerguntas(this)">
                                        <div class="pergunta2">
                                            <h2>Pergunta ${i}</h2>
                                            <ion-icon name="create-outline"></ion-icon>
                                        </div>
                                    </div>
                                </div>`
}
function infoPerguntas(elemento){

    console.log(elemento);
    elemento.classList.add("escondido");
    let form2 = document.querySelectorAll(".formu");
    console.log(form2);
    for(let j = 0; j < form2.length; j++){
    form2[j].innerHTML =`<div class="formulario2-1">
    <h3 class="pergunta1">Pergunta ${j+1}</h3>
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
</div>` }
}

function camposPreenchidosPerguntas(){
    let inputForm = document.querySelectorAll(".formulario2 input");
    console.log(inputForm);
    for(let i = 0; i < inputForm.length; i++){                    
        console.log(inputForm[i].value);
        if(inputForm[i].value !== ""){
            
            console.log('foi');
        } else {
            alert("Preencha os dados corretamente!");
        }
    } 

}

function armazenarQuizz(){
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes',
    {});
}


//console.log(qtdPerguntas)
