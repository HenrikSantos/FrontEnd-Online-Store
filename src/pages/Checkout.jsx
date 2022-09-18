import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProducts, SaveinLocalStorage } from '../services/handleCart';
import ButtonCart from '../components/ButtonCart';

export default class Checkout extends Component {
  state = {
    products: [],
    name: '',
    cpf: '',
    email: '',
    cep: '',
    phone: '',
    address: '',
    payment: '',
    isBtnDisabled: true,
  };

  componentDidMount() {
    this.setState({
      products: getProducts(),
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.verifyFuction);
  };

  verifyFuction = () => {
    const { name, cpf, email, cep, phone, address, payment } = this.state;
    const validateEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    if (name && cpf && validateEmail && cep && phone && address && payment) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  purchase = () => {
    SaveinLocalStorage([]);
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const {
      products, name, cpf, email, cep, phone, address, isBtnDisabled,
    } = this.state;
    return (
      <>
        <ButtonCart />
        <div className="container">
          {
            products.map((product) => (
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
                  data-testid="shopping-cart-product-name"
                  className="col-3"
                >
                  {product.title}
                </p>
                <p
                  className="col-2"
                  data-testid="shopping-cart-product-quantity"
                >
                  {`Quant: ${product.quantity}`}
                </p>
                <p className="col-1">
                  R$
                  {product.price}
                </p>
                <hr className="my-3" />
              </div>
            ))
          }
          <form className="border p-3 rounded my-4">
            <label htmlFor="name">
              Nome Completo:
              <input
                value={ name }
                onChange={ this.handleChange }
                required
                type="text"
                name="name"
                id="name"
                data-testid="checkout-fullname"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                value={ email }
                onChange={ this.handleChange }
                required
                type="email"
                name="email"
                id="email"
                data-testid="checkout-email"
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              <input
                value={ cpf }
                onChange={ this.handleChange }
                required
                type="text"
                name="cpf"
                id="cpf"
                data-testid="checkout-cpf"
              />
            </label>
            <label htmlFor="phone">
              Telefone:
              <input
                value={ phone }
                onChange={ this.handleChange }
                required
                type="tel"
                name="phone"
                id="phone"
                data-testid="checkout-phone"
              />
            </label>
            <label htmlFor="cep">
              CEP:
              <input
                value={ cep }
                onChange={ this.handleChange }
                required
                type="text"
                name="cep"
                id="cep"
                data-testid="checkout-cep"
              />
            </label>
            <label htmlFor="address">
              Endereço:
              <input
                value={ address }
                onChange={ this.handleChange }
                required
                type="text"
                name="address"
                id="address"
                data-testid="checkout-address"
              />
            </label>
            <p className="payment-text">Método de Pagamento:</p>
            <label className="ticket" htmlFor="ticket">
              <input
                onChange={ this.handleChange }
                required
                type="radio"
                name="payment"
                id="ticket"
                data-testid="ticket-payment"
                value="ticket"
              />
              Boleto
            </label>
            <label className="ticket" htmlFor="visa">
              <input
                onChange={ this.handleChange }
                required
                type="radio"
                name="payment"
                id="visa"
                data-testid="visa-payment"
                value="visa"
              />
              Visa
            </label>
            <label className="ticket" htmlFor="master">
              <input
                onChange={ this.handleChange }
                required
                type="radio"
                name="payment"
                id="master"
                data-testid="master-payment"
                value="master"
              />
              Master
            </label>
            <label className="ticket" htmlFor="elo">
              <input
                onChange={ this.handleChange }
                required
                type="radio"
                name="payment"
                id="elo"
                data-testid="elo-payment"
                value="elo"
              />
              Elo
            </label>
            <button
              type="button"
              data-testid="checkout-btn"
              disabled={ isBtnDisabled }
              onClick={ this.purchase }
              className="btn btn-primary btn-comprar"
            >
              COMPRAR
            </button>
            { isBtnDisabled && (
              <p data-testid="error-msg" className="invalid">Campos inválidos</p>)}
          </form>
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
