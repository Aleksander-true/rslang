import Modal from './../../Components/Modal';
import React from 'react';
import LogIn from './LogIn';
import Registration from './Registration';
import LogOut from './LogOut';
import './../../Components/header.css';
import './authrisation.css';

class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: 'logIn', userAuthorized: false };
  }

  setFormTo(formName) {
    this.setState({ form: formName });
  }

  authorize() {
    this.setState({ userAuthorized: true });
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
          <span className="log-out">Выйти</span>
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
