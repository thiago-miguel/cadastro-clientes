export function adicionarClienteNaLista(cliente, listaDeClientes) {
    const li = document.createElement('li');
    li.classList.add('cliente');

    const spanNome = document.createElement('span');
    spanNome.classList.add('cliente-nome');
    spanNome.textContent = cliente.nome;

    const spanEmail = document.createElement('span');
    spanEmail.classList.add('cliente-email');
    spanEmail.textContent = cliente.email;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('btn-excluir');
    botaoExcluir.textContent = 'Excluir';

    botaoExcluir.addEventListener('click', () => {
        excluirCliente(cliente._id, li);
    });

    li.appendChild(spanNome);
    li.appendChild(spanEmail);
    li.appendChild(botaoExcluir);

    listaDeClientes.appendChild(li);
}

//DELETE
function excluirCliente(id, li) {
    fetch(`https://crudcrud.com/api/d0c9f1e6f26b414597a96ceaf50573ea/cadastro/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        li.remove();
    })
    .catch(error => console.error('Erro ao excluir cliente:', error));
}