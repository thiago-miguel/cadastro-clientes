let clientesVisiveis = false;

export function adicionarClienteNaLista(cliente, lista, mensagemVazia) {
  const li = document.createElement("li");
  li.classList.add("cliente");

  const spanNome = document.createElement("span");
  spanNome.classList.add("cliente-nome");
  spanNome.textContent = cliente.nome;

  const spanEmail = document.createElement("span");
  spanEmail.classList.add("cliente-email");
  spanEmail.textContent = cliente.email;

  const botaoExcluir = document.createElement("button");
  botaoExcluir.classList.add("btn-excluir");
  botaoExcluir.textContent = "Excluir";

  botaoExcluir.addEventListener("click", () => {
    excluirCliente(cliente._id, li, lista, mensagemVazia);
  });

  li.append(spanNome, spanEmail, botaoExcluir);
  lista.appendChild(li);

  atualizarUI(lista, mensagemVazia);
}

//DELETE
function excluirCliente(id, li, lista, mensagemVazia) {
  fetch(
    `https://crudcrud.com/api/86a3419b74d54ac788a22363ddd2392f/cadastro/${id}`,
    {
      method: "DELETE",
    }
  )
    .then(() => {
      li.remove();
      atualizarUI(lista, mensagemVazia);
    })
    .catch((error) => console.error("Erro ao excluir cliente:", error));
}

// Botão de mostrar/ocultar clientes
export function inicializarToggleClientes(botao, lista, mensagemVazia) {

  botao.addEventListener("click", () => {
    clientesVisiveis = !clientesVisiveis;

    botao.textContent = clientesVisiveis
      ? "Ocultar clientes"
      : "Mostrar clientes";

    atualizarUI(lista, mensagemVazia);
  });
}

// Atualiza a UI para mostrar ou esconder a mensagem de "sem clientes"
export function atualizarUI(lista, mensagemVazia) {
  if (!clientesVisiveis) {
    lista.classList.add("hidden");
    mensagemVazia.classList.add("hidden");
    return;
  }

  if (lista.children.length === 0) {
    lista.classList.add("hidden");
    mensagemVazia.classList.remove("hidden");
  } else {
    lista.classList.remove("hidden");
    mensagemVazia.classList.add("hidden");
  }
}

// UI do Botão Excluir Todos
export function atualizarEstadoBotaoExcluirTodos(botao, lista) {
    botao.disabled = lista.children.length === 0;
}