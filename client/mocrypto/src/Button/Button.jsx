import styles from './Button.module.css'

function Button(){

    const inLineStyles = {
        borderRadius: "5%",
        color: "blueviolet",
        padding: "10px 15px",
        borderWidth: "2px",
        backgroundColor: "aqua",
        cursor: "pointer",
        margin: "5px",
    }

    return(
        <>
            {/* External Styling Example */}
            <button className="button"  onClick={(e) => {
                e.preventDefault();
                window.location.href='http://linkedin.com';}}>Click Me
            </button>
            {/* Module Styling Example */}
            <button className={styles.button}>Or Me?</button> 
            {/* Inline Styling Example */}
            <button style={inLineStyles}>Or Me!</button> 
        </>

    );
}
export default Button