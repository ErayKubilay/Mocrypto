import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { json, useNavigate } from 'react-router-dom';




function LoginPage() {
    const navigate = useNavigate();
    //const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        // Fetch does get request default
        const response = await fetch(`http://localhost:5000/accounts/${username}`);
        const user = await response.json()

        // console.log(user);
        // console.log(response.status);


        if (username === user.username && password === user.password) {
            alert('Login successful. Welcome, ' + username + '!');
            navigate('/userxxx', { state: { userID: user.id } });
        }

        else if (username === 'admin' && password === 'admin') {
            alert('Welcome back Administrator!');
            navigate('/admin');
        }
        else {
            setErrorMessage('Wrong username or password.');
        }
    };


    return (
        <body>
            <Header name="Log In" />
            <div className="login-container" style={styles.container}>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    </div> */}
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                    <a href='/sign-up' style={styles.a}>Havent Signed Up Yet?</a>
                </form>
            </div>
            <Footer />
        </body>
    );
}

const styles = {
    container: {
        padding: '40px',
        borderRadius: '10%',
        width: '400px',
        backgroundColor: 'gray',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '175px',
        marginBottom: '130px',
    },
    a: {
        color: 'hsl(180, 25%, 25%)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        gap: '40px',
    },
    input: {
        marginTop: '15px',
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: 'hsl(180, 25%, 25%)',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
    },
    error: {
        color: 'red',
    },
};

export default LoginPage;
