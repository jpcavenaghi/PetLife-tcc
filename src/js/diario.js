const dataInput = document.getElementById('data');
const descricaoInput = document.getElementById('descricao');
const entradasDiario = document.getElementById('entradas-diario');
const btnAdicionar = document.getElementById('btnAdicionarTxt');
const userLogado = JSON.parse(localStorage.getItem('userLogado'));

let entradas = [];

// Verifica se o usuário logado existe no localStorage
if (!userLogado || !userLogado.email) {
    alert('Faça o login para usar o diário.');
    // Redirecione ou tome alguma ação apropriada para não autenticados.
}

// Carrega as entradas do usuário logado do localStorage, se existirem
const entradasArmazenadas = localStorage.getItem(`entradasDiario_${userLogado.email}`);
if (entradasArmazenadas) {
    entradas = JSON.parse(entradasArmazenadas);
    exibirEntradas();
}

function adicionarEntrada() {
    const data = dataInput.value;
    const descricao = descricaoInput.value;

    if (!data || !descricao) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const entrada = { data, descricao };
    entradas.push(entrada);

    dataInput.value = '';
    descricaoInput.value = '';

    exibirEntradas();

    // Armazena as entradas do usuário logado no localStorage
    localStorage.setItem(`entradasDiario_${userLogado.email}`, JSON.stringify(entradas));
}

function exibirEntradas() {
    entradasDiario.innerHTML = ''; // Limpa o conteúdo atual

    entradas.forEach((entrada, index) => {
        const divEntrada = document.createElement('div');
        divEntrada.classList.add('entrada');

        const divData = document.createElement('div');
        divData.classList.add('data');
        divData.textContent = entrada.data;

        const divDescricao = document.createElement('div');
        divDescricao.classList.add('descricao');
        divDescricao.textContent = entrada.descricao;

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirEntrada(index));

        divEntrada.appendChild(divData);
        divEntrada.appendChild(divDescricao);
        divEntrada.appendChild(btnExcluir);

        entradasDiario.appendChild(divEntrada);
    });
}

function excluirEntrada(index) {
    if (confirm('Tem certeza de que deseja excluir esta entrada?')) {
        entradas.splice(index, 1);
        exibirEntradas();
        localStorage.setItem(`entradasDiario_${userLogado.email}`, JSON.stringify(entradas));
    }
}

btnAdicionar.addEventListener('click', adicionarEntrada);
