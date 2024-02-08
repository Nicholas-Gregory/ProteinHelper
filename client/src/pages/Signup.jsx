import { useLayoutEffect, useRef, useState } from "react";
import { useAuth } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Signup({}) {
    const { signup, user } = useAuth();
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
    const formRef = useRef(null);
    const [small, setSmall] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function isSmall() {
        const formWidth = formRef.current.clientWidth;

        return formWidth > window.innerWidth || formWidth > window.screen.width;
    }

    function handleResizeWindow() {
        setSmall(isSmall());
    }
    
    useLayoutEffect(() => {
        setSmall(isSmall());

        window.addEventListener('resize', handleResizeWindow);

        return () => window.removeEventListener('resize', handleResizeWindow);
    }, []);

    function handleEmailInputChange(e) {
        const message = 'Must input a valid email address';
        const value = e.target.value;

        setEmailInput(value);

        if (!/^[\w-.!#$&'*+=?^`{}|~/]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
            setErrors([...errors.filter(error => error !== message), message]);
        } else {
            setErrors(errors.filter(error => error !== message));
        }
    }

    function checkPasswords(first, second) {
        const noMatchMessage = 'Passwords do not match';
        const under8Message = 'Password must be at least 8 characters';

        if (first !== second) {
            setErrors(errors => [...errors.filter(error => error !== noMatchMessage), noMatchMessage]);
        } else {
            setErrors(errors => errors.filter(error => error !== noMatchMessage))
        }
        
        if (first.length < 8) {
            setErrors(errors => [...errors.filter(error => error !== under8Message), under8Message]);
        } else {
            setErrors(errors => errors.filter(error => error !== under8Message));
        }
    }

    function handlePasswordInputChange(e) {
        const value = e.target.value;

        setPasswordInput(value);

        checkPasswords(value, passwordConfirmationInput);
    }

    function handlePasswordConfirmationInputChange(e) {
        const value = e.target.value;

        setPasswordConfirmationInput(value);

        checkPasswords(passwordInput, value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (errors.length === 0) {
            const response = await signup({
                username: usernameInput,
                password: passwordInput,
                email: emailInput
            });

            if (response.error) {
                setErrors([response.type]);
                return;
            }

            navigate(`/user/${response.user.id}`);
        }
    }

    return (
        <>
            <h2>
                Sign Up
            </h2>

            <form 
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                    width: 'fit-content',
                    display: `${small ? 'inline' : 'grid'}`,
                    gridTemplateColumns: '10em 23em',
                    gap: '5px'
                }}    
            >
                <label htmlFor="email-input">
                    Your Email Address:&nbsp;
                </label>
                <input
                    id="email-input"
                    type="text"
                    value={emailInput}
                    onChange={handleEmailInputChange}
                    placeholder="Type Your Email Address"
                />

                {small && <br />}
                <label htmlFor="username-input">
                    Choose Username:&nbsp;
                </label>
                <input
                    id="username-input"
                    type="text"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                    placeholder="Type Username"
                />

                {small && <br />}
                <label htmlFor="password-input">
                    Choose Password:&nbsp;
                </label>
                <input
                    id="password-input"
                    type="password"
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                    placeholder="Type Password"
                />

                {small && <br />}
                <label htmlFor="password-confirmation-input">
                    Confirm Password:&nbsp;
                </label>
                <input
                    id="password-confirmation-input"
                    type="password"
                    value={passwordConfirmationInput}
                    onChange={handlePasswordConfirmationInputChange}
                    placeholder="Type Password Again"
                />

                <br />
                <button>
                    Submit
                </button>
            </form>

            {errors.map(error => (
                <p>
                    {error}
                </p>
            ))}
        </>
    )
}