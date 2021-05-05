import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/cards">Cards</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
