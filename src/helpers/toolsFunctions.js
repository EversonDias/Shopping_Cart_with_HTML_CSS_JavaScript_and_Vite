import { saveCartID, getSavedCartIDs } from './cartFunctions';
import { fetchProduct } from './fetchFunctions';
import { createCartProductElement } from './shopFunctions';

const tools = {
  addTotalPrice: (data, type) => {
    const totalPrice = document.querySelector('.total-price');
    const currentPrice = Number(totalPrice.innerHTML);
    const newCurrentPrice = type === 'add' ? currentPrice + data : currentPrice - data;
    totalPrice.innerHTML = newCurrentPrice;
  },
  createObject: (data, key) => (
    {
      [key[0]]: data[key[0]],
      [key[1]]: data[key[1]],
      [key[2]]: data[key[2]],
      [key[3]]: data[key[3]],
    }
  ),
  addCart: async (item) => {
    const itemId = item.path[1].firstChild.innerHTML;
    saveCartID(itemId);
    fetchProduct(itemId)
      .then((data) => {
        tools.addTotalPrice(data.price, 'add');
        document.querySelector('.cart__products')
          .appendChild(
            createCartProductElement(
              tools.createObject(data, ['id', 'title', 'price', 'pictures']),
            ),
          );
      });
  },
  getSavedAndCreate: () => {
    const saveCard = getSavedCartIDs();
    const CartProducts = document.querySelector('.cart__products');
    saveCard.forEach((item) => {
      fetchProduct(item)
        .then((data) => {
          tools.addTotalPrice(data.price, 'add');
          CartProducts.appendChild(
            createCartProductElement(
              tools.createObject(data, ['id', 'title', 'price', 'pictures']),
            ),
          );
        });
    });
  },
};

export default tools;
