let btnEye = document.querySelector('.fa-eye')

let email = document.getElementById('email')
let labelEmail = document.getElementById('labelEmail')

let senha = document.getElementById('senha')
let labelSenha = document.getElementById('labelSenha')


// validação de formulário

function logar() {
    let listaUser = []

    let userValid = {
        nome: '',
        email: '',
        fone: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if (email.value == item.emailCad && senha.value == item.senhaCad) {
            userValid = {
                nome: item.nomeCad,
                email: item.emailCad,
                fone: item.foneCad,
                senha: item.senhaCad
            }
        }
    })

    let msgErro = document.getElementById('msgErro')

    if (email.value == userValid.email && senha.value == userValid.senha) {
        window.location.href = "home.html"
        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)
        localStorage.setItem('userLogado', JSON.stringify(userValid))
    } else {
        labelEmail.setAttribute('style', 'color:red')
        email.setAttribute('style', 'border-color: red')
        labelSenha.setAttribute('style', 'color:red')
        senha.setAttribute('style', 'border-color: red')
        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = 'Usuário ou Senha Incorretos'
        email.focus()
    }

}


// ver e desver senha
btnEye.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

