import React from 'react';
import PropTypes from 'prop-types';
import { addFeedback, getFeedbacks } from '../services/feedback';

class Forms extends React.Component {
  state = {
    rating: '',
    email: '',
    evaluation: '',
    isBtnDisable: true,
    feedbacks: [],
  };

  componentDidMount() {
    const { productId } = this.props;
    if (!getFeedbacks(productId)) {
      localStorage.setItem(productId, JSON.stringify([]));
    }
    const allFeedbacks = getFeedbacks(productId);
    this.setState({ feedbacks: allFeedbacks });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.verifyFuction);
  };

  verifyFuction = () => {
    const { email, rating } = this.state;
    const validateEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    if (validateEmail && rating) {
      this.setState({ isBtnDisable: false });
    } else {
      this.setState({ isBtnDisable: true });
    }
  };

  saveRating = () => {
    const { email, rating, evaluation } = this.state;
    const emaiL = email;
    const ratinG = rating;
    const evaluatioN = evaluation;
    const rate = {
      email: emaiL,
      rating: ratinG,
      text: evaluatioN,
    };
    const { productId } = this.props;
    addFeedback(rate, productId);
    const allFeedbacks = getFeedbacks(productId);
    this.setState({
      rating: '',
      email: '',
      evaluation: '',
      feedbacks: allFeedbacks,
    });
  };

  render() {
    const options = ['1', '2', '3', '4', '5'];
    const { email, evaluation, isBtnDisable, feedbacks } = this.state;
    return (
      <div className="feedback">
        <form>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="product-detail-email"
              placeholder="Email"
              required
            />
          </label>
          <fieldset>
            {
              options.map((index) => (
                <label htmlFor={ `${index}-rating` } key={ index }>
                  {index}
                  <input
                    type="radio"
                    data-testid={ `${index}-rating` }
                    id={ `${index}-rating` }
                    value={ index }
                    name="rating"
                    onChange={ this.handleChange }
                    required
                  />
                </label>
              ))
            }
          </fieldset>
          <textarea
            name="evaluation"
            value={ evaluation }
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
            placeholder="Deixe sua avaliação!"
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            disabled={ isBtnDisable }
            onClick={ this.saveRating }
          >
            Avaliar
          </button>
          { isBtnDisable && <span data-testid="error-msg">Campos inválidos</span>}
        </form>
        {
          feedbacks.map((feedback, index) => (
            <div key={ index }>
              <h3 data-testid="review-card-email">{ feedback.email }</h3>
              <h3 data-testid="review-card-rating">{ feedback.rating }</h3>
              <h3 data-testid="review-card-evaluation">{ feedback.text }</h3>
            </div>
          ))
        }
      </div>

    );
  }
}

export default Forms;

Forms.propTypes = {
  productId: PropTypes.string,
}.isRequired;
