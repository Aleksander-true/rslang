import { NavLink } from 'react-router-dom';

const NAV_CLASSES = 'btn btn-outline-primary';

function Header() { 
  return (
      <header className="container header">
        <div className="btn-group">
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' active' : NAV_CLASSES} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' active' : NAV_CLASSES} to="/textbook">Textbook</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' active' : NAV_CLASSES} to="/sprintGame">Sprint Game</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' active' : NAV_CLASSES} to="/audioGame">Audio Game</NavLink>
          <NavLink className={({ isActive }) => isActive ? NAV_CLASSES + ' active' : NAV_CLASSES} to="/about">About</NavLink>
        </div>
      </header>
  );
}

export default Header;