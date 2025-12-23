import { adicionarClienteNaLista } from './ui.js';
import { inicializarToggleClientes } from './ui.js';
import { atualizarEstadoBotaoExcluirTodos } from './ui.js';
import { atualizarUI } from './ui.js';


const btnToggle = document.getElementById('btn-toggle-clientes');
const listaDeClientes = document.getElementById('lista-clientes');
const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const msgSemClientes = document.getElementById('msg-sem-clientes');
const btnExcluirTodos = document.getElementById('excluir-todos');

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
    fetch('https://crudcrud.com/api/86a3419b74d54ac788a22363ddd2392f/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCliente)
    })
    .then((response) => response.json())
    .then((clienteCadastrado) => {
        console.log('Cliente cadastrado com sucesso:', clienteCadastrado);
        adicionarClienteNaLista(clienteCadastrado, listaDeClientes, msgSemClientes);
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
fetch('https://crudcrud.com/api/86a3419b74d54ac788a22363ddd2392f/cadastro')
.then(response => response.json())
.then((clientes) => {
    console.log('Clientes carregados:', clientes);
    listaClientes = clientes;
    clientes.forEach((cliente) => {
        adicionarClienteNaLista(cliente, listaDeClientes, msgSemClientes);
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
            `https://crudcrud.com/api/86a3419b74d54ac788a22363ddd2392f/cadastro/${cliente._id}`,
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


// Testar inserir cliente via Postman e ver aparecer no Live Server
// Criar CSS
// Estudar a possibilidade de ter a funcionalidade de editar cliente