import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink onClick={props.clicked} activeClassName={classes.active} exact={props.exact}to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigationItem;