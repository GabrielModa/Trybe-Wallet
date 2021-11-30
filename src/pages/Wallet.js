import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';
import { getCurrencies } from '../services/RequestAPI';
import Table from './componets/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayOfCurrencies: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.onSubmitWallet = this.onSubmitWallet.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.totalValue = this.totalValue.bind(this);
    this.getCoin = this.getCoin.bind(this);
  }

  componentDidMount() {
    this.getCoin();
  }

  onInputChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value });
  }

  onSubmitWallet(e) {
    const { dispatchCurries } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    e.preventDefault();
    fetchCurrency();
    dispatchCurries({
      value,
      description,
      currency,
      method,
      tag,
    });
    this.setState({
      value: '',
      description: '',
    });
  }

  async getCoin() {
    const ObjCurrencies = await getCurrencies();
    const arrayOfCurrencies = Object.keys(ObjCurrencies);
    this.setState({
      arrayOfCurrencies,
    });
    console.log(arrayOfCurrencies);
  }

  totalValue() {
    const { expenses } = this.props;
    console.log(expenses);
    let sum = 0;
    expenses.map((expense) => {
      sum += Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask);
      return sum;
    });
    return sum.toFixed(2);
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label
        htmlFor="value-input"
      >
        Valor:
        <input
          value={ value }
          onChange={ this.onInputChange }
          name="value"
          id="value-input"
          data-testid="value-input"
          label="Valor da despesa:"
        />

      </label>
    );
  }

  renderDescription() {
    const { description } = this.state;

    return (

      <label htmlFor="description-input">
        <input
          value={ description }
          onChange={ this.onInputChange }
          name="description"
          id="description-input"
          data-testid="description-input"
          label="Descrição da despesa:"
        />
      </label>
    );
  }

  renderSelect() {
    return (
      <label htmlFor="tag-input">
        <select
          onChange={ this.onInputChange }
          name="tag"
          id="tag-input"
          data-testid="tag-input"
        >
          Tag
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { email } = this.props;
    const { arrayOfCurrencies } = this.state;
    return (
      <>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <h2 data-testid="total-field">{ this.totalValue() }</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>
        <form onSubmit={ this.onSubmitWallet }>
          {this.renderValue()}
          {this.renderDescription()}
          <label htmlFor="currency-input">
            Moeda:
            <select
              onChange={ this.onInputChange }
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              label="Moeda da despesa:"
            >
              {arrayOfCurrencies.map((currencies, index) => (
                <option key={ index }>{currencies}</option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              onChange={ this.onInputChange }
              name="method"
              id="method-input"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          {this.renderSelect()}
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatchCurries: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurries: (payload) => dispatch(fetchCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
