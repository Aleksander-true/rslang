import './App.css';
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.modal = {
      openModal: this.openModal.bind(this),
      closeModal: this.closeModal.bind(this),
      show: () => this.state.showModal,
    };
  }

  openModal() {
    this.setState({ showModal: true });
    console.log('openModal this.state.showModal', this.state.showModal);
  }

  closeModal() {
    this.setState({ showModal: false });
    console.log('closeModal this.state.showModal', this.state.showModal);
  }

  render() {
    return (
      <div className="wrapper">
        <Header modal={this.modal} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
