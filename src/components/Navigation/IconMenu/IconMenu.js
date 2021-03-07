import React from 'react';

import classes from './IconMenu.module.css';

const iconMenu = (props) => (
    <div 
        className={classes.IconMenu}
        onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
);

export default iconMenu;