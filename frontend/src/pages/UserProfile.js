import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

function UserProfile() {
    return (
        <section className="user-profile">
            <nav className="user-profile-sidebar">
                <ul className="user-profile-sidebar__nav">
                    <li>
                        <svg className="dashboard-icon">
                            <use xlinkHref="images/sprite.svg#.iconsupervisor_account"></use>
                        </svg>
                        <Link to="dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <svg className="wallet-icon">
                            <use xlinkHref="images/sprite.svg#.iconlist"></use>
                        </svg>
                        <Link to="wallet-overview">Overview</Link>
                    </li>
                    <li>
                        <svg className="logout-icon">
                            <use xlinkHref="images/sprite.svg#.iconlogout"></use>
                        </svg>
                        <h1>Logout</h1>
                    </li>
                </ul>
            </nav>
            <div className="user-profile-main">
                <Outlet></Outlet>
            </div>
        </section>
    );
}

export default UserProfile;
