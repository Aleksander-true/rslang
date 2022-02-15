import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../assets/svg/logo.svg';
import './header.css';
import Authorization from '../Pages/Authorization/Authorization';

const NAV_CLASSES = 'header__link ';
const ACTIVE_LINK_CLASS = 'header__link_active';

function Header(props: { modal: ModalProp }) {
  const isAuthorized = localStorage.getItem('userId') ? true : false;

  return (
    <header className="header">
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo" />
      </NavLink>
      <nav className="nav">
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

        <Authorization modal={props.modal} mainClasses={NAV_CLASSES} activeClass={ACTIVE_LINK_CLASS} />
      </nav>
    </header>
  );
}

export default Header;
