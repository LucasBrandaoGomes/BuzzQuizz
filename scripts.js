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
        `<div class="imagensQuizzes" onclick="irParaQuizz(this)">
            <img src="${quizzes[i].image}" alt="imagem-quizz">
            <span class="legendaQuizz">${quizzes[i].title}</span>
        </div>`
    }
}
pegarListaQuizes()

/* IR PARA O QUIZZ ESCOLHIDO */

/*function irParaQuizz(){
    


}*/

/* CRIAR QUIZZ */

