import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import loginUser from '../redux/actions';

export default class Login extends React.Component {
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

  onSubmitLogin() {
    const { history, dispatchSetValue } = this.props;

    dispatchSetValue(...this.state);
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
    const { dispatchUserLogin } = this.props;

    return (
      <form>
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
            onClick={ () => dispatchUserLogin(this.state) }
          >
            Entrar
          </button>

        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.any,
  dispatchUserLogin: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({ email: state.user.state.email });

const mapDispatchToProps = (dispatch) => ({
  dispatchUserLogin: (login) => dispatch(loginUser(login)),
}
);

connect(mapStateToProps, mapDispatchToProps)(Login);
