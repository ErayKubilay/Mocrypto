import React, { useState } from 'react';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer'


function SignUpPage() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    // const [idNo, setIdNo] = useState('');
    //const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const type = "user";

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
                body: JSON.stringify(body)
            });

            console.log(response);

            // Status 500 means client tried to add username which is in the database
            // Maybe you can find better way to check this
            if (response.status === 500) {
                setErrorMessage('Username already in use.');
            }

            else {
                setSuccessMessage('Sign Up Successful!');

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
                //setIdNo('');
                //setEmail('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');

            }


        } catch (err) {

            console.error(err.message);

        }
    };

    return (
        <body>
            <Header name="Sign Up" />
            <div className="signup-container" style={styles.container}>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label htmlFor="surname">Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            style={styles.input}
                        />
                    </div>
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
                    {/* <div>
                    <label htmlFor="idNo">ID No:</label>
                    <input
                        type="text"
                        maxLength={11}
                        minLength={11}
                        id="idNo"
                        value={idNo}
                        onChange={(e) => setIdNo(e.target.value)}
                        style={styles.input}
                    />
                    </div>
                    <div>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Sign Up!</button>
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
        marginTop: '105px',
        marginBottom: '80px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        gap: '10px',
    },
    input: {
        marginTop: '15px',
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        marginBottom: '60px',
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
    success: {
        color: 'green',
    },
};

export default SignUpPage;
