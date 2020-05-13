import React from 'react';
import Cookies from 'js-cookie';
import Request from 'superagent';
import { FormGroup, InputGroup, Divider } from "@blueprintjs/core";
import './Login.css';
import { navigate } from "@reach/router"

function Login() {

    const [createEmail, setCreateEmail] = React.useState("");
    const [createEmailHelper, setCreateEmailHelper] = React.useState("");
    const [createPassword, setCreatePassword] = React.useState("");
    const [createPasswordHelper, setCreatePasswordHelper] = React.useState("");

    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginEmailHelper, setLoginEmailHelper] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");
    const [loginPasswordHelper, setLoginPasswordHelper] = React.useState("");

    const [createMessage, setCreateMessage] = React.useState("");
    const [loginMessage, setLoginMessage] = React.useState("");

    function createEmailOnChange(event) {
        setCreateEmail(event.target.value);
        setCreateEmailHelper("");
    }

    function createPasswordOnChange(event) {
        setCreatePassword(event.target.value);
        setCreatePasswordHelper("");
    }

    function loginEmailOnChange(event) {
        setLoginEmail(event.target.value);
        setLoginEmailHelper("");
    }

    function loginPasswordOnChange(event) {
        setLoginPassword(event.target.value);
        setLoginPasswordHelper("");
    }

    function isEmailValid(email) {
        return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    function handleCreateAccount() {
        if (!isEmailValid(createEmail)) {
            setCreateEmailHelper("Email is invalid");
            return;
        } else if (createPassword.length < 5) {
            setCreatePasswordHelper("Password must be at least 5 characters long");
            return;
        }

        const requestObject = {
            name: createEmail
        };
        const url = "http://127.0.0.1:8000/chorescheduling/create-user";
        Request
            .post(url)
            .send(requestObject)
            .then(res => {
                console.log("data is", res.body);
                if (res.body.user_created) {
                    setCreateMessage(`Account has been successfully created! Please Login.`);
                } else {
                    setCreateMessage("Something went wrong, please try again.");
                }
            })
            .catch(err => {
                setCreateMessage(`Something went wrong, please try again. Error is ${err}`);
            });
    }

    function handleLogin() {
        if (!isEmailValid(loginEmail)) {
            setLoginEmailHelper("email is invalid");
            return;
        }

        const requestObject = {
            name: createEmail
        };
        const url = "http://127.0.0.1:8000/chorescheduling/create-user";

        Request
            .post(url)
            .send(requestObject)
            .then(res => {
                if (res.body.user_created) {
                    const expires = 60 * 60 * 1000;
                    const inOneHour = new Date(new Date().getTime() + expires)
                    Cookies.set('access_token', loginEmail, { expires: inOneHour })
                    navigate('home');
                } else {
                    setLoginMessage("The entered email or password does not match our records.");
                }
            })
            .catch(err => {
                setLoginMessage(`Something went wrong, please try again. Error is ${err}`);
            });

    }

    return (
        <div id="login">
            <div>
                <h2>Create an account</h2>

                <FormGroup inline={true} label="Email" labelFor="text-input" helperText={createEmailHelper}>
                    <InputGroup id="email" placeholder="E-mail address" value={createEmail} onChange={createEmailOnChange} />
                </FormGroup>

                <FormGroup label="Password" labelFor="text-input" inline={true} helperText={createPasswordHelper}>
                    <InputGroup id="password" placeholder="Password" value={createPassword} onChange={createPasswordOnChange} />
                </FormGroup>

                <button disabled={!createEmail || !createPassword} onClick={handleCreateAccount}>Create an account</button>
                <p>{createMessage}</p>
            </div>
            <Divider id="divider" />
            <div>
                <h2>Log in</h2>

                <FormGroup label="Email" labelFor="text-input" inline={true} helperText={loginEmailHelper}>
                    <InputGroup id="login-email" placeholder="E-mail address" value={loginEmail} onChange={loginEmailOnChange} />
                </FormGroup>

                <FormGroup label="Password" labelFor="text-input" inline={true} helperText={loginPasswordHelper}>
                    <InputGroup id="login-password" placeholder="Password" value={loginPassword} onChange={loginPasswordOnChange} />
                </FormGroup>

                <button disabled={!loginEmail || !loginPassword} onClick={handleLogin}>Login</button>
                <p>{loginMessage}</p>
            </div>
        </div>
    )
}

export default Login;