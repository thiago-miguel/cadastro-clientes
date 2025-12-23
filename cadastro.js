import { adicionarClienteNaLista } from './ui.js';
import { inicializarToggleClientes } from './ui.js';

const btnToggle = document.getElementById('btn-toggle-clientes');
const listaDeClientes = document.getElementById('lista-clientes');
const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const msgSemClientes = document.getElementById('msg-sem-clientes');

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
    fetch('https://crudcrud.com/api/d0c9f1e6f26b414597a96ceaf50573ea/cadastro', {
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
        formCadastro.reset();
    })

    .catch(error => console.error('Erro ao cadastrar cliente (possivelmente limite da API CrudCrud excedido):', error));

});

//GET
console.log('Carregando clientes da API...');
fetch('https://crudcrud.com/api/d0c9f1e6f26b414597a96ceaf50573ea/cadastro')
.then(response => response.json())
.then((listaClientes) => {
    console.log('Clientes carregados:', listaClientes);
    listaClientes.forEach((cliente) => {
        adicionarClienteNaLista(cliente, listaDeClientes, msgSemClientes);
    });
})
.catch(error => console.error('Erro ao buscar clientes (possivelmente limite da API CrudCrud excedido):', error));


// Criação de botão de excluir todos ; Botão só aparece quando tem pelo menos um cliente na lista
// Testar inserir cliente via Postman e ver aparecer no Live Server
// Criar CSS
// Criar verificações via console.log
// Estudar a possibilidade de ter a funcionalidade de editar cliente