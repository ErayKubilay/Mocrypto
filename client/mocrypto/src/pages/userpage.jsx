import Card from '../components/Card.jsx'
import Tabs from '../components/Tabs.jsx'
import Footer from '../components/Footer.jsx';

const UserPage = () => {
    const tabsData = [
        { label: "Cryptocurrencies", 
        content: 
        <p>XD</p> },
        { label: "Portfolio", 
        content: 
        "This is the content of Tab 2." },
        { label: "History", 
        content: 
        "This is the content of Tab 3." },
    ];

    return (
        <div>
            <Tabs tabs={tabsData} />
            <Footer/>
        </div>
    );
};


export default UserPage;