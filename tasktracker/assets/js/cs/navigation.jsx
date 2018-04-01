import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Navigation(props) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        TaskTracker
      </span>

      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">
            All Users
          </NavLink>
        </NavItem>
      </ul>

      <span className="navbar-text">
        user@host
      </span>
    </nav>
  );
}
