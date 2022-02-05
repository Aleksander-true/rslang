import "./App.css";
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Components/Main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  openModal() {
    this.setState({ showModal: true });
    console.log("openModal");
  }

  closeModal() {
    this.setState({ showModal: false });
    console.log("closeModal");
  }

  render() {
    return (
      <div className="wrapper">
        <Header openModal={() => this.openModal()} closeModal={() => this.closeModal()} show={this.state.showModal} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
