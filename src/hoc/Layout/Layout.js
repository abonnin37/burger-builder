import React, {useState} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) =>{
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () =>{
        setShowSideDrawer(false);
    }

    const openSideDrawer = () =>{
        setShowSideDrawer(true);
    }

    return (
        <React.Fragment>
            <Toolbar isAuth={props.isAuthenticated} iconMenuClicked={openSideDrawer}/>
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}



export default connect(mapStateToProps)(layout);