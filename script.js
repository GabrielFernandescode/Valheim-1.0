/* =========================================================
   VALHEIM 1.0
   CONTAGEM REGRESSIVA + EFEITOS + INTERAÇÕES
   ========================================================= */


/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */

const DATA_LANCAMENTO =
    new Date("2026-09-09T00:00:00-03:00");


/* =========================================================
   ELEMENTOS DA PÁGINA
   ========================================================= */

const diasElemento =
    document.getElementById("dias");

const horasElemento =
    document.getElementById("horas");

const minutosElemento =
    document.getElementById("minutos");

const segundosElemento =
    document.getElementById("segundos");

const botao =
    document.getElementById("botao");

const status =
    document.getElementById("status");


/* =========================================================
   FUNÇÃO PARA FORMATAR NÚMEROS
   ========================================================= */

function formatarNumero(numero) {

    return String(numero).padStart(2, "0");

}


/* =========================================================
   EFEITO DE BRILHO NOS NÚMEROS
   ========================================================= */

function atualizarNumero(elemento, valor) {

    const valorFormatado =
        formatarNumero(valor);


    if (
        elemento.textContent !==
        valorFormatado
    ) {

        elemento.textContent =
            valorFormatado;


        elemento.animate(

            [
                {
                    transform:
                        "scale(1)",
                    filter:
                        "brightness(1)"
                },

                {
                    transform:
                        "scale(1.08)",
                    filter:
                        "brightness(1.8)"
                },

                {
                    transform:
                        "scale(1)",
                    filter:
                        "brightness(1)"
                }
            ],

            {
                duration: 350,
                easing:
                    "ease-out"
            }

        );

    }

}


/* =========================================================
   CONTAGEM REGRESSIVA
   ========================================================= */

function atualizarContagem() {

    const agora =
        new Date();

    const diferenca =
        DATA_LANCAMENTO - agora;


    /* -----------------------------------------
       LANÇAMENTO CHEGOU
       ----------------------------------------- */

    if (diferenca <= 0) {

        atualizarNumero(
            diasElemento,
            0
        );

        atualizarNumero(
            horasElemento,
            0
        );

        atualizarNumero(
            minutosElemento,
            0
        );

        atualizarNumero(
            segundosElemento,
            0
        );


        status.textContent =
            "⚔️ A VERSÃO 1.0 CHEGOU. O DEEP NORTH AGUARDA.";


        return;

    }


    /* -----------------------------------------
       CALCULAR TEMPO
       ----------------------------------------- */

    const totalSegundos =
        Math.floor(
            diferenca / 1000
        );


    const dias =
        Math.floor(
            totalSegundos / 86400
        );


    const horas =
        Math.floor(
            (totalSegundos % 86400)
            / 3600
        );


    const minutos =
        Math.floor(
            (totalSegundos % 3600)
            / 60
        );


    const segundos =
        totalSegundos % 60;


    /* -----------------------------------------
       ATUALIZAR TELA
       ----------------------------------------- */

    atualizarNumero(
        diasElemento,
        dias
    );

    atualizarNumero(
        horasElemento,
        horas
    );

    atualizarNumero(
        minutosElemento,
        minutos
    );

    atualizarNumero(
        segundosElemento,
        segundos
    );

}


/* =========================================================
   INICIAR CONTAGEM
   ========================================================= */

atualizarContagem();


setInterval(
    atualizarContagem,
    1000
);


/* =========================================================
   PARTÍCULAS DE LUZ
   ========================================================= */

function criarParticula() {

    const particula =
        document.createElement("div");


    particula.style.position =
        "fixed";


    particula.style.width =
        "3px";


    particula.style.height =
        "3px";


    particula.style.borderRadius =
        "50%";


    particula.style.background =
        "#b9df83";


    particula.style.boxShadow =
        "0 0 10px #b9df83";


    particula.style.pointerEvents =
        "none";


    particula.style.zIndex =
        "1";


    particula.style.left =
        Math.random() * 100 + "%";


    particula.style.top =
        Math.random() * 100 + "%";


    document.body.appendChild(
        particula
    );


    const duracao =
        5000 +
        Math.random() * 8000;


    particula.animate(

        [
            {
                transform:
                    "translateY(0px)",
                opacity: 0
            },

            {
                transform:
                    "translateY(-40px)",
                opacity: .8
            },

            {
                transform:
                    "translateY(-100px)",
                opacity: 0
            }
        ],

        {
            duration:
                duracao,

            easing:
                "ease-in-out"
        }

    );


    setTimeout(

        () => {

            particula.remove();

        },

        duracao

    );

}


/* =========================================================
   GERAR PARTÍCULAS
   ========================================================= */

setInterval(

    criarParticula,

    700

);


/* =========================================================
   SISTEMA DE ÁUDIO
   ========================================================= */

/*
   IMPORTANTE:

   O navegador não permite iniciar música
   automaticamente.

   Por isso precisamos da interação
   do usuário através do botão.
*/


let audio = null;

let musicaAtiva = false;


/* =========================================================
   PREPARAR ÁUDIO
   ========================================================= */

function prepararAudio() {

    /*
       Quando colocarmos uma música própria
       no GitHub, podemos usar:

       audio = new Audio("musica.mp3");

       Por enquanto não criamos áudio.
    */

}


/* =========================================================
   BOTÃO DE AMBIENTE
   ========================================================= */

botao.addEventListener(

    "click",

    () => {

        musicaAtiva =
            !musicaAtiva;


        /* ---------------------------------
           ATIVAR
           --------------------------------- */

        if (musicaAtiva) {

            botao.textContent =
                "⏸ PAUSAR AMBIENTE";


            status.textContent =
                "🌲 A floresta desperta...";


            /*
               Aqui posteriormente
               vamos iniciar a música.
            */

        }


        /* ---------------------------------
           DESATIVAR
           --------------------------------- */

        else {

            botao.textContent =
                "⚔ ATIVAR AMBIENTE";


            status.textContent =
                "A floresta voltou ao silêncio.";

        }

    }

);


/* =========================================================
   INTERAÇÃO COM O MOUSE
   ========================================================= */

document.addEventListener(

    "mousemove",

    (evento) => {

        const x =
            (evento.clientX /
            window.innerWidth -
            .5) * 2;


        const y =
            (evento.clientY /
            window.innerHeight -
            .5) * 2;


        const poster =
            document.querySelector(
                ".poster"
            );


        /*
           Movimento extremamente
           pequeno para criar
           efeito 3D.
        */

        poster.style.transform =
            `
            perspective(1000px)
            rotateY(${x * 1.5}deg)
            rotateX(${-y * 1.5}deg)
            `;

    }

);


/* =========================================================
   RESET DO EFEITO 3D NO CELULAR
   ========================================================= */

window.addEventListener(

    "resize",

    () => {

        if (
            window.innerWidth < 700
        ) {

            const poster =
                document.querySelector(
                    ".poster"
                );


            poster.style.transform =
                "none";

        }

    }

);


/* =========================================================
   EFEITO AO TOCAR NO POSTER
   ========================================================= */

document.addEventListener(

    "touchstart",

    () => {

        if (
            window.innerWidth < 700
        ) {

            status.textContent =
                "🌲 As runas despertaram...";

        }

    },

    {
        passive: true
    }

);


/* =========================================================
   FINAL
   ========================================================= */

console.log(
    "🌲 Valheim 1.0 Countdown iniciado."
);

console.log(
    "⚔️ O Deep North aguarda."
);
