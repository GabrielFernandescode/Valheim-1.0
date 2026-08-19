const dataLancamento = new Date('2026-09-09T00:00:00').getTime();

const atualizaContador = setInterval(function() {
    const agora = new Date().getTime();
    const diferenca = dataLancamento - agora;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias.toString().padStart(2, '0');
    document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
    document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');

    if (diferenca < 0) {
        clearInterval(atualizaContador);
        document.querySelector(".contador").innerHTML = "<h2>A EXPEDIÇÃO COMEÇOU!</h2>";
    }
}, 1000);

const botaoAmbiente = document.getElementById("botao");
const audio = document.getElementById("audio-ambiente");
const textoStatus = document.getElementById("status");

let tocando = false;

botaoAmbiente.addEventListener("click", function() {
    if (!tocando) {
        audio.play();
        botaoAmbiente.innerText = "⚔ SILENCIAR AMBIENTE";
        botaoAmbiente.style.borderColor = "#ffaa00";
        textoStatus.innerText = "Os deuses estão ouvindo...";
        tocando = true;
    } else {
        audio.pause();
        botaoAmbiente.innerText = "⚔ ATIVAR AMBIENTE";
        botaoAmbiente.style.borderColor = "#516b84";
        textoStatus.innerText = "";
        tocando = false;
    }
});

const btnPlayers = document.getElementById('btn-players');
const modalPlayers = document.getElementById('modal-players');
const btnFecharModal = document.getElementById('fechar-modal');

btnPlayers.addEventListener('click', () => {
    modalPlayers.classList.remove('modal-oculto');
    modalPlayers.classList.add('modal-visivel');
});

btnFecharModal.addEventListener('click', () => {
    modalPlayers.classList.remove('modal-visivel');
    modalPlayers.classList.add('modal-oculto');
});

window.addEventListener('click', (event) => {
    if (event.target === modalPlayers) {
        modalPlayers.classList.remove('modal-visivel');
        modalPlayers.classList.add('modal-oculto');
    }
});