import '../styles/notification.css';
import Card from './Card.js';

function Notification({title, text, type, handleClick}) {

    let parsedContent = title ? <><div className="close-button"><div className="close-x" onClick={(e) => handleClick()}>X</div></div><div style={{padding:"30px"}}><h4>{title}</h4>{text}</div></>
                                : text;

    return (
        <div className={type === 'success' ? "notification-container green" : type === 'error' ? "notification-container red" : "notification-container"}>
            <Card className="notification-card" content={parsedContent} style={{padding: '50px', fontWeight:'500'}}></Card>
        </div>
    )
}

export default Notification;