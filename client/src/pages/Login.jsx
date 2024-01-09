import { useState } from "react";
import { useAuth } from "../contexts/UserContext"

export default function Login({}) {
    const [usernameOrEmailInput, setUsernameOrEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    async function handleLoginSubmit(e) {
        e.preventDefault();

        let response
        if (usernameOrEmailInput.includes('@')) {
            response = await login({
                email: usernameOrEmailInput,
                password: passwordInput
            })
        } else {
            response = await login({
                username: usernameOrEmailInput,
                password: passwordInput
            })
        }

        if (response.error) {
            switch (response.type) {
                case 'AuthenticationError':
                    setError('Incorrect username/password/email');
                    break;
                default:
                    setError('There was an error');
            }
        } else {
            setUsernameOrEmailInput('');
            setPasswordInput('');
        }
    }

    function handleUsernameOrEmailInputChange(e) {
        setUsernameOrEmailInput(e.target.value);

        setError(null);
    }

    function handlePasswordInputChange(e) {
        setPasswordInput(e.target.value);

        setError(null);
    }

    return (
        <>
            Login
            <form>
                <input
                    type="text"
                    id="username-or-email"
                    placeholder="Username or Email"
                    value={usernameOrEmailInput}
                    onChange={handleUsernameOrEmailInputChange}
                />
                <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                />
                <button onClick={handleLoginSubmit}>Submit</button>
            </form>

            {error && <div>{error}</div>}
        </>
    )
}