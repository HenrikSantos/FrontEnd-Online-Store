import React from 'react';
import PropTypes from 'prop-types';
import { getProducts, changeQuantity, removeProduct } from '../services/handleCart';
import ButtonCart from '../components/ButtonCart';

const NUMERO_NEGATIVO = -1;
const NUMERO_POSITIVO = 1;
class ShoppingCart extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({
      products: getProducts(),
    });
  }

  updateQuantity = (product, value) => {
    changeQuantity(product, value);
    this.setState({
      products: getProducts(),
    });
  };

  handleRemoveProduct = (product) => {
    removeProduct(product);
    this.setState({
      products: getProducts(),
    });
  };

  render() {
    const { products } = this.state;
    const { history } = this.props;
    return (
      <>
        <ButtonCart />
        <div className="container mx-auto">
          {
            products[0] ? (
              <>
                {products.map((product) => (
                  <div
                    key={ product.id }
                    className="row align-items-center justify-content-between"
                  >
                    <img
                      className="col-1"
                      src={ product.thumbnail }
                      alt={ product.title }
                    />
                    <p
                      className="col-3"
                      data-testid="shopping-cart-product-name"
                    >
                      {product.title}
                    </p>
                    <div
                      // eslint-disable-next-line max-len
                      className="col-3 row text-center align-items-center justify-content-center"
                    >
                      <p className="col-12">Quant:</p>
                      <button
                        className="col-4 btn-quant"
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => this.updateQuantity(product, NUMERO_NEGATIVO) }
                      >
                        {'<'}
                      </button>
                      <p
                        className="col-4"
                        data-testid="shopping-cart-product-quantity"
                      >
                        { product.quantity }
                      </p>
                      <button
                        type="button"
                        className="col-4 btn-quant"
                        data-testid="product-increase-quantity"
                        onClick={ () => this.updateQuantity(product, NUMERO_POSITIVO) }
                      >
                        {'>'}
                      </button>
                      <button
                        className="col-12 btn-rmv"
                        type="button"
                        data-testid="remove-product"
                        onClick={ () => this.handleRemoveProduct(product) }
                      >
                        Remover Item
                      </button>
                    </div>
                    <p className="col-1">
                      R$
                      {product.price}
                    </p>
                  </div>
                ))}
                <button
                  data-testid="checkout-products"
                  type="button"
                  className="col-12 btn btn-primary"
                  onClick={ () => { history.push('/checkout'); } }
                >
                  Checkout
                </button>
              </>
            ) : (
              <h1 data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </h1>
            )
          }
        </div>
      </>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ShoppingCart;
