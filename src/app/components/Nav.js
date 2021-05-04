import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/posts">All Posts</NavLink>
      </li>
      <li>
        <NavLink to="/posts/new">Create a Post</NavLink>
      </li>
      <li>
        <NavLink to="/cards">Cards</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
