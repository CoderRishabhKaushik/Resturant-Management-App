import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <div id="main">
        <div className="nav">
          <h2>Restaurant App</h2>
          <div className="nav-part2">
            <ul className="nav-part2">
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/List" style={{ textDecoration: "none" }}>
                  List
                </Link>
              </li>
              <li>
                <Link to="/Create" style={{ textDecoration: "none" }}>
                  Create
                </Link>
              </li>
              <li>
                <Link to="/Search" style={{ textDecoration: "none" }}>
                  Search
                </Link>
              </li>
             </ul>
          </div>
        </div>
      </div>
    );
  }
}
 