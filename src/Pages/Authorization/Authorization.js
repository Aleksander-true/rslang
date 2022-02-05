import React from "react";

class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("this.state", this.state);
  }

  handleInput(e) {
    e.preventDefault();
    switch (e.target.type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <h3>Введите ваши данные:</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="mb-3">
            <label class="form-label">
              Адрес электронной почты
              <input type="email" class="form-control" onInput={(e) => this.handleInput(e)}></input>
            </label>
          </div>
          <div class="mb-3">
            <label class="form-label">
              Пароль
              <input
                type="password"
                class="form-control"
                aria-describedby="passwordHelp"
                onInput={(e) => this.handleInput(e)}
              ></input>
            </label>
            <div id="passwordHelp" class="form-text">
              Длинна пароля не менее 8 символов
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Войти
          </button>
        </form>
      </>
    );
  }
}

export default Authorization;
