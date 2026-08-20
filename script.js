const supabaseUrl = 'https://cksihvhvwxiyqutdvzbx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrc2lodmh2d3hpeXF1dGR2emJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMTUwNjAsImV4cCI6MjEwMjc5MTA2MH0.A4FQ9SjzVW61JI_BLpOI3bPofyaTqhS3tqXsaZQldH4'; 
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

if (localStorage.getItem('passaporte_valheim') === 'autorizado') {
    const telaPortalInicial = document.getElementById('tela-portal');
    if (telaPortalInicial) {
        telaPortalInicial.classList.add('portal-oculto');
    }
}

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
audio.volume = 0.1;
const textoStatus = document.getElementById("status");

let tocando = false;

botaoAmbiente.addEventListener("click", function() {
    if (!tocando) {
        try { audio.play(); } catch(e) {}
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

async function carregarPlayers() {
    const { data, error } = await supabaseClient.from('players').select('*');
    
    if (!error && data) {
        const tabelaCorpo = document.getElementById('tabela-corpo');
        tabelaCorpo.innerHTML = '';
        data.forEach(player => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${player.nick}</td><td>${player.funcao}</td>`;
            tabelaCorpo.appendChild(tr);
        });
    }
}

carregarPlayers();

const btnEntrar = document.getElementById('btn-entrar');
const telaPortal = document.getElementById('tela-portal');
const anelPortal = document.querySelector('.portal-anel');
const conteudoPortal = document.querySelector('.portal-conteudo');
const audioPortal = document.getElementById('audio-portal');
const inputNick = document.getElementById('input-nick');
const inputFuncao = document.getElementById('input-funcao');
const erroPortal = document.getElementById('erro-portal');

btnEntrar.addEventListener('click', async () => {
    if (inputNick.value.trim() === '' || !inputFuncao.value) {
        erroPortal.innerText = "Preencha seu Nick e selecione a Função!";
        return; 
    }

    erroPortal.innerText = "Invocando os deuses...";
    btnEntrar.disabled = true;

    const { error } = await supabaseClient
        .from('players')
        .insert([{ nick: inputNick.value.trim(), funcao: inputFuncao.value }]);

    if (error) {
        erroPortal.innerText = "Erro: Este Nick já foi registrado ou a conexão falhou.";
        btnEntrar.disabled = false;
        return;
    }

    localStorage.setItem('passaporte_valheim', 'autorizado');

    erroPortal.innerText = "";
    conteudoPortal.classList.add('esconder-conteudo');
    
    try { audioPortal.play(); } catch(e) {}
    
    anelPortal.classList.add('portal-fogo');

    carregarPlayers();

    setTimeout(() => {
        telaPortal.classList.add('portal-oculto');
    }, 5000);
});
