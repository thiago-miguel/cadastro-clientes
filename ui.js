let clientesVisiveis = false;

export function adicionarClienteNaLista(cliente, lista, mensagemVazia, onExcluir, onEditar) {
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

  const botaoEditar = document.createElement("button");
  botaoEditar.classList.add("btn-editar");
  botaoEditar.textContent = "Editar";

  botaoExcluir.addEventListener("click", () => {
    onExcluir(cliente._id, li, lista, mensagemVazia);
  });

  botaoEditar.addEventListener("click", () => {
    onEditar(cliente._id, li, lista, mensagemVazia);
  });

  li.append(spanNome, spanEmail, botaoExcluir, botaoEditar);
  lista.appendChild(li);

  atualizarUI(lista, mensagemVazia);
}

//DELETE (apenas UI)
export function excluirCliente(li, lista, mensagemVazia) {
  li.remove();
  atualizarUI(lista, mensagemVazia);
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