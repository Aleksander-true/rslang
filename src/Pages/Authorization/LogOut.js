import React from 'react';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'About' };
  }

  unAuthorize() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    this.props.modal.closeModal();
    this.props.unAuthorize();
    this.props.setFormToLogIn();
  }

  render() {
    return (
      <>
        <h4>Вы уверены, что хотите продолжить как гость</h4>
        <p>В гостевом режиме не доступен пользовательский словарь, статистика продвижения и другие функции</p>
        <div className="d-grid gap-2 d-md-flex justify-content-around">
          <button type="submit" className="btn btn-warning" onClick={() => this.unAuthorize()}>
            Продолжить как гость
          </button>
          <button type="button" className="btn btn-success" onClick={() => this.props.modal.closeModal()}>
            Отмена
          </button>
        </div>
      </>
    );
  }
}

export default LogOut;
