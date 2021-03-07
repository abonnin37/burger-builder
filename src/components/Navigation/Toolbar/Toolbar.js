import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import IconMenu from '../IconMenu/IconMenu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <IconMenu clicked={props.iconMenuClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;