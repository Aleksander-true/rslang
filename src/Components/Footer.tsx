import React from 'react';
import rs_logo from './../assets/svg/rs_logo.svg';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className="rs-logo" src={rs_logo} alt="RS school"></img>
        </a>
        <a href="https://github.com/elina-nep" target="_blank" rel="noreferrer">
          <span className="footer__developer">Элина</span>
        </a>
        <a href="https://github.com/alexshyshko" target="_blank" rel="noreferrer">
          <span className="footer__developer">Алексей</span>
        </a>
        <a href="https://github.com/Aleksander-true" target="_blank" rel="noreferrer">
          <span className="footer__developer">Александр</span>
        </a>
        <div className="footer__year">2022</div>
      </div>
    </footer>
  );
}

export default Footer;
