import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import React, { useState } from 'react';


function Contact() {

    const [buttonStyle, setButtonStyle] = useState({
        padding: '10px',
        backgroundColor: 'hsl(180, 25%, 25%)',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.2s ease',
    });

    const handleMouseEnter = () => {
        setButtonStyle((prevStyle) => ({
            ...prevStyle,
            backgroundColor: 'hsl(180, 35%, 30%)',
            transform: 'scale(0.85)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }));
    };

    const handleMouseLeave = () => {
        setButtonStyle((prevStyle) => ({
            ...prevStyle,
            backgroundColor: 'hsl(180, 25%, 25%)',
            transform: 'scale(1)',
            boxShadow: 'none',
        }));
    };
    return (
        <div style={styles.page}>
            <Header name="Contact Us" />
            <div style={styles.container}>
                <h2 style={styles.heading}>Get in Touch With Us</h2>
                <p style={styles.description}>
                    We'd love to hear new ideas to improve from you! Fill out the form below or reach us through the provided contact details.
                </p>
                <div style={styles.content}>
                    <div style={styles.contactDetails}>
                        <h3 style={styles.subheading}>Contact Information</h3>
                        <p>Email: contact@mocrypto.com</p>
                        <p>Phone: +90(542) 477 70 03</p>
                        <p>Doğuş Caddesi No: 207/Z DEÜ Tınaztepe Yerleşkesi B, 35000 İzmir</p>
                    </div>
                    <form style={styles.form}>
                        <h3 style={styles.subheading}>Send a Message</h3>
                        <label style={styles.label}>Your Name</label>
                        <input type="text" style={styles.input} placeholder="Enter your name" />

                        <label style={styles.label}>Your Email</label>
                        <input type="email" style={styles.input} placeholder="Enter your email" />

                        <label style={styles.label}>Message</label>
                        <textarea style={styles.textarea} placeholder="Type your message"></textarea>

                        <button style={buttonStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>Submit</button>
                    </form>
                </div>
                <div style={styles.map}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3128.250436651779!2d27.2066086!3d38.3663276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b9618fb082a33f%3A0xb863aae743ff19ec!2sDEPARK%20Alfa-Beta%20Binalar%C4%B1%20(Dokuz%20Eyl%C3%BCl%20%C3%9Cniversitesi%20Teknopark%C4%B1)!5e0!3m2!1str!2str!4v1736643003096!5m2!1str!2str" style={styles.iframe}
                        allowFullScreen=""
                        loading="lazy"
                        title="Location"
                    ></iframe>
                </div>
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
    container: {
        backgroundColor: 'lightgray',
        borderRadius: '25px',
        padding: '20px',
        maxWidth: '800px',
        margin: '50px auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '28px',
        textAlign: 'center',
        marginBottom: '10px',
        color: '#333',
    },
    description: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#555',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '20px',
    },
    contactDetails: {
        flex: 1,
    },
    form: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        color: '#333',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    textarea: {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        height: '100px',
    },
    button: {
        backgroundColor: 'hsl(180, 25%, 25%)',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'center',
    },
    map: {
        marginTop: '20px',
        textAlign: 'center',
    },
    iframe: {
        width: '100%',
        height: '300px',
        border: 'none',
    },
    subheading: {
        fontSize: '20px',
        marginBottom: '10px',
        color: '#333',
    },
};

export default Contact;
