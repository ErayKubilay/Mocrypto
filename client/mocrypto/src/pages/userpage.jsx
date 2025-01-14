import Card from '../components/Card.jsx'
import Tabs from '../components/Tabs.jsx'
import Footer from '../components/Footer.jsx';
import { Fragment, useEffect, useState } from 'react';
import { json, useLocation } from "react-router-dom";

const UserPage = () => {

    const location = useLocation();
    const userID = location.state?.userID;

    console.log(userID);

    const [currencies, setCurrencies] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState('10000');

    const getBalance = async () => {

        try {
            const response = await fetch(`http://localhost:5000/balance/${userID}`);
            const jsonData = await response.json();

            console.log(jsonData.rows[0].amount);

            setBalance(jsonData.rows[0].amount);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getBalance();
    }, []);

    const getCurrencies = async () => {
        try {

            // TODO: Get crypto datas from crypto API
            // const response = await fetch("Currency API here")
            // const jsonData = await response.json()

            try {
                const response = await fetch('http://localhost:5000/cryptocurrency');
                const jsonData = await response.json();

                setCurrencies(jsonData);

            } catch (err) {
                console.log(err.message);
            }

            //let jsonData = [{ id: 1, name: 'BTC', price: '5000' }, { id: 2, name: 'ETH', price: '1000' }];


        }
        catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getCurrencies();
    }, []);

    const getPortfolio = async () => {

        try {

            const response = await fetch(`http://localhost:5000/portfolio/${userID}`);
            const jsonData = await response.json();

            setPortfolio(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getPortfolio();
    }, []);


    const getTransactions = async () => {

        try {

            const response = await fetch(`http://localhost:5000/transaction/${userID}`);
            const jsonData = await response.json();

            console.log(jsonData);
            setTransactions(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    const buyCrypto = async (crypto_id) => {

        try {
            const userInput = prompt("Please enter USDT amount:");

            // Check if input is a valid integer
            const amount = Number(userInput);

            if (!Number.isInteger(amount) || isNaN(amount) || userInput === '') {
                alert("Please enter a integer value");
            }
            else if (userInput !== null) {

                if (balance < amount) {

                    alert("Not enough balance.");
                }
                else {

                    let response = await fetch(`http://localhost:5000/cryptocurrency/${crypto_id}`);
                    let boughtCryptocurrency = await response.json();

                    let body = { new_balance: balance - amount };

                    response = await fetch(`http://localhost:5000/balance/${userID}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });


                    response = await fetch(`http://localhost:5000/portfolio/${userID}/${boughtCryptocurrency.id}`);
                    let isOwned = await response.json();

                    console.log(boughtCryptocurrency);
                    if (isOwned.length === 0) {

                        body = { crypto_id: boughtCryptocurrency.id, user_id: userID, short_name: boughtCryptocurrency.shortname, name: boughtCryptocurrency.name, amount: amount };

                        response = await fetch('http://localhost:5000/portfolio/', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        });
                    }

                    // If user has the cryptocurrency update amount
                    else {

                        // TODO: add bought crypto to existing if user has bought before
                        let response = await fetch(`http://localhost:5000/portfolio/${userID}/${crypto_id}`);
                        let ownedCryptocurrency = await response.json();

                        body = { new_amount: ownedCryptocurrency.amount + amount };

                        response = await fetch(`http://localhost:5000/portfolio/${userID}/${crypto_id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        });
                        // TODO: auto refresh after bought

                    }



                    body = { user_id: userID, value: amount, base_crypto: boughtCryptocurrency.shortname, type: 'Buy' };

                    response = await fetch('http://localhost:5000/transaction', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });

                    alert(`You bought ${amount} USDT worth of Bitcoin.`);

                }
            }

        } catch (err) {
            console.log(err.message);
        }
    }


    const sellCrypto = async (crypto_id) => {

        try {
            const userInput = prompt("Please enter USDT amount:");

            // Check if input is a valid integer
            const amount = Number(userInput);

            if (!Number.isInteger(amount) && isNaN(amount)) {
                alert("Please enter a integer value");
            }
            else {

                // Check wheter user has enough coin to sell
                let response = await fetch(`http://localhost:5000/portfolio/${userID}/${crypto_id}`);
                let soldCryptocurrency = await response.json();

                console.log(soldCryptocurrency);

                if (amount > soldCryptocurrency.amount) {

                    alert("You don't have enough coin.");
                }
                else {

                    // Update cryptocurrency amount in portfolio
                    let body = { new_amount: soldCryptocurrency.amount - amount };

                    response = await fetch(`http://localhost:5000/portfolio/${userID}/${crypto_id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });

                    // Update balance
                    body = { new_balance: balance + amount };

                    response = await fetch(`http://localhost:5000/balance/${userID}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });

                    // Add transaction to transactions
                    body = { user_id: userID, value: amount, base_crypto: soldCryptocurrency.short_name, type: 'Sell' };

                    response = await fetch('http://localhost:5000/transaction', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });

                    alert(`You sold ${amount} USDT worth of Bitcoin.`);

                }
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    // For reference, delete it
    /*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
    </tr>*/

    const tabsData = [
        {
            label: "Cryptocurrencies",
            content:
                <Fragment>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Balance: {balance} USDT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currencies.map(currency => (
                                <tr key={currency.id}>
                                    <td>{currency.name}</td>
                                    <td>{currency.price}</td>
                                    <td><button className='btn btn-success'
                                        onClick={() => buyCrypto(currency.id)}
                                    > Buy </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Fragment>
        },
        {
            label: "Portfolio",
            content:
                <Fragment>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Balance: {balance} USDT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map(currency => (
                                <tr id={currency.crypto_id}>
                                    <td>{currency.short_name}</td>
                                    <td>{currency.amount}</td>
                                    <td><button className='btn btn-danger'
                                        onClick={() => sellCrypto(currency.crypto_id)}> Sell </button></td>
                                </tr>))}
                        </tbody>
                    </table>
                </Fragment>
        },
        {
            label: "History",
            content:
                <Fragment>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr id={transaction.id}>
                                    <td>{transaction.base_crypto}</td>
                                    <td>{transaction.value} USDT</td>
                                    <td>{transaction.type}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </Fragment>
        },
    ];

    return (
        <div style={{ background: 'black' }}>
            <Tabs tabs={tabsData} />
            <Footer />
        </div>
    );
};


export default UserPage;
