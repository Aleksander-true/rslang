import { NavLink } from "react-router-dom";
import logo from "./../assets/svg/logo.svg";
import Modal from "./Modal";
import "./header.css";
import Authorization from "../Pages/Authorization/Authorization";

const NAV_CLASSES = "header__link";

function Header(props) {
  const { openModal, closeModal, show } = props;

  return (
    <header className="header">
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo" />
      </NavLink>
      <nav className="nav">
        <NavLink
          className={({ isActive }) => (isActive ? NAV_CLASSES + " header__link_active" : NAV_CLASSES)}
          to="/textbook"
        >
          Учебник
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? NAV_CLASSES + " header__link_active" : NAV_CLASSES)}
          to="/sprintGame"
        >
          Спринт
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? NAV_CLASSES + " header__link_active" : NAV_CLASSES)}
          to="/audioGame"
        >
          Аудиовызов
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? NAV_CLASSES + " header__link_active" : NAV_CLASSES)}
          to="/statictics"
        >
          Статистика
        </NavLink>
        <div className={NAV_CLASSES} onClick={openModal}>
          Войти
        </div>
        <Modal closeModal={closeModal} show={show}>
          <Authorization />
        </Modal>
      </nav>
    </header>
  );
}

export default Header;
