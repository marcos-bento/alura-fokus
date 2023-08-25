const html = document.querySelector('html');
const botoes = document.querySelectorAll('.app__card-button');
const titulo = document.querySelector('.app__title');
const imagem = document.querySelector('.app__image');

botoes.forEach(botao => {
    botao.addEventListener("click", () =>{
        botoes.forEach(botao => botao.classList.remove("active")); // Remove a classe active de todos botões
        botao.classList.add("active"); // Adiciona a classlist do botão que foi clicado
        const contexto = botao.getAttribute("data-contexto");
        mostraTempo(contexto);
        constroiFundo(contexto);
    });
});

function constroiFundo(contexto){
    switch (contexto) {
        case "foco":
            html.setAttribute("data-contexto", contexto);
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            imagem.setAttribute('src',`assets/img/${contexto}.png`)
            break;
        case "descanso-curto":
            html.setAttribute("data-contexto", contexto);
            titulo.innerHTML = `que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            imagem.setAttribute("src",`assets/img/${contexto}.png`)
            break;
        case "descanso-longo":
            html.setAttribute("data-contexto", contexto);
            titulo.innerHTML = `Hora de voltar à superficie.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            imagem.setAttribute("src",`assets/img/${contexto}.png`)
            break;
        default:

            break;
    }
};


// #############################################################################################################################
// Trabalhando com arquivo de audio
// #############################################################################################################################

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("../sons/luna-rise-part-one.mp3")
musica.loop = true;

musicaFocoInput.addEventListener("change", () =>{ musica.paused ? musica.play() : musica.pause() });

// #############################################################################################################################
// Trabalhando com temporizador
// #############################################################################################################################

const botaoIniciar = document.querySelector("#start-pause");
const textoBotaoIniciar = document.querySelector("#start-pause span");
const iconeBotaoIniciar = document.querySelector("#start-pause .app__card-primary-butto-icon");
let temporizador = 1500;
let intervaloId = null;
const play = new Audio("../sons/play.wav");
const pause = new Audio("../sons/pause.mp3");
const finalizou = new Audio("../sons/beep.mp3");
play.volume = 0.2;
pause.volume= 0.2;
finalizou.volume = 0.2;
const tempoNaTela = document.querySelector("#timer");

const contagemRegressiva = () => {
    if (temporizador <= 0){
        finalizou.play();
        alert('Tempo finalizado');
        zerar()
        textoBotaoIniciar.textContent = "Começar";
        iconeBotaoIniciar.setAttribute("src", `assets/img/play_arrow.png`)
        return;
    }
    temporizador -= 1;
    mostraTempo()
}

botaoIniciar.addEventListener("click", function(){
    textoBotaoIniciar.textContent = "Pausar";
    iconeBotaoIniciar.setAttribute("src", `assets/img/pause.png`)

    iniciarPausar();
});

function iniciarPausar(){
    if (intervaloId){
        zerar()
        pause.play();
        textoBotaoIniciar.textContent = "Começar";
        iconeBotaoIniciar.setAttribute("src", `assets/img/play_arrow.png`)
        return
    };
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null;
}

function mostraTempo(contexto){
    switch (contexto) {
        case "foco":
            temporizador = 1500;
            break;
        case "descanso-curto":
            temporizador = 300;
            break;
        case "descanso-longo":
            temporizador = 900;
            break;
        default:
            break;
    }
    const tempo = new Date(temporizador * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostraTempo();
