import React from 'react';
//import './Login.css'; // recolocar
import {Redirect} from 'react-router-dom';
//import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirectToReferrer: false };
    }
    

    login = () => {
        this.props.auth.authenticate(
            () => this.setState({ redirectToReferrer: true })
        );
    }

    render() {
        if (this.state.redirectToReferrer) return <Redirect to={{pathname: "/home"}}/>

        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui inverted image header">
                        <img src="crow-grey-silhouette.svg" className="image" alt="Loneliness logo" />
                        <div className="content">
                            Log-in to your Loneliness
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="username" placeholder="Username or email address"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password"/>
                                </div>
                            </div>

                            <div className="ui fluid large black submit button" onClick={this.login}>Login</div>
                        </div>

                        <div className="ui error message"></div>

                    </form>

                    <div className="ui message">
                        New to Loneliness? <a href="#">Sign Up</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;