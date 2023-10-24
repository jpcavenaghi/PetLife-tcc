let nomePetLogado = document.getElementById('nomePetLogado');
let imgPetLogado = document.getElementById('imgPetLogado');

// Função para obter o valor de um parâmetro na URL
function obterValorParametroUrl(parametro) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(parametro);
}

// Obtenha o nome do pet da URL
const nomeDoPet = obterValorParametroUrl('pet');
const imagemDoPet = obterValorParametroUrl('imagem');

// Exiba a mensagem de boas-vindas e o nome do pet
nomePetLogado.innerHTML = `Bem-vindo(a) ao hall de ${nomeDoPet}!`;
imgPetLogado.src = imagemDoPet;

//console.log(nomeDoPet)