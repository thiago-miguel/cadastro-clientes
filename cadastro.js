import { adicionarClienteNaLista } from './ui.js';

const listaDeClientes = document.getElementById('lista-clientes');
const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');

//Incluir cliente na lista
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = inputNome.value;
    const email = inputEmail.value;

    const novoCliente = {
        nome: nome,
        email: email
    };

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
        adicionarClienteNaLista(clienteCadastrado, listaDeClientes);
        formCadastro.reset();
    })

    .catch(error => console.error('Erro ao cadastrar cliente:', error));

});

//GET
fetch('https://crudcrud.com/api/d0c9f1e6f26b414597a96ceaf50573ea/cadastro')
.then(response => response.json())
.then((listaClientes) => {
    console.log(listaClientes);
    listaClientes.forEach((cliente) => {
        adicionarClienteNaLista(cliente, listaDeClientes);
    });
})
.catch(error => console.error('Erro ao buscar clientes:', error));


// Configuração do botão de excluir
// Criação de botão de excluir todos ; Botão só aparece quando tem pelo menos um cliente na lista
// Testar inserir cliente via Postman e ver aparecer no Live Server
// Criar CSS
// Criar verificações via console.log
// Criar funcionalidade de listar clientes => eles não aparecem ao recarregar a página
// Criar botão de ocultar lista de clientes
// Estudar a possibilidade de ter a funcionalidade de editar cliente