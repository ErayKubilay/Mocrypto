function Card(props){

    return(
        <div className="card">
            <img className="card-img" src={props.img} alt="No Image"></img>
            <h2 className="card-title">Have You Seen This Man?</h2>
            <p className="card-text">Deja Vu Area</p>
        </div>
    );

}
export default Card