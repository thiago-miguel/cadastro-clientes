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

  li.append(spanNome, spanEmail, botaoExcluir, botaoEditar);

  // Listener para excluir
  botaoExcluir.addEventListener('click', () => onExcluir(cliente._id, li, lista, mensagemVazia));

  // Configura o botão editar com lógica de UI
  const onSalvar = onEditar(cliente._id, li); // onEditar é handleEditarCliente, retorna salvarCallback
  configurarBotaoEditar(botaoEditar, li, spanNome, spanEmail, onSalvar);

  lista.appendChild(li);

  atualizarUI(lista, mensagemVazia);
}

// Configura o botão editar com toggle de UI
function configurarBotaoEditar(botaoEditar, li, spanNome, spanEmail, onSalvar) {
  // Verifica se já existe botão Cancelar, senão cria
  let botaoCancelar = li.querySelector('.btn-cancelar');
  if (!botaoCancelar) {
    botaoCancelar = document.createElement('button');
    botaoCancelar.textContent = 'Cancelar';
    botaoCancelar.classList.add('btn-cancelar');
    botaoCancelar.style.display = 'none';
    li.appendChild(botaoCancelar);
  }

  // Função para alternar edição
  const toggleEdicao = () => {
    const emEdicao = botaoEditar.dataset.emEdicao === 'true';

    if (!emEdicao) {
      // ENTRAR EM MODO EDIÇÃO
      botaoEditar.dataset.emEdicao = 'true';

      const nomeOriginal = spanNome.textContent;
      const emailOriginal = spanEmail.textContent;

      const inputNome = document.createElement('input');
      inputNome.value = nomeOriginal;
      inputNome.classList.add('cliente-nome-input');

      const inputEmail = document.createElement('input');
      inputEmail.value = emailOriginal;
      inputEmail.classList.add('cliente-email-input');

      spanNome.replaceWith(inputNome);
      spanEmail.replaceWith(inputEmail);

      botaoEditar.textContent = 'Salvar';
      botaoEditar.classList.add('btn-salvar');
      botaoCancelar.style.display = 'inline-block';
    } else {
      // SALVAR: chama callback
      const inputNome = li.querySelector('.cliente-nome-input');
      const inputEmail = li.querySelector('.cliente-email-input');

      const novoNome = inputNome.value.trim();
      const novoEmail = inputEmail.value.trim();

      if (novoNome && novoEmail) {
        onSalvar(novoNome, novoEmail, () => {
          // Callback de sucesso: atualizar UI
          spanNome.textContent = novoNome;
          spanEmail.textContent = novoEmail;
          inputNome.replaceWith(spanNome);
          inputEmail.replaceWith(spanEmail);
          botaoEditar.textContent = 'Editar';
          botaoEditar.classList.remove('btn-salvar');
          botaoCancelar.style.display = 'none';
          botaoEditar.dataset.emEdicao = 'false';
        });
      }
    }
  };

  // Listener único para o botão Editar
  if (!botaoEditar.hasListener) {
    botaoEditar.addEventListener('click', toggleEdicao);
    botaoEditar.hasListener = true;
  }

  // Listener para Cancelar (único)
  if (!botaoCancelar.hasListener) {
    botaoCancelar.addEventListener('click', () => {
      const inputNome = li.querySelector('.cliente-nome-input');
      const inputEmail = li.querySelector('.cliente-email-input');

      inputNome.replaceWith(spanNome);
      inputEmail.replaceWith(spanEmail);

      botaoEditar.textContent = 'Editar';
      botaoEditar.classList.remove('btn-salvar');
      botaoCancelar.style.display = 'none';
      botaoEditar.dataset.emEdicao = 'false';
    });
    botaoCancelar.hasListener = true;
  }

  // Retorna a função toggle para chamada externa
  return toggleEdicao;
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