import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header/Header';
import LoginPage from './login/LoginPage';
import StarWarWorld from './star-war-world/StarWarWorld';
import {Loader} from './common-pattern';

class Router extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Loader isLoading={this.props.isLoading}/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={LoginPage}/>
                        <Route path='/:target' component={StarWarWorld}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading
})

export default connect(mapStateToProps, null)(Router);