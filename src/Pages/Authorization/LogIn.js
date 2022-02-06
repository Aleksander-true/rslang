import React from 'react';
import api from '../../API';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', message: '' };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const response = await api.signIn({ email: this.state.email, password: this.state.password });
    console.log('response', response);
    if (response.isSuccess) {
      this.setState({ message: '' });
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('name', response.data.name);
      this.props.authorize();
      this.props.modal.closeModal();
      this.props.setFormToLogOut();
    } else {
      this.setState({ message: response.data.errorMessage });
    }
  }

  handleInput(e) {
    e.preventDefault();
    switch (e.target.type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <h4>Введите данные для входа:</h4>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">
              Адрес электронной почты
              <input type="email" className="form-control" onInput={(e) => this.handleInput(e)}></input>
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Пароль
              <input
                type="password"
                className="form-control"
                aria-describedby="passwordHelp"
                onInput={(e) => this.handleInput(e)}
              ></input>
            </label>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              Войти
            </button>
            <button type="button" className="btn btn-link" onClick={this.props.callRegistration}>
              Регистрация
            </button>
          </div>
          <p className="fs-4 fw-bold text-danger text-uppercase">{this.state.message}</p>
        </form>
      </>
    );
  }
}

export default LogIn;
