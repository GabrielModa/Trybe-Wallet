import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: [],
    };
  }

  render() {
    const { email } = this.props;

    return (
      <>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <h2 data-testid="total-field">0</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>

        <form>
          <fieldset>
            <input
              data-testid="value-input"
              label="Valor da despesa:"
            />
            <input
              data-testid="description-input"
              label="Descrição da despesa:"
            />
            <input
              data-testid="currency-input"
              label="Moeda da despesa:"
            />

            <select data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="creditCard">Cartão de crédito</option>
              <option value="debitCard">Cartão de débito</option>
            </select>

            <select data-testid="tag-input">
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>

              <button type="submit">Adicionar despesa</button>
            </select>
          </fieldset>
        </form>
      </>

    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps)(Wallet);
