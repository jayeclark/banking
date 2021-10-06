import '../styles/Notification.css';
import Card from './Card.js';
import closeButton from '../assets/closeButton.svg';

function Notification({title, text, type, handleClick}) {

    let parsedContent = title ? <><div className="close-button"><div className="close-x" onClick={(e) => handleClick()}><img src={closeButton} alt="" height="20px" style={{margin:"-10px 0px"}}/></div></div><div style={{padding:"30px"}}><h4>{title}</h4>{text}</div></>
                                : <><div className="close-button"><div className="close-x" onClick={(e) => handleClick()}><img src={closeButton} alt="" height="20px" style={{margin:"-10px 0px"}}/></div></div><div style={{padding:"30px"}}>{text}</div></>;

    return (
        <div className="notification-container" >
            <Card className={type === 'success' ? "notification-card green" : type === 'error' ? "notification-card red" : "notification-card"} content={parsedContent} style={{padding: '50px', fontWeight:'500'}}></Card>
        </div>
    )
}

export default Notification;