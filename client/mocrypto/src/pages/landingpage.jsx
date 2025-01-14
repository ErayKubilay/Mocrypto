import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import graph from "../assets/graph.jpg"
import coins from "../assets/coins.jpeg"
import market from "../assets/market.png"


function LandingPage() {
    return (
        <div style={styles.page}>
            <Header style={styles.header} name="Mocrypto" />
            <div style={styles.container}>
                <Card img={graph} paragraph="Analyze the Market!" title=" " path="/sign-up" />
                <Card img={coins} paragraph="Buy Coins and Manage Your Wallet!" title="Your Money is Safe Here" path="/sign-up" />
                <Card img={market} paragraph="Get Yourself Ready for the Real Market" path="/sign-up" />
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: '#444444', // Background color for the whole page
        minHeight: '100vh', // Covers the full viewport
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
        backgroundColor: '#444444',
        marginTop: '130px',
        marginBottom: '195px',
    },
};


export default LandingPage;
