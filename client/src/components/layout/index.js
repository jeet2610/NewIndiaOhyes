import React from 'react';

import Navigation from './navigation';

const Layout = props => (
    <>
        <Navigation bgColor={props.navBgColor} />
        {props.children}
    </>
);

export default Layout;