import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonCart extends Component {
  render() {
    const { totalItems } = this.props;
    return (
      <header className="container-fluid text-light bg-dark mb-3 sticky-top p-1">
        <div className="container">
          <div className="row text-end align-items-center">
            <Link to="/" className="col-2 home-link">TrybeStore</Link>
            <div className="col">
              <Link
                className="header-link"
                to="/shopping-cart"
                data-testid="shopping-cart-button"
              >
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <p className="d-none">Carrinho de compras</p>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <img
                  src="./cart.svg"
                  className="logo"
                  alt="cart logo"
                />
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <p
                  className="qtd-text"
                  data-testid="shopping-cart-size"
                >
                  {totalItems}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

ButtonCart.propTypes = {
  totalItems: PropTypes.string,
}.isRequired;
