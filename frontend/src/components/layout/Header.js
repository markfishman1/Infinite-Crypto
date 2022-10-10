import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
    // const history = useHistory();
    const navigate = useNavigate();
    const redirectToHomePageHandler = () => {
        navigate('/');
    };
    const user = useSelector((state) => state.user.loggedUser);
    return (
        <header className="main-header">
            <div className="main-header-logo">
                <h1 onClick={redirectToHomePageHandler}>Infinite Crypto</h1>
            </div>
            <nav className="main-header-nav">
                <ul className="main-header-nav__pages">
                    <li>
                        <Link to="/markets" className="header-link">
                            Markets
                        </Link>
                    </li>
                    <li>
                        <Link to="/trade" className="header-link">
                            Trade
                        </Link>
                    </li>
                </ul>
                {!user && (
                    <ul className="main-header-nav__user">
                        <li>
                            <Link to="/register" className="header-link">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="header-link">
                                Login
                            </Link>
                        </li>
                    </ul>
                )}
                {user && (
                    <ul className="main-header-nav__user">
                        <li>
                            <Link to="/profile" className="header-link">
                                Profile
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}

export default Header;
