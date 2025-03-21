import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import Header from '../components/Header.jsx';
import Footer from '../components/Footer';

function SignUpPage() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const type = "user";
    const [buttonStyle, setButtonStyle] = useState({
        padding: '10px',
        backgroundImage: 'linear-gradient(45deg, #131419, #292C36)',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        marginBottom: '15px',
        transition: 'all 0.2s ease',
    });

    const handleMouseEnter = () => {
        setButtonStyle((prevStyle) => ({
            ...prevStyle,
            backgroundColor: 'hsl(180, 35%, 30%)',
            transform: 'scale(0.85)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }));
    };

    const handleMouseLeave = () => {
        setButtonStyle((prevStyle) => ({
            ...prevStyle,
            backgroundColor: 'hsl(180, 25%, 25%)',
            transform: 'scale(1)',
            boxShadow: 'none',
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!name || !surname || !username || !password || !confirmPassword) {
                setErrorMessage('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            let body = { name, surname, username, password, type };

            let response = await fetch("http://localhost:5000/accounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.status === 500) {
                setErrorMessage('Username already in use.');
            } else {
                alert('Sign Up Successful!');
                navigate('/log-in');

                // To see which id has assigned to newly created user
                response = await fetch(`http://localhost:5000/accounts/${username}`);
                const user = await response.json()

                // USDT's id is 1
                let cryptoID = '1';
                let userID = user.id;
                let shortName = 'USDT';
                let name = 'Tether';
                let amount = 10000;
                body = { crypto_id: cryptoID, user_id: userID, short_name: shortName, name, amount };

                console.log(body);

                response = await fetch("http://localhost:5000/portfolio", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                console.log('portfolio post:' + response);

                setErrorMessage('');
                setName('');
                setSurname('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <body style={styles.page}>
            <Header style={styles.header} name="Sign Up" />
            <div className="signup-container" style={styles.container}>
                <h1 style={styles.title}>MOCRYPTO</h1>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="surname" style={styles.label}>Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.label}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={buttonStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>Sign Up!</button>
                </form>
                <a href='/log-in' style={styles.a}>Already Have an Account?</a>
            </div>
            <Footer />
        </body>
    );
}

const styles = {
    header: {
        width: '100%',
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
    },
    page: {
        backgroundImage: 'linear-gradient(45deg, #131419, #292C36)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        justifyContent: 'center',
        gap: '20px',
        padding: '40px',
        borderRadius: '10%',
        width: '400px',
        backgroundColor: 'gray',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '110px',
        marginBottom: '195px',
        boxShadow: '20px 15px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: 'black',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
    },
    formGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        width: '100%',
    },
    label: {
        fontSize: '20px',
        width: '35%',
        textAlign: 'left',
    },
    input: {
        flexGrow: 1, // Allows the input to stretch and align properly
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: '#444444',
        border: '2px solid #000000', // Sets a custom frame color (blue in this case)
        outline: 'none',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    },
    a: {
        alignSelf: 'flex-start',
        color: '#131419',
    },

};

export default SignUpPage;
