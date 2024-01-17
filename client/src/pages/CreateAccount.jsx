import { useState } from "react";
import { useAuth } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";

export default function CreateAccount({}) {
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [error, setError] = useState(null);
    const { signup, user } = useAuth();
    const navigate = useNavigate();

    function checkPasswords(first, second) {
        setError(null);

        if (first !== second) {
            setError('Passwords do not match.');
        } else if (first.length < 8) {
            setError('Password must be at least 8 characters.');
        }
    }

    function handleUsernameInputChange(e) {
        setError(null);
        
        setUsernameInput(e.target.value);
    }

    function handleEmailInputChange(e) {
        const value = e.target.value;

        setError(null);

        setEmailInput(value);

        if (!/^[\w-.!#$&'*+=?^`{}|~/]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
            setError('Must input a valid email address');
        }
    }

    function handlePasswordInputChange(e) {
        const value = e.target.value;

        setPasswordInput(value);

        checkPasswords(value, confirmPasswordInput);
    }

    function handleConfirmPasswordInputChange(e) {
        const value = e.target.value;

        setConfirmPasswordInput(value);
    
        checkPasswords(value, passwordInput);
    }

    async function handleCreateAccountFormSubmit(e) {
        e.preventDefault();

        let response;
        if (!error) {
            response = await signup({
                username: usernameInput,
                email: emailInput,
                password: passwordInput
            });
        }

        if (response.error) {
            setError(response.type);
            return;
        }
    }

    return (
        <>
            <form>
                Choose a Username and Email Address (must be a valid address) <br />
                <input
                    id="username-input"
                    type="text"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={handleUsernameInputChange}
                />

                <br />
                <input
                    id="email-input"
                    type="text"
                    placeholder="Email"
                    value={emailInput}
                    onChange={handleEmailInputChange}
                />

                <br />
                <br />
                Choose a Password (must be at least 8 characters)
                <br />
                <input
                    id="password-input"
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                />

                <br />
                <input
                    id="confirm-password-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPasswordInput}
                    onChange={handleConfirmPasswordInputChange}
                />
                
                <br />
                <br />
                <button
                    onClick={handleCreateAccountFormSubmit}
                >
                    Submit
                </button>
            </form>

            {error &&
                <p>
                    {error}
                </p>
            }
        </>
    )
}