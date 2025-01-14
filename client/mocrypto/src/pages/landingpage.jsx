import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import graph from "../assets/graph.jpg"
import coins from "../assets/coins.jpeg"
import market from "../assets/market.png"
import ccc from "../assets/kapak_230537.jpg"


function LandingPage() {
    return (
        <div style={styles.page}>
            <Header style={styles.header} name="Mocrypto" />
            <div style={styles.container}>
                <Card img={graph} paragraph="" title="Get Yourself Ready for the Real Market!" path="/sign-up" />
                <Card img={coins} paragraph="" title="You Don't Need Money to Start!" path="/sign-up" />
                <Card img={market} paragraph="" title="Buy Coins and Manage Your Wallet!" path="/sign-up" />
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    page: {
        backgroundImage: 'linear-gradient(45deg, #131419, #292C36)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: '20px',
        padding: '20px',
        boxSizing: 'border-box',
        marginTop: '130px',
        marginBottom: '195px',
    },
};


export default LandingPage;
