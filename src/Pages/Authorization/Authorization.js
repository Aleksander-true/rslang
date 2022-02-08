import Modal from './../../Components/Modal';
import React from 'react';
import LogIn from './LogIn';
import Registration from './Registration';
import LogOut from './LogOut';
import './../../Components/header.css';
import './authrisation.css';
import api from '../../API';

class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: 'logIn', userAuthorized: false, userName: 'guest' };
  }

  async componentDidMount() {
    if (!localStorage.getItem('userId')) return;

    let response = await api.getUser(localStorage.getItem('userId'), localStorage.getItem('token'));
    if (response.isSuccess) {
      this.setState({ userAuthorized: true, form: 'logOut', userName: response.data.name });
    } else {
      response = await api.getUser(localStorage.getItem('userId'), localStorage.getItem('refreshToken'));
      if (response.isSuccess) {
        this.setState({ userAuthorized: true, form: 'logOut', userName: response.data.name });
      } else {
        this.clearUserDataFromLocalStorage();
      }
    }
  }

  clearUserDataFromLocalStorage() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
  }

  setFormTo(formName) {
    this.setState({ form: formName });
  }

  authorize() {
    this.componentDidMount();
  }

  unAuthorize() {
    this.setState({ userAuthorized: false });
  }

  render() {
    let form;
    if (this.state.form === 'logIn') {
      form = (
        <LogIn
          modal={this.props.modal}
          callRegistration={() => this.setFormTo('registration')}
          setFormToLogOut={() => this.setFormTo('logOut')}
          authorize={() => this.authorize()}
        />
      );
    } else if (this.state.form === 'registration') {
      form = <Registration modal={this.props.modal} callLogIn={() => this.setFormTo('logIn')} />;
    } else if (this.state.form === 'logOut') {
      form = (
        <LogOut
          modal={this.props.modal}
          unAuthorize={() => this.unAuthorize()}
          setFormToLogIn={() => this.setFormTo('logIn')}
        />
      );
    }

    let button;
    if (this.state.userAuthorized) {
      button = (
        <div className={this.props.mainClasses} onClick={() => this.props.modal.openModal()}>
          <span className="log-out">{this.state.userName.slice(0, 10)}</span>
        </div>
      );
    } else {
      button = (
        <div className={this.props.mainClasses} onClick={() => this.props.modal.openModal()}>
          <span>Войти</span>
        </div>
      );
    }

    return (
      <>
        {button}
        <Modal closeModal={this.props.modal.closeModal} show={this.props.modal.show}>
          {form}
        </Modal>
      </>
    );
  }
}

export default Authorization;
