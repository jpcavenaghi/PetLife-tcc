const consultaForm = document.getElementById('consulta-form');
const consultasDiv = document.getElementById('consultas');
const usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
const emailUsuario = usuarioLogado.email;
const chaveLocalStorage = `consultas-${emailUsuario}`;
let consultas = JSON.parse(localStorage.getItem(chaveLocalStorage)) || [];

consultaForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const clinica = document.getElementById('clinica').value;
    const medico = document.getElementById('medico').value;

    if (!data || !hora) {
        alert('Por favor, preencha a data e a hora.');
        return;
    }

    const consulta = { data, hora, clinica, medico };
    consultas.push(consulta);

    // Salvar consultas no localStorage
    localStorage.setItem(chaveLocalStorage, JSON.stringify(consultas));

    // Limpar o formulário
    consultaForm.reset();

    // Adicionar a consulta ao HTML
    adicionarConsulta(consulta);
});

function adicionarConsulta(consulta) {
    const consultaCard = document.createElement('div');
    consultaCard.classList.add('consulta-card');

    consultaCard.innerHTML = `
        <p>Data: ${consulta.data}</p>
        <p>Hora: ${consulta.hora}</p>
        <p>Clínica: ${consulta.clinica || 'Não especificada'}</p>
        <p>Médico: ${consulta.medico || 'Não especificado'}</p>
        <i class="fa-solid fa-trash btn-excluir"></i>
    `;

    consultasDiv.appendChild(consultaCard);

    // Adicione um ouvinte de evento para o botão "Excluir"
    const btnExcluir = consultaCard.querySelector('.btn-excluir');
    btnExcluir.addEventListener('click', function () {
        consultasDiv.removeChild(consultaCard);
        removerConsulta(consulta);
    });
}

function removerConsulta(consulta) {
    const consultaIndex = consultas.findIndex(c => c.data === consulta.data && c.hora === consulta.hora);

    if (consultaIndex !== -1) {
        consultas.splice(consultaIndex, 1);
        localStorage.setItem(chaveLocalStorage, JSON.stringify(consultas));
    }
}

// Carregue as consultas ao iniciar a página
consultas.forEach(adicionarConsulta);