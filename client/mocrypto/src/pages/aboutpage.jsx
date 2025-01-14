import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function About() {
    return (
        <>
            <Header name="About" />
            <main style={styles.main}>
                <section style={styles.section}>
                    <h1 style={styles.title}>Welcome to Our Platform</h1>
                    <p style={styles.description}>
                        Our mission is to provide the best tools and insights for managing your cryptocurrency portfolio. 
                        Whether you're a seasoned investor or just getting started, we aim to empower you with cutting-edge solutions.
                    </p>
                </section>
                <section style={styles.section}>
                    <h2 style={styles.subtitle}>Why Choose Us?</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Real-time cryptocurrency tracking.</li>
                        <li style={styles.listItem}>User-friendly interface.</li>
                        <li style={styles.listItem}>Secure and reliable platform.</li>
                    </ul>
                </section>
                <section style={styles.section}>
                    <h2 style={styles.subtitle}>Our Story</h2>
                    <p style={styles.description}>
                        Founded in 2025, we started with a simple goal: to make cryptocurrency management easy and accessible for everyone. 
                        Today, our platform serves thousands of users worldwide.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}

const styles = {
    main: {
        padding: '20px',
        fontFamily: "'Arial', sans-serif",
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    section: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '15px',
    },
    subtitle: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    description: {
        fontSize: '16px',
        lineHeight: '1.6',
    },
    list: {
        padding: '0',
        listStyleType: 'none',
    },
    listItem: {
        marginBottom: '8px',
        fontSize: '16px',
    },
};

export default About;
