const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const totalGastoText = document.querySelector("#totalGastoText");
const quantia = document.querySelector("#quantia");
const btnNovo = document.querySelector("#btnNovo");
const saidas = document.querySelector(".saidas");
const total = document.querySelector(".total");

// Obtenha o email do usuário logado
const usuarioLogado = JSON.parse(localStorage.getItem("userLogado"));
const emailUsuario = usuarioLogado.email;

// Use o email do usuário para criar uma chave única no localStorage
const chaveLocalStorage = `gastos-${emailUsuario}`;
const getItensLS = () => JSON.parse(localStorage.getItem(chaveLocalStorage)) || [];

let items = getItensLS() || [];

btnNovo.onclick = () => {
  if (descItem.value === "" || quantia.value === "") {
    return alert("Preencha todos os campos");
  }

  items.push({
    desc: descItem.value,
    quantia: Math.abs(quantia.value).toFixed(2),
    tipoSaldo: "Saída",
  });

  setItensLS();

  loadItens();

  descItem.value = "";
  quantia.value = "";
};

function deletarItem(index) {
  items.splice(index, 1);
  setItensLS();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");
  let totalGasto = 0;

  tr.innerHTML = `
    <td>${item.desc}</td>
    <td>${item.quantia}</td>
    <td class="coluna-tipo">${
      item.tipoSaldo === "Entrada"
        ? '<i class="fa-solid fa-chevron-up"></i>'
        : '<i class="fa-solid fa-chevron-down"></i>'
    }</td>
    <td class="coluna-acao">
    <button onclick="deletarItem(${index})"><i class="fa-solid fa-trash"></i></button>
    </td>
    `;

  tbody.appendChild(tr);
}

function loadItens() {
  items = getItensLS() || [];
  tbody.innerHTML = "";
  let totalGasto = 0;
  items.forEach((item, index) => {
    insertItem(item, index);
    totalGasto += parseFloat(item.quantia);
  });

  totalGastoText.innerHTML = `O total gasto com despesas do pet é de R$ ${totalGasto.toFixed(2)}`;
}


const setItensLS = () => localStorage.setItem(chaveLocalStorage, JSON.stringify(items));

loadItens();
