import React from 'react';
import Cookies from 'js-cookie';
import Request from 'superagent';
import { FormGroup, InputGroup, Divider } from "@blueprintjs/core";
import './Login.css';
import { navigate } from "@reach/router"

function Login() {

    const [createFirstName, setCreateFirstName] = React.useState("");
    const [createFirstNameHelper, setCreateFirstNameHelper] = React.useState("");
    const [createLastName, setCreateLastName] = React.useState("");
    const [createLastNameHelper, setCreateLastNameHelper] = React.useState("");
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

    function createFirstNameOnChange(event) {
        setCreateFirstName(event.target.value);
        setCreateFirstNameHelper("");
    }

    function createLastNameOnChange(event) {
        setCreateLastName(event.target.value);
        setCreateLastNameHelper("");
    }

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
            username: createEmail,
            firstname: createFirstName,
            lastname: createLastName,
            password: createPassword
        };
        const url = "http://127.0.0.1:8000/chorescheduling/create-user";
        Request
            .post(url)
            .send(requestObject)
            .then(res => {
                if (res.body.error_message === "-") {
                    setCreateMessage(`Account has been successfully created! Please Login. ` + createPassword + " " + createEmail);
                } else {
                    setCreateMessage("Something went wrong, " + res.body.error_message);
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
            username: loginEmail,
            password: loginPassword
        };
        const url = "http://127.0.0.1:8000/chorescheduling/login-user";

        Request
            .post(url)
            .send(requestObject)
            .then(res => {
                if (res.body.error_message === "-") {
                    const expires = 60 * 60 * 1000;
                    const inOneHour = new Date(new Date().getTime() + expires);
                    Cookies.set('username', loginEmail, { expires: inOneHour });
                    Cookies.set('pid', res.body.person_id, { expires: inOneHour });
                    navigate('home');
                } else {
                    setLoginMessage("The entered email or password does not match our records." + res.body.error_message);
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

                <FormGroup inline={true} label="First Name" labelFor="text-input" helperText={createFirstNameHelper}>
                    <InputGroup id="first-name" placeholder="First Name" value={createFirstName} onChange={createFirstNameOnChange} />
                </FormGroup>

                <FormGroup inline={true} label="Last Name" labelFor="text-input" helperText={createLastNameHelper}>
                    <InputGroup id="last-name" placeholder="Last Name" value={createLastName} onChange={createLastNameOnChange} />
                </FormGroup>

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