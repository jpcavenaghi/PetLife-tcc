const formularioDespertador = document.getElementById('formulario-despertador');
const alertaSonoro = document.getElementById('alerta-sonoro');
const lembretesContainer = document.getElementById('lembretes');

const userLogado = JSON.parse(localStorage.getItem('userLogado'));
const emailUsuario = userLogado.email;

let intervalo;
let lembretes = JSON.parse(localStorage.getItem(emailUsuario)) || [];

// Função para criar e exibir um card de lembrete
function criarCardLembrete(lembrete, index) {
    const card = document.createElement('div');
    card.classList.add('card-lembrete');

    card.innerHTML = `
        <h2>${lembrete.nome}</h2>
        <p>Data: ${lembrete.data}</p>
        <p>Horário: ${lembrete.horario}</p>
        <i class="fa-solid fa-trash"></i>
    `;

    lembretesContainer.appendChild(card);
}

lembretesContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('fa-trash')) {
        // O ícone de exclusão foi clicado
        const index = target.getAttribute('data-index');
        excluirLembrete(index);
    }
});

function excluirLembrete(index) {
    if (confirm('Tem certeza de que deseja excluir este lembrete?')) {
        // Remove o lembrete do array
        lembretes.splice(index, 1);

        // Atualize a exibição dos lembretes
        exibirLembretes();

        // Atualize o armazenamento local
        localStorage.setItem(emailUsuario, JSON.stringify(lembretes));
    }
}

// Função para configurar o alarme
function configurarAlarme(lembrete) {
    clearInterval(intervalo);

    intervalo = setInterval(function () {
        const agora = new Date();
        const [hora, minuto] = lembrete.horario.split(':');
        const [ano, mes, dia] = lembrete.data.split('-');

        if (agora.getFullYear() === Number(ano) && agora.getMonth() + 1 === Number(mes) && agora.getDate() === Number(dia) && agora.getHours() === Number(hora) && agora.getMinutes() === Number(minuto)) {
            alert(`Alarme de "${lembrete.nome}" disparado! Hora do Remédio!!`);
            alertaSonoro.play();
            clearInterval(intervalo);
        }
    }, 1000);
}

formularioDespertador.addEventListener('submit', function (event) {
    event.preventDefault();

    const nomeDespertador = document.getElementById('nome-despertador').value;
    const dataDespertador = document.getElementById('data-despertador').value;
    const horarioDespertador = document.getElementById('horario-despertador').value;

    if (!nomeDespertador || !dataDespertador || !horarioDespertador) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const lembrete = { nome: nomeDespertador, data: dataDespertador, horario: horarioDespertador };
    lembretes.push(lembrete);

    // Chame a função para criar e exibir o card do lembrete imediatamente
    criarCardLembrete(lembrete);

    // Chame a função para configurar o alarme
    configurarAlarme(lembrete);

    // Salve os lembretes no localStorage associados ao email do usuário
    localStorage.setItem(emailUsuario, JSON.stringify(lembretes));

    // Limpe os campos
    document.getElementById('nome-despertador').value = '';
    document.getElementById('data-despertador').value = '';
    document.getElementById('horario-despertador').value = '';
});

function exibirLembretes() {
    // Limpa o contêiner de lembretes
    lembretesContainer.innerHTML = '';

    // Recria os cards de lembretes
    lembretes.forEach((lembrete, index) => {
        criarCardLembrete(lembrete, index);
    });
}

// Carregue os lembretes do localStorage ao carregar a página para o usuário logado
lembretes.forEach(criarCardLembrete);

// Configure os alarmes para os lembretes do usuário logado
lembretes.forEach(configurarAlarme);
