import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    openSideDrawer = () =>{
        this.setState({showSideDrawer: true});
    }

    render () {
        return (
            <React.Fragment>
                <Toolbar isAuth={this.props.isAuthenticated} iconMenuClicked={this.openSideDrawer}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}



export default connect(mapStateToProps)(Layout);