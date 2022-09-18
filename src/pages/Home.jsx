import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addProducts, getTotalItems } from '../services/handleCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ButtonCart from '../components/ButtonCart';

export default class Home extends Component {
  state = {
    products: [],
    categories: [],
    category: '',
    searchProduct: '',
    totalItems: '',
  };

  componentDidMount() {
    this.categorieList();
    this.setState({
      totalItems: getTotalItems(),
    });
  }

  categorieList = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleClickBtnSearch);
  };

  handleClickBtnSearch = async () => {
    const { category, searchProduct, categories } = this.state;
    const categoryId = categories.filter((categoria) => categoria.name === category)
      .map((categoria) => categoria.id);
    const products = await getProductsFromCategoryAndQuery(categoryId, searchProduct);
    this.setState({
      products: products.results,
    });
  };

  saveTotalItems = () => {
    this.setState({
      totalItems: getTotalItems(),
    });
  };

  render() {
    const { categories, searchProduct, products, totalItems } = this.state;
    return (
      <>
        <ButtonCart totalItems={ totalItems } />
        <div className="row container mx-auto">
          <section
            // eslint-disable-next-line max-len
            className="categories container-fluid col-2 border rounded align-self-start py-2"
          >
            <div className="row">
              {categories.map(({ id, name }) => (
                <label htmlFor={ name } key={ id } data-testid="category">
                  <input
                    type="radio"
                    name="category"
                    value={ name }
                    id={ name }
                    onChange={ this.handleChange }
                  />
                  {name}
                  <br />
                </label>
              ))}
            </div>
          </section>
          <section className="container col-9 mx-1">
            <div className="row container-fluid justify-content-between">
              <label className="col-12 col-md-8 row" htmlFor="searchProduct">
                {// eslint-disable-next-line react/jsx-max-depth
                  <input
                    type="text"
                    data-testid="query-input"
                    onChange={ this.handleChange }
                    value={ searchProduct }
                    name="searchProduct"
                    placeholder="digite o nome do produto"
                  />
                }
              </label>
              <button
                className="col-12 col-md-4"
                type="button"
                data-testid="query-button"
                onClick={ this.handleClickBtnSearch }
              >
                Pesquisar
              </button>
            </div>
            <h1 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>
            <div className="row justify-content-center">
              {
                products.map((produto) => (
                  <div
                    data-testid="product"
                    className="container-fluid col-12 col-md-5 m-4 p-4 product border"
                    key={ produto.id }
                  >
                    <Link
                      className="row item-link"
                      to={ `product/${produto.id}` }
                      data-testid="product-detail-link"
                    >
                      <div data-testid="col product">
                        <img
                          src={ produto.thumbnail }
                          alt={ produto.title }
                          className="product-image"
                        />
                        <h3>
                          R$
                          {produto.price}
                        </h3>
                        <p>{produto.title}</p>
                        {
                          produto.shipping.free_shipping && (
                            <p
                              className="free-shipping"
                              data-testid="free-shipping"
                            >
                              Frete Grátis
                            </p>
                          )
                        }
                      </div>
                    </Link>
                    <button
                      className="fixedButton btn btn-primary m-1"
                      type="button"
                      data-testid="product-add-to-cart"
                      onClick={ () => {
                        addProducts(produto);
                        this.saveTotalItems();
                      } }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))
              }
            </div>
            {
              !products[0] && (<h2>Nenhum produto foi encontrado</h2>)
            }
          </section>
        </div>
      </>
    );
  }
}
