document.addEventListener('DOMContentLoaded', function () {
    const formVacina = document.getElementById('formVacina');
    const containerCarteira = document.getElementById('containerCarteira');
    const adicionarButton = document.getElementById('adicionarVacina');

    // Função para obter o usuário logado (pode ser implementada de acordo com sua autenticação)
    function obterUsuarioLogado() {
        const usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
        const emailUsuario = usuarioLogado.email;
        return emailUsuario
    }

    // Função para obter as vacinas do localStorage para o usuário logado
    function obterVacinasDoLocalStorage() {
        const userKey = obterUsuarioLogado();
        const userVacinas = localStorage.getItem(userKey);
        return userVacinas ? JSON.parse(userVacinas) : [];
    }

    // Função para salvar as vacinas no localStorage do usuário logado
    function salvarVacinasNoLocalStorage(vacinas) {
        const userKey = obterUsuarioLogado();
        localStorage.setItem(userKey, JSON.stringify(vacinas));
    }

    // Função para criar um novo elemento "item-vacina"
    function criarItemVacina(nomeVacina, dataVacina, nomeMedico) {
        const newItemVacina = document.createElement('div');
        newItemVacina.classList.add('item-vacina');

        newItemVacina.innerHTML = `
            <h4>Nome da Vacina: ${nomeVacina}</h4>
            <p>Data da Vacina: ${dataVacina}</p>
            <p>Médico(a): ${nomeMedico}</p>
            <i class="fa-solid fa-trash excluirVacina"></i>
        `;

        // Adicionar evento de clique para excluir a vacina
        const excluirButton = newItemVacina.querySelector('.excluirVacina');
        excluirButton.addEventListener('click', () => excluirVacina(newItemVacina));

        return newItemVacina;
    }

    // Função para excluir a vacina
    function excluirVacina(itemVacina) {
        containerCarteira.removeChild(itemVacina);
        const vacinas = obterVacinasDoLocalStorage();
        const itemIndex = Array.from(containerCarteira.children).indexOf(itemVacina);
        vacinas.splice(itemIndex, 1);
        salvarVacinasNoLocalStorage(vacinas);
    }

    // Adicionar evento de envio do formulário
    formVacina.addEventListener('submit', function (event) {
        event.preventDefault();

        const nomeVacina = document.getElementById('nomeVacina').value;
        const dataVacina = document.getElementById('dataVacina').value;
        const nomeMedico = document.getElementById('nomeMedico').value;

        // Crie um novo elemento "item-vacina"
        const newItemVacina = criarItemVacina(nomeVacina, dataVacina, nomeMedico);

        // Anexe o novo "item-vacina" ao "container-carteira"
        containerCarteira.appendChild(newItemVacina);

        // Limpe o formulário
        document.getElementById('nomeVacina').value = '';
        document.getElementById('dataVacina').value = '';
        document.getElementById('nomeMedico').value = '';

        // Obtenha as vacinas atuais do usuário logado
        const vacinas = obterVacinasDoLocalStorage();

        // Adicione a nova vacina à lista
        vacinas.push({ nomeVacina, dataVacina, nomeMedico });

        // Salve as vacinas atualizadas no localStorage
        salvarVacinasNoLocalStorage(vacinas);
    });

    // Exiba as vacinas ao carregar a página
    const vacinas = obterVacinasDoLocalStorage();
    for (const vacina of vacinas) {
        const newItemVacina = criarItemVacina(vacina.nomeVacina, vacina.dataVacina, vacina.nomeMedico);
        containerCarteira.appendChild(newItemVacina);
    }
});
