import rs_logo from './../assets/svg/rs_logo.svg'

function Footer() {

  return (
      <footer className="footer" >
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <img className='rs-logo' src={rs_logo} alt='RS school'></img>
          </a>
          <a href="https://github.com/elina-nep" target="_blank" rel="noreferrer">
            <span className='footer__developer'>Elina </span> 
          </a>
          <a href="https://github.com/alexshyshko" target="_blank" rel="noreferrer">
            <span className='footer__developer'>Aliaksei </span>
          </a>
          <a href="https://github.com/Aleksander-true" target="_blank" rel="noreferrer">
              <span className='footer__developer'>Aleksnadr </span>
          </a>
          <div className="footer__year">2022</div>
      </footer>
  );
}

export default Footer;