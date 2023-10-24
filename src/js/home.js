let userLogado = JSON.parse(localStorage.getItem('userLogado'))
let logado = document.getElementById('logado')

const btnSairForm = document.getElementById('btnSairForm')
const btnAddPet = document.getElementById('btnAddPet')

const btnSairFormEdit = document.getElementById('btnSairFormEdit')

let formPet = document.getElementById('formPet')
const formEditPet = document.getElementById('formEditPet')

const formulario = document.getElementById('formulario');
const cardsPets = document.getElementById('cardsPets');

const chavePetsUsuario = `pets_${userLogado.email}`;

logado.innerHTML = `Seja bem vindo(a) ao PetLife ${userLogado.nome}!!`

function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href = "../index.html"
}

// validção de autenticidade
if (localStorage.getItem('token') == null) {
    alert("Você Precisa estar logado para acessar essa página")
    window.location.href = 'login.html'
}

function carregarPetsDoLocalStorage() {
    const petsSalvos = JSON.parse(localStorage.getItem(chavePetsUsuario));
    if (petsSalvos && petsSalvos.length > 0) {
        return petsSalvos;
    }
    return [];
}

const petsCadastrados = carregarPetsDoLocalStorage();

// Adicionar evento para salvar os pets no localStorage
function salvarPetsNoLocalStorage() {
    localStorage.setItem(chavePetsUsuario, JSON.stringify(petsCadastrados));
}

//acionar formulário
btnAddPet.addEventListener('click', () => {
    formPet.setAttribute('style', 'display: block')
})

//fechar formulário
btnSairForm.addEventListener('click', () => {
    formPet.setAttribute('style', 'display: none')
})

function exibirPet(pet) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <h3> ${pet.nomePet}</h3>
        <img src="${pet.imagemURL}" alt="Imagem de perfil do cachorro" id="imagem-editar-preview">
        <p><strong>Raça:</strong> ${pet.racaPet}</p>
        <p><strong>Idade:</strong> ${pet.idadePet} anos</p>
        <p><strong>Sexo:</strong> ${pet.sexoPet}</p>
        <div class="btns-card-pet">
        <button class="btn-edit" id="btnEditPet">Editar <i class="fa-solid fa-pencil"></i></button>
        <button class="btn-servicos">Hall do Pet <i class="fa-solid fa-grip"></i></button>
        </div>
    `;

    // Adiciona o card ao container
    cardsPets.appendChild(card);
}

// Adiciona um evento de envio ao formulário
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const imagemPadraoURL = "../src/image/logo.png"
    const imagemPetInput = document.getElementById('imagemPet');
    const imagemURL = imagemPetInput.files[0] ? URL.createObjectURL(imagemPetInput.files[0]) : imagemPadraoURL;

    const nomePet = document.getElementById('nomePet').value;
    const racaPet = document.getElementById('racaPet').value;
    const idadePet = document.getElementById('idadePet').value;

    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
    const sexoPet = sexoSelecionado ? sexoSelecionado.value : "Não especificado";

    // Cria um novo card com os dados do formulário

    const pet = {
        imagemURL,
        nomePet,
        racaPet,
        idadePet,
        sexoPet
    };

    petsCadastrados.push(pet);


    // Salva os pets no localStorage após cada cadastro
    salvarPetsNoLocalStorage();

    exibirPet(pet)
    // Limpa os campos do formulário
    formPet.style.display = 'none';
});

petsCadastrados.forEach(exibirPet);

//fechar formulário de edição
btnSairFormEdit.addEventListener('click', () => {
    formEditPet.setAttribute('style', 'display: none')
})

function excluirPet(index) {
    if (confirm("Tem certeza de que deseja excluir este pet?")) {
        petsCadastrados.splice(index, 1); // Remove o pet do array
        salvarPetsNoLocalStorage(); // Salva a lista atualizada no armazenamento local
        petsCadastrados.forEach(exibirPet); // Atualiza a exibição dos pets
    }
}

const btnExcluirPet = document.querySelectorAll('#btnExcludePet')
btnExcluirPet.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        excluirPet(index);
    });
});

const btnsEditar = document.querySelectorAll('.btn-edit')
btnsEditar.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        formEditPet.style.display = 'block';

        const petIndex = index; // Índice do pet no array petsCadastrados

        // Obtém o pet a ser editado com base no índice
        const petEditando = petsCadastrados[petIndex];

        preencherFormularioEdicao(petIndex);

        formEditPet.addEventListener('submit', () => {
            // Obtém os novos valores do formulário de edição
            const novoNomePet = document.getElementById('nomeEditPet').value;
            const novaRacaPet = document.getElementById('racaEditPet').value;
            const novaIdadePet = document.getElementById('idadeEditPet').value;

            // Atualiza as informações do pet no array
            petsCadastrados[petIndex].nomePet = novoNomePet;
            petsCadastrados[petIndex].racaPet = novaRacaPet;
            petsCadastrados[petIndex].idadePet = novaIdadePet;

            // Define o sexo atual no formulário de edição
            const sexoEditSelecionado = document.querySelector('input[name="sexoEdit"]:checked');
            if (sexoEditSelecionado) {
                petEditando.sexoPet = sexoEditSelecionado.value;
            }

            // Atualiza a imagem do pet se uma nova imagem for selecionada (opcional)
            const novaImagem = document.getElementById('imagemEditPet').files[0];
            if (novaImagem) {
                petEditando.imagemURL = URL.createObjectURL(novaImagem);
                document.getElementById('imagem-editar-preview').src = petEditando.imagemURL;
            }

            salvarPetsNoLocalStorage();

            exibirPet();

            // alert(petsCadastrados[index].racaPet)
        })
    })
})

function preencherFormularioEdicao(petIndex) {
    const petEditando = petsCadastrados[petIndex];

    // Preencha os campos do formulário de edição com os detalhes do pet
    document.getElementById('nomeEditPet').value = petEditando.nomePet;
    document.getElementById('racaEditPet').value = petEditando.racaPet;
    document.getElementById('idadeEditPet').value = petEditando.idadePet;

    // Defina o sexo do pet no formulário de edição
    const sexoEditSelecionado = document.querySelector(`input[name="sexoEdit"][value="${petEditando.sexoPet}"]`);
    if (sexoEditSelecionado) {
        sexoEditSelecionado.checked = true;
    }

    // Atualize a imagem de visualização no formulário de edição
    document.getElementById('imagemEditPetPreview').src = petEditando.imagemURL;
}

const btnsAcessarServicos = document.querySelectorAll('.btn-servicos');
btnsAcessarServicos.forEach((botao, index) => {
    botao.addEventListener('click', () => {

        const petIndex = index;
        const petDados = petsCadastrados[petIndex];
        const nomeDoPet = petDados.nomePet;
        const imagemDoPet = petDados.imagemURL

        // Redirecione o usuário para a página de serviços, passando o nome do pet na URL
        window.location.href = `../html/servicos-pets.html?pet=${encodeURIComponent(nomeDoPet)}&imagem=${encodeURIComponent(imagemDoPet)}`;
    })
})