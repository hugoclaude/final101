import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Icons from './helpers/icons';
import NavigationContainer from './navigation/navigation-container';

export default class App extends Component {
    constructor(props) {
        super(props);

        Icons();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
        this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    }

    handleSuccessfulLogin() {
        this.setState({
            loggedInStatus: "LOGGED_IN",
        });
    }

    handleUnsuccessfulLogin() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
        });
    }

    handleSuccessfulLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
        });
    }

    checkLoginStatus() {
        return (
            axios
                .get('https://api.devcamp.space/logged_in', {
                    withCredentials: true,
                })
                .then((response) => {
                    const loggedIn = response.data.logged_in;
                    const loggedInStatus = this.state.loggedInStatus;

                    if(loggedIn && loggedInStatus === "LOGGED_IN") {
                        return loggedIn;
                    } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
                        this.setState({
                            loggedInStatus: "LOGGED_IN",
                        });
                    } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
                        this.setState({
                                loggedStatus: "NOT_LOGGED_IN",
                            });
                        }  
                    })
                .catch((error) => {
                    console.log("Error", error);
                })
        );
    }

    componentDidMount() {
        this.checkLoginStatus();
    }
    authorizedPages() {
        return [
 
        ];
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <div>
                        <NavigationContainer
                            loggedInStatus={this.state.loggedInStatus}
                            handleSuccessfulLogout={this.handleSuccessfulLogout}
                        />

                        <Switch>
                            <Route
                                exact path="/" render={(props) => (
                                    <Auth {...props}
                                        handleSuccessfulLogin={this.handleSuccessfulLogin}
                                        handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
