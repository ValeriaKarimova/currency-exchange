import React, { Component } from 'react';
import '../styles/footer.css';

function Title() {
  return <h1 className="title">Currency Exchange</h1>;
}

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Title />
      </header>
    );
  }
}

export default Header;
