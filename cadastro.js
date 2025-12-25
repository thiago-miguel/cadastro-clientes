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
        adicionarClienteNaLista(clienteCadastrado, listaDeClientes, msgSemClientes, handleExcluirCliente);
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
        adicionarClienteNaLista(cliente, listaDeClientes, msgSemClientes, handleExcluirCliente);
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