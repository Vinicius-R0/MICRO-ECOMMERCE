function newBook(book) {

  const div = document.createElement('div');
  div.className = 'column is-4';

  div.innerHTML = `
  <div class="card is-shady">

    <div class="card-image">
      <figure class="image is-4by3">
        <img 
          src="${book.photo}"
          alt="${book.name}" 
          class="modal-button"
        />
      </figure>
    </div>

    <div class="card-content">
      <div class="content book" data-id="${book.id}">
        <div class="book-meta">
          <p class="is-size-4">${book.price.toFixed(2)}</p>
          <p class="is-size-6">Disponivel em estoque: 5</p>
          h4 class="is-size-3 title">${book.name}</h4>
          <p class="subtitle">Autor: ${book.author}</p>
        </div>
        
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Digite o CEP">
          </div>

        <div class="control">
          <a class="button button-shipping is-info" data-id="${book.id}"> Calcular Frete</a>
        </div>
      </div>

        <button class="button burron-buy is-seccess is-fullwidth"> Comprar </button> 
     </div>
   </div>
 </div>
`;

return div;
}

function calculateShipping(id, cep) {
  fetch('http://localhost:3000/shipping' + cep )
  .then((data) => {
    if(data.ok) {
      return data.json();
    }
    throw data.statusText;
  })
  .then((data) => {
    swal('Frete', `O valor do frete é R$ ${data.value.toFixed(2)}`, 'success');
  })
  .catch((err) => {
    swal('Frete', 'Ocorreu um erro ao calcular o frete', 'error');
    console.error(err);
  });
}