import Modal from '../../Components/Modal';
import React from 'react';
import LogIn from './LogIn';
import Registration from './Registration';
import LogOut from './LogOut';
import './../../Components/header.css';
import './authorization.css';
import api from '../../API';

const enum FormName {
  LOG_OUT = 'logOut',
  LOG_IN = 'logIn',
  REGISTRATION = 'registration',
}

class Authorization extends React.Component<AutorizeProp> {
  state: { form: FormName; userAuthorized: boolean; userName: string };

  constructor(props: AutorizeProp) {
    super(props);
    this.state = { form: FormName.LOG_IN, userAuthorized: false, userName: 'guest' };
  }

  async componentDidMount() {
    if (!localStorage.getItem('userId')) return;
    const userId = localStorage.getItem('userId') as string;
    const token = localStorage.getItem('token') as string;

    let response = await api.getUser(userId, token);
    if (response?.isSuccess) {
      this.setState({ userAuthorized: true, form: FormName.LOG_OUT, userName: response.data.name });
    } else {
      response = await api.getUser(userId, token);
      if (response?.isSuccess) {
        this.setState({ userAuthorized: true, form: FormName.LOG_OUT, userName: response.data.name });
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

  setFormTo(formName: FormName) {
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
          callRegistration={() => this.setFormTo(FormName.REGISTRATION)}
          setFormToLogOut={() => this.setFormTo(FormName.LOG_OUT)}
          authorize={() => this.authorize()}
        />
      );
    } else if (this.state.form === 'registration') {
      form = <Registration modal={this.props.modal} callLogIn={() => this.setFormTo(FormName.LOG_IN)} />;
    } else if (this.state.form === 'logOut') {
      form = (
        <LogOut
          modal={this.props.modal}
          unAuthorize={() => this.unAuthorize()}
          setFormToLogIn={() => this.setFormTo(FormName.LOG_IN)}
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
