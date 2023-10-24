let btnCriar = document.querySelector('#verCriarSenha')
let btnConfirm = document.querySelector('#verConfirmarSenha')
let btnSubmit = document.getElementById('btnSubmit');

let labelNome = document.querySelector('#labelNome')
let nome = document.querySelector('#nome')
let validNome = false;

let labelEmail = document.querySelector('#labelEmail')
let email = document.querySelector('#email')
let validEmail = false;

let labelFone = document.querySelector('#labelFone')
let fone = document.querySelector('#fone')
let validFone = false;

let labelCriarSenha = document.querySelector('#labelCriarSenha')
let criarSenha = document.querySelector('#criarSenha')
let validCriarSenha = false;

let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let confirmSenha = document.querySelector('#confirmSenha')
let validConfirmSenha = false;


// validação do formulário

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color:red')
        labelNome.innerHTML = 'Nome Completo: *insira ao menos 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false;
    } else {
        labelNome.setAttribute('style', 'color:green')
        labelNome.innerHTML = 'Nome Completo: <i class="fa-solid fa-check"></i>'
        nome.setAttribute('style', 'border-color: green')
        validNome = true;
    }
})

email.addEventListener('keyup', () => {
    if (email.value.length <= 2) {
        labelEmail.setAttribute('style', 'color:red')
        labelEmail.innerHTML = 'Email: *insira ao menos 3 caracteres'
        email.setAttribute('style', 'border-color: red')
        validEmail = false;
    } else {
        labelEmail.setAttribute('style', 'color:green')
        labelEmail.innerHTML = 'Email: <i class="fa-solid fa-check"></i>'
        email.setAttribute('style', 'border-color: green')
        validEmail = true;
    }
})

fone.addEventListener('keyup', () => {
    if (fone.value.length <= 10) {
        labelFone.setAttribute('style', 'color:red')
        labelFone.innerHTML = 'Telefone: o telefone deve conter 11 numeros'
        fone.setAttribute('style', 'border-color: red')
        validFone = false;
    } else {
        labelFone.setAttribute('style', 'color:green')
        labelFone.innerHTML = 'Telefone: <i class="fa-solid fa-check"></i>'
        fone.setAttribute('style', 'border-color: green')
        validFone = true;
    }
})

criarSenha.addEventListener('keyup', () => {
    if (criarSenha.value.length <= 5) {
        labelCriarSenha.setAttribute('style', 'color:red')
        labelCriarSenha.innerHTML = 'Crie Uma Senha: No mínimo 6 caracteres'
        criarSenha.setAttribute('style', 'border-color: red')
        validCriarSenha = false;
    } else {
        labelCriarSenha.setAttribute('style', 'color:green')
        labelCriarSenha.innerHTML = 'Crie Uma Senha: <i class="fa-solid fa-check"></i>'
        criarSenha.setAttribute('style', 'border-color: green')
        validCriarSenha = true;
    }
})

confirmSenha.addEventListener('keyup', () => {
    if (criarSenha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color:red')
        labelConfirmSenha.innerHTML = 'Confirmar Senha: As senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color:green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha: <i class="fa-solid fa-check"></i>'
        confirmSenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true;
    }
})

btnSubmit.addEventListener('click', () => {

    if (validNome && validEmail && validFone && validCriarSenha && validConfirmSenha) {
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push(
            {
                nomeCad: nome.value,
                emailCad: email.value,
                foneCad: fone.value,
                senhaCad: criarSenha.value
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))
        window.location.href = "login.html"

    } else {
        alert('Preencha o Formulário Corretamente')
    }
})

// efeito de aparecer a senha

btnCriar.addEventListener('click', () => {
    let inputCriarSenha = document.querySelector('#criarSenha')

    if (inputCriarSenha.getAttribute('type') == 'password') {
        inputCriarSenha.setAttribute('type', 'text')        
    } else {
        inputCriarSenha.setAttribute('type', 'password')
    }
})

btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if (inputConfirmSenha.getAttribute('type') == 'password') {
        inputConfirmSenha.setAttribute('type', 'text')
    } else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
})
