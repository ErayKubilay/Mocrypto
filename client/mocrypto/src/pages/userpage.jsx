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

    const getCurrencies = async () => {
        try {

            // TODO: Get crypto datas from crypto API
            // const response = await fetch("Currency API here")
            // const jsonData = await response.json()

            let jsonData = [{ name: 'BTC', price: '5000' }, { name: 'ETH', price: '1000' }];

            setCurrencies(jsonData);

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
                                <th>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currencies.map(currency => (
                                <tr>
                                    <td>{currency.name}</td>
                                    <td>{currency.price}</td>
                                    <td>Buy</td>
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
                                <th>Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map(currency => (
                                <tr>
                                    <td>{currency.short_name}</td>
                                    <td>{currency.amount}</td>
                                    <td>Sell</td>
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
