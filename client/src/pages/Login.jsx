import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login({}) {
    const { login } = useAuth();
    const [usernameOrEmailInput, setUsernameOrEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await login({
            username: usernameOrEmailInput,
            email: usernameOrEmailInput,
            password: passwordInput
        });

        setError(null);

        if (response.error) {
            setError(response.type);
            return
        }

        navigate(`/user/${response.user.id}`);
    }
    
    return (
        <>
            <h2>
                Login
            </h2>

            <form
                onSubmit={handleSubmit}
            >
                <label htmlFor='username-or-email-input'>
                    Your Username or Email: &nbsp;
                </label>
                <br />
                <input
                    id="username-or-email-input"
                    type="text"
                    value={usernameOrEmailInput}
                    onChange={e => setUsernameOrEmailInput(e.target.value)}
                    placeholder="Type Your Username/Email"
                />

                <br />
                <br />
                <label htmlFor="password-input">
                    Your Password: &nbsp;
                </label>
                <br />
                <input
                    id="password-input"
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="Type Your Password"
                />

                <br />
                <br />
                <button>
                    Submit
                </button>
            </form>

            {error && (
                <p>
                    {error}
                </p>
            )}
        </>
    )
}