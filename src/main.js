import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import tools from './helpers/toolsFunctions';
import loading from './module/loading';
import popUp from './module/popUp';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

loading.open();

try {
  const fullProductList = await fetchProductsList('computador');
  tools.getSavedAndCreate();
  fullProductList.forEach((data) => {
    const products = document.querySelector('.products');
    products.appendChild(
      createProductElement(
        tools.createObject(data, ['id', 'title', 'price', 'thumbnail']),
      ),
    );
  });
} catch (error) {
  loading.close();
  popUp('Algum erro ocorreu, recarregue a página e tente novamente');
}

loading.close();

const btnAddCart = document.getElementsByClassName('product__add');
for (let index = 0; index < btnAddCart.length; index += 1) {
  btnAddCart[index].addEventListener('click', tools.addCart);
}
