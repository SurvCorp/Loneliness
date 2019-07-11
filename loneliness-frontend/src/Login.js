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
        var username = document.forms["login form"]["username"].value;
        var password = document.forms["login form"]["password"].value;
        var string = '{"username":"' + username + '","password":"' + password + '"}';
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState === 4 && request.status === 200) {
                let token = "Token " + JSON.parse(request.responseText).token;
                this.props.auth.authenticate(token);
                this.setState({ redirectToReferrer: true });
            }
        }
        request.open("POST", "http://127.0.0.1:8000/api-token-auth/", true)
        request.setRequestHeader("Content-Type","application/json")
        request.send(string);
    }

    render() {
        if (this.state.redirectToReferrer) return <Redirect to={{pathname: "/home"}}/>

        return (
            <div className="ui middle aligned center aligned grid" style={{height: "100%"}}>
                <div className="column" style={{maxWidth: "450px"}}>
                    <h2 className="ui image header"> {/* inverted */}
                        <img src="crow-grey-silhouette.svg" className="image" alt="Loneliness logo" style={{manginTop: "-100px"}} />
                        <div className="content">
                            Log-in to your Loneliness
                        </div>
                    </h2>
                    <form className="ui large form" name="login form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="username" placeholder="Username or email address" id="id_username" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" id="id_password" />
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