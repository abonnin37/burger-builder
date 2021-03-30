import React, { Suspense, useEffect } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const app = (props) => {
    const { onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);


    let routes = (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" component={BurgerBuilder} />
                <Redirect to="/"/>
            </Switch>
        </Suspense>
    );

    if (props.isAuthenticated){
        routes = (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/" component={BurgerBuilder} />
                    <Redirect to="/"/>
                </Switch>
            </Suspense>
        );
    }

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
