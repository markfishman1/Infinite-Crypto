import { React, Fragment } from 'react';
import Header from './Header';

function Layout(props) {
    return (
        <Fragment>
            <Header></Header>
            <main>{props.children}</main>
        </Fragment>
    );
}

export default Layout;
