import { adicionarClienteNaLista } from './ui.js';
import { inicializarToggleClientes } from './ui.js';
import { atualizarEstadoBotaoExcluirTodos } from './ui.js';
import { atualizarUI } from './ui.js';
import { excluirCliente } from './ui.js';


const btnToggle = document.getElementById('btn-toggle-clientes');
const listaDeClientes = document.getElementById('lista-clientes');
const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const msgSemClientes = document.getElementById('msg-sem-clientes');
const btnExcluirTodos = document.getElementById('excluir-todos');

// DELETE
function handleExcluirCliente(id, li, lista, mensagemVazia) {
  fetch(
    `https://crudcrud.com/api/5cd5f13f6e654dccba31c19b9ee894ee/cadastro/${id}`,
    {
      method: "DELETE",
    }
  )
    .then(() => {
      // Remove do array
      listaClientes = listaClientes.filter(cliente => cliente._id !== id);
      // Remove da UI
      excluirCliente(li, lista, mensagemVazia);
      // Atualiza botão
      atualizarEstadoBotaoExcluirTodos(btnExcluirTodos, lista);
    })
    .catch((error) => console.error("Erro ao excluir cliente:", error));
}

// EDIT
function handleEditarCliente(id, li, lista, mensagemVazia) {
  const spanNome = li.querySelector('.cliente-nome');
  const spanEmail = li.querySelector('.cliente-email');
  const botaoEditar = li.querySelector('.btn-editar');

  // Salva valores originais
  const nomeOriginal = spanNome.textContent;
  const emailOriginal = spanEmail.textContent;

  // Cria inputs
  const inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.value = nomeOriginal;
  inputNome.classList.add('cliente-nome-input');

  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.value = emailOriginal;
  inputEmail.classList.add('cliente-email-input');

  // Substitui spans por inputs
  spanNome.replaceWith(inputNome);
  spanEmail.replaceWith(inputEmail);

  // Muda botão para "Salvar"
  botaoEditar.textContent = 'Salvar';
  botaoEditar.classList.add('btn-salvar');

  // Cria botão "Cancelar"
  const botaoCancelar = document.createElement('button');
  botaoCancelar.textContent = 'Cancelar';
  botaoCancelar.classList.add('btn-cancelar');
  botaoCancelar.addEventListener('click', () => {
    // Volta para spans
    inputNome.replaceWith(spanNome);
    inputEmail.replaceWith(spanEmail);
    botaoEditar.textContent = 'Editar';
    botaoEditar.classList.remove('btn-salvar');
    botaoCancelar.remove();
  });

  // Adiciona botão Cancelar
  li.appendChild(botaoCancelar);

  // Função para salvar
  const salvar = () => {
    const novoNome = inputNome.value.trim();
    const novoEmail = inputEmail.value.trim();

    if (novoNome && novoEmail) {
      fetch(
        `https://crudcrud.com/api/5cd5f13f6e654dccba31c19b9ee894ee/cadastro/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nome: novoNome, email: novoEmail })
        }
      )
        .then(() => {
          // Atualiza array
          const clienteIndex = listaClientes.findIndex(cliente => cliente._id === id);
          if (clienteIndex !== -1) {
            listaClientes[clienteIndex].nome = novoNome;
            listaClientes[clienteIndex].email = novoEmail;
          }
          // Atualiza UI
          spanNome.textContent = novoNome;
          spanEmail.textContent = novoEmail;
          inputNome.replaceWith(spanNome);
          inputEmail.replaceWith(spanEmail);
          botaoEditar.textContent = 'Editar';
          botaoEditar.classList.remove('btn-salvar');
          botaoCancelar.remove();
        })
        .catch((error) => console.error("Erro ao editar cliente:", error));
    }
  };

  // Event listener para salvar (once para evitar múltiplos)
  botaoEditar.addEventListener('click', salvar, { once: true });
}

inicializarToggleClientes(
    btnToggle,
    listaDeClientes,
    msgSemClientes
);

//Incluir cliente na lista
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = inputNome.value;
    const email = inputEmail.value;

    const novoCliente = {
        nome: nome,
        email: email
    };

    console.log('Tentando cadastrar cliente:', novoCliente);

    //POST
    fetch('https://crudcrud.com/api/5cd5f13f6e654dccba31c19b9ee894ee/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCliente)
    })
    .then((response) => response.json())
    .then((clienteCadastrado) => {
        console.log('Cliente cadastrado com sucesso:', clienteCadastrado);
        adicionarClienteNaLista(clienteCadastrado, listaDeClientes, msgSemClientes, handleExcluirCliente, handleEditarCliente);
        listaClientes.push(clienteCadastrado);
        atualizarEstadoBotaoExcluirTodos(btnExcluirTodos, listaDeClientes);
        formCadastro.reset();
        inputNome.focus();
    })

    .catch(error => console.error('Erro ao cadastrar cliente (possivelmente limite da API CrudCrud excedido):', error));

});

//GET
let listaClientes = [];
console.log('Carregando clientes da API...');
fetch('https://crudcrud.com/api/5cd5f13f6e654dccba31c19b9ee894ee/cadastro')
.then(response => response.json())
.then((clientes) => {
    console.log('Clientes carregados:', clientes);
    listaClientes = clientes;
    clientes.forEach((cliente) => {
        adicionarClienteNaLista(cliente, listaDeClientes, msgSemClientes, handleExcluirCliente, handleEditarCliente);
    });
    atualizarEstadoBotaoExcluirTodos(btnExcluirTodos, listaDeClientes);
})
.catch(error => console.error('Erro ao buscar clientes (possivelmente limite da API CrudCrud excedido):', error));

// Botão Excluir Todos
btnExcluirTodos.addEventListener('click', () => {
    excluirTodosClientes();
});

function excluirTodosClientes() {
    const deletions = listaClientes.map(cliente =>
        fetch(
            `https://crudcrud.com/api/5cd5f13f6e654dccba31c19b9ee894ee/cadastro/${cliente._id}`,
            { method: 'DELETE' }
        )
    );

    Promise.all(deletions)
        .then(() => {
            listaClientes = [];
            listaDeClientes.innerHTML = '';

            atualizarUI(listaDeClientes, msgSemClientes);
            atualizarEstadoBotaoExcluirTodos(btnExcluirTodos, listaDeClientes);
        })
        .catch(err => console.error('Erro ao excluir todos:', err));
}

// Criar CSS
// Estudar a possibilidade de ter a funcionalidade de editar cliente