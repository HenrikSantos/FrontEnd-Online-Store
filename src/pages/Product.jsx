import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Forms from '../components/Forms';
import { addProducts, getTotalItems } from '../services/handleCart';
import ButtonCart from '../components/ButtonCart';

import { getProductById } from '../services/api';

export default class Product extends Component {
  state = {
    productData: [],
    totalItems: '',
  };

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const objProductData = await getProductById(id);
    this.setState({
      productData: objProductData,
      totalItems: getTotalItems(),
      shipping: objProductData.shipping.free_shipping,
    });
  };

  saveTotalItems = () => {
    this.setState({
      totalItems: getTotalItems(),
    });
  };

  render() {
    const { productData, totalItems, shipping } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div className="product-detail">
        <ButtonCart totalItems={ totalItems } />
        <div>
          <div>
            <h1 data-testid="product-detail-name">{productData.title}</h1>
            <img
              data-testid="product-detail-image"
              src={ productData.thumbnail }
              alt={ productData.tittle }
            />
            <p data-testid="product-detail-price">{productData.price}</p>
            {
              shipping && (
                <p data-testid="free-shipping">Frete Grátis</p>
              )
            }
          </div>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            addProducts(productData);
            this.saveTotalItems();
          } }
        >
          Adicionar ao Carrinho
        </button>
        <Forms productId={ id } />
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
