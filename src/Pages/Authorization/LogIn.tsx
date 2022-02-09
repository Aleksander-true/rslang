import React, { FormEvent } from 'react';
import api from '../../API';
import './authorization.css';

class LogIn extends React.Component<LogInProp> {
  state: { email: string; password: string; message: string };

  constructor(props: LogInProp) {
    super(props);
    this.state = { email: '', password: '', message: '' };
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await api.signIn({ email: this.state.email, password: this.state.password });
    if (response?.isSuccess) {
      this.setState({ message: '' });
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('name', response.data.name);

      this.props.authorize();
      this.props.modal.closeModal();
      this.props.setFormToLogOut();
    } else {
      this.setState({ message: response?.data.errorMessage });
    }
  }

  handleInput(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    switch (target.type) {
      case 'email':
        this.setState({ email: target.value });
        break;
      case 'password':
        this.setState({ password: target.value });
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
            <button type="submit" className="btn button_ok btn-lg">
              Войти
            </button>
            <button type="button" className="btn btn-link btn-lg" onClick={this.props.callRegistration}>
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
