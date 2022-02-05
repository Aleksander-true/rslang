import './App.css';
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import api from './API';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { main: 'Home' };
  }

  render() {
    return (
      <div className='wrapper'>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
