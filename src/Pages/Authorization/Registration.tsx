import React, { FormEvent } from 'react';
import api from '../../API';
import './authorization.css';

type RegProp = { modal: Readonly<ModalProp>; callLogIn: () => void };

class Registration extends React.Component<RegProp> {
  state: { name: string; email: string; password: string; message: string };

  constructor(props: RegProp) {
    super(props);
    this.state = { name: '', email: '', password: '', message: '' };
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!this.isInputsValid()) return;

    const response = await api.createNewUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
    if (response?.isSuccess) {
      this.setState({ message: 'Спасибо за регистрацию!' });
      setTimeout(() => this.props.callLogIn(), 1000);
    } else {
      this.setState({ message: response?.data.errorMessage });
    }
  }

  handleInput(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    switch (target.type) {
      case 'text':
        this.setState({ name: target.value });
        break;
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
        <h4>Введите данные для регистрации:</h4>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">
              Имя
              <input type="text" className="form-control" onInput={(e) => this.handleInput(e)}></input>
            </label>
          </div>
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
            <div id="passwordHelp" className="form-text">
              Длинна пароля не менее 8 символов
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-around">
            <button type="submit" className="btn button_ok btn-lg">
              Войти
            </button>
            <button type="button" className="btn btn-link btn-lg" onClick={this.props.callLogIn}>
              Уже зарегистрированы?
            </button>
          </div>
          <p className="fs-4 fw-bold text-danger text-uppercase">{this.state.message}</p>
        </form>
      </>
    );
  }

  isInputsValid() {
    if (this.state.name === '') {
      this.setState({ message: 'Пожалуйста, введите имя' });
      return false;
    }

    if (this.state.email === '') {
      this.setState({ message: 'Пожалуйста, введите email' });
      return false;
    }

    if (this.state.password === '') {
      this.setState({ message: 'Пожалуйста, введите пароль' });
      return false;
    }

    if (this.state.password.length < 8) {
      this.setState({ message: 'Пароль менее 8 символов' });
      return false;
    }
    return true;
  }
}

export default Registration;
