const PRODUCT_KEY = 'product';
const NEGATIVO = -1;

export const SaveinLocalStorage = (produtos) => {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(produtos));
};

export const getProducts = () => JSON.parse(localStorage.getItem(PRODUCT_KEY));

if (!getProducts()) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([]));
}

export const addProducts = (produto) => {
  const currentItems = getProducts();
  const index = currentItems.map((element) => element.id).indexOf(produto.id);
  if (index !== NEGATIVO) {
    currentItems[index].quantity += 1;
    SaveinLocalStorage(currentItems);
  } else {
    produto.quantity = 1;
    SaveinLocalStorage([...currentItems, produto]);
  }
};

export const removeProduct = (produto) => {
  const currentItems = getProducts();
  const removeItems = currentItems.filter((element) => element.id !== produto.id);
  SaveinLocalStorage(removeItems);
};

export const getTotalItems = () => {
  const currentItems = getProducts();
  if (currentItems) {
    return currentItems.map((product) => product.quantity)
      .reduce((acc, product) => Number(acc) + Number(product), 0);
  }
};

export const changeQuantity = (produto, value) => {
  const currentProducts = getProducts();
  const index = currentProducts.map((element) => element.id).indexOf(produto.id);
  currentProducts[index].quantity = Number(currentProducts[index].quantity) + value;
  if (currentProducts[index].quantity === 0) currentProducts[index].quantity = 1;
  if (currentProducts[index].quantity >= currentProducts[index].available_quantity) {
    currentProducts[index].quantity = currentProducts[index].available_quantity;
  }
  SaveinLocalStorage(currentProducts);
};
