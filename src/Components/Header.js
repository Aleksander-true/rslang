import { NavLink } from 'react-router-dom';
import logo from './../assets/svg/logo.svg'

const NAV_CLASSES = 'header__link';

function Header() { 
  return (
      <header className="header">
        <NavLink to="/">
          <img className='logo' src={logo} alt='logo' />
        </NavLink>
        <nav className="nav">
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' header__link_active' : NAV_CLASSES} to="/textbook">Учебник</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' header__link_active' : NAV_CLASSES} to="/sprintGame">Спринт</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' header__link_active' : NAV_CLASSES} to="/audioGame">Аудиовызов</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' header__link_active' : NAV_CLASSES} to="/statistics">Статистика</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' header__link_active' : NAV_CLASSES} to="/authorization">Войти</NavLink>
        </nav>
      </header>
  );
}

export default Header;