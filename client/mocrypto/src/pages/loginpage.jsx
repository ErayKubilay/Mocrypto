import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        const response = await fetch(`http://localhost:5000/accounts/${username}`);
        const user = await response.json();

        if (username === user.username && password === user.password) {
            alert('Login successful. Welcome, ' + username + '!');
            navigate('/userxxx', { state: { userID: user.id } });
        } else if (username === 'admin' && password === 'admin') {
            alert('Welcome back Administrator!');
            navigate('/admin');
        } else {
            setErrorMessage('Wrong username or password.');
        }
    };

    return (
        <body style={styles.page}>
            <Header name="Log In" />
            <div className="login-container" style={styles.container}>
                <h1 style={styles.title}>MOCRYPTO</h1>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="username"  style={styles.label}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password"  style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                    <a href='/sign-up' style={styles.a}>Haven't Signed Up Yet?</a>
                </form>
            </div>
            <Footer />
        </body>
    );
}

const styles = {
    label: {
        fontSize: '20px',
        width: '35%', // Ensures labels have the same width
        textAlign: 'left',
    },
    formGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        width: '100%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
    },
    page: {
        backgroundColor: '#444444', // Background color for the whole page
        minHeight: '100vh', // Covers the full viewport
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        padding: '40px',
        borderRadius: '10%',
        width: '400px',
        backgroundColor: 'gray',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '45px',
        marginBottom: '130px',
        boxShadow: '20px 15px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: 'black',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
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
    button: {
        padding: '10px',
        backgroundColor: 'hsl(180, 25%, 25%)',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
    },
    a: {
        alignSelf: 'flex-start',
        color: 'hsl(180, 25%, 25%)',
    },
    error: {
        color: 'red',
    },
};

export default LoginPage;
