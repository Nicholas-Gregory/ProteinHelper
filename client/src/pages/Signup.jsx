import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Signup({}) {
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');
    const formRef = useRef(null);
    const [small, setSmall] = useState(null);

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

    function handleSubmit(e) {
        e.preventDefault();
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
                    onChange={e => setEmailInput(e.target.value)}
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
                    onChange={e => setPasswordInput(e.target.value)}
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
                    onChange={e => setPasswordConfirmationInput(e.target.value)}
                    placeholder="Type Password Again"
                />

                <br />
                <button>
                    Submit
                </button>
            </form>
        </>
    )
}