import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Card(props) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    const handleCardClick = () => {
        navigate(props.path);
    };

    const styles = {
        card: {
            background: isHovered ? 'lightgray' : 'gray',
            border: '1px solid #ddd',
            borderRadius: '16px',
            textAlign: 'center',
            padding: '30px',
            boxShadow: isHovered
                ? '10px 10px 50px rgba(0, 0, 0, 0.2)'
                : '20px 15px 10px rgba(0, 0, 0, 0.1)',
            height: '350px',
            width: '350px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
        },
        cardImage: {
            width: '100%',
            height: 'auto',
            maxHeight: '170px',
            marginBottom: '15px',
        },
        cardTitle: {
            color: '#333',
            fontSize: '22px',
            marginBottom: '10px',
        },
        cardSubtitle: {
            color: '#333',
            fontSize: '16px',
        },
    };

    return (
        <div
            style={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            <img style={styles.cardImage} className="card-img" src={props.img} alt="No Image" />
            <h2 style={styles.cardTitle} className="card-title">{props.title}</h2>
            <p style={styles.cardSubtitle} className="card-text">{props.paragraph}</p>
        </div>
    );
}

export default Card;
