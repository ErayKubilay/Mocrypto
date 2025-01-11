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
    const [balance, setBalance] = useState('10000');

    const getBalance = async () => {

        try {
            const response = await fetch(`http://localhost:5000/balance/${userID}`);
            const jsonData = await response.json();

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


    const buyCrypto = async (id) => {

        try {
            const response = await fetch(`http://localhost:5000/portfolio/${userID}`);
            const jsonData = await response.json();

            setPortfolio(jsonData);

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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currencies.map(currency => (
                                <tr key={currency.id}>
                                    <td>{currency.name}</td>
                                    <td>{currency.price}</td>
                                    <td><button className='btn btn-success'
                                        onClick={() => buyCrypto(currency.crypto_id)}
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
                                <th>Type //(Buy or Sell)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>BTC</td>
                                <td>0.2</td>
                                <td>Buy</td>
                            </tr>
                            <tr>
                                <td>BTC</td>
                                <td>0.1</td>
                                <td>Sell</td>
                            </tr>
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
