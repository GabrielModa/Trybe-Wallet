import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actionLogin from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const { history, dispatchUserLogin } = this.props;
    const { email } = this.state;

    dispatchUserLogin(email);
    history.push('/carteira');
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value }, () => this.checkValidation());
  }

  checkValidation() {
    const { email, password } = this.state;

    const MIN_CHARACTER = 6;
    if (password.length >= MIN_CHARACTER && email.includes('@')
     && email.includes('.com')) {
      this.setState({ buttonDisabled: false });
    } else this.setState({ buttonDisabled: true });
  }

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <form onSubmit={ this.onSubmitLogin }>
        <fieldset>

          <h2>Login:</h2>

          <input
            label="E-mail: "
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
          />

          <input
            label="Senha: "
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.onInputChange }

          />
          <button
            type="submit"
            disabled={ buttonDisabled }
          >
            Entrar
          </button>

        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchUserLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({ email: state.user.email });

const mapDispatchToProps = (dispatch) => ({
  dispatchUserLogin: (payload) => dispatch(actionLogin(payload)),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
