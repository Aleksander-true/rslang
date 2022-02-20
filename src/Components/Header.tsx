import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../assets/svg/logo.svg';
import './header.css';
import Authorization from '../Pages/Authorization/Authorization';

const NAV_CLASSES = 'header__link ';
const ACTIVE_LINK_CLASS = 'header__link_active';

function Header(props: { modal: ModalProp }) {
  const isAuthorized = localStorage.getItem('userId') ? true : false;
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = () => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <header className="header">
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo" />
      </NavLink>
      <nav className="navigation">
        <div className={'nav-icon' + (isOpen ? ' open' : '')} onClick={() => toggleOpen()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <NavLink
          className={({ isActive }) =>
            'header__home ' + (isActive ? `${NAV_CLASSES} ${ACTIVE_LINK_CLASS}` : NAV_CLASSES)
          }
          to="/"
        >
          Главная
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${NAV_CLASSES} ${ACTIVE_LINK_CLASS}` : NAV_CLASSES)}
          to="/textbook"
        >
          Учебник
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${NAV_CLASSES} ${ACTIVE_LINK_CLASS}` : NAV_CLASSES)}
          to="/sprintGame"
        >
          Спринт
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${NAV_CLASSES} ${ACTIVE_LINK_CLASS}` : NAV_CLASSES)}
          to="/audioGame"
        >
          Аудиовызов
        </NavLink>
        {isAuthorized && (
          <NavLink
            className={({ isActive }) => (isActive ? NAV_CLASSES + ACTIVE_LINK_CLASS : NAV_CLASSES)}
            to="/statistics"
          >
            Статистика
          </NavLink>
        )}
      </nav>
      <Authorization modal={props.modal} mainClasses={NAV_CLASSES + ' authorization'} activeClass={ACTIVE_LINK_CLASS} />
    </header>
  );
}

export default Header;
