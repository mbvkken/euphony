import React from "react";
import { Nav, Body } from "../AppStyle";
import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from '../icons/arrow.svg';
import { ReactComponent as Search } from '../icons/search.svg';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Profile } from '../icons/user.svg';

const Navbar = (props) => {
    return (
        <div>
            <Nav>

                <Link to="/">
                    <Arrow />
                </Link>

                <Link to="/search">
                    <Search />
                </Link>

                <Link to="/home">
                    <Home />
                </Link> 

                <Link to="/register">
                    <Profile />
                </Link>

            </Nav>
        </div>
    )
}

const TempNoNavBar = () => {
    return <Body></Body>;
  };
  export { Navbar, TempNoNavBar };