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

    li.appendChild(spanNome);
    li.appendChild(spanEmail);
    li.appendChild(botaoExcluir);

    listaDeClientes.appendChild(li);
}