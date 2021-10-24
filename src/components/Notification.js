import '../styles/Notification.css';
import { useState } from 'react';
import Card from './Card.js';
import closeButton from '../assets/closeButton.svg';
import { useEffect } from 'react/cjs/react.development';

function Notification({title, text, type, handleClick, time}) {

    let parsedContent = title ? <><div className="close-button"><div className="close-x" onClick={(e) => handleClick()}><img src={closeButton} alt="" height="20px" style={{margin:"-10px 0px"}}/></div></div><div style={{padding:"30px"}}><h4>{title}</h4>{text}</div></>
                                : <><div className="close-button"><div className="close-x" onClick={(e) => handleClick()}><img src={closeButton} alt="" height="20px" style={{margin:"-10px 0px"}}/></div></div><div style={{padding:"30px"}}>{text}</div></>;

    const seconds = time / 1000;

    const [style, setStyle] = useState({width: '100%', transitionDuration: '10ms'})

    useEffect(()=> {
        setStyle({width: '100%', transitionDuration: '10ms'});
        setStyle({width: '100%', transitionDuration: seconds + 's'});
        setTimeout(()=> setStyle({width: '0%', transitionDuration: seconds + 's'}), 10);
    }, [seconds]);

    return (
        <div className="notification-container" >
            <div className={type === 'success' ? "notification-card green" : type === 'error' ? "notification-card red" : "notification-card"}>
                <Card content={parsedContent} style={{padding: '50px', fontWeight:'500'}}></Card> 
                <div className={type === 'success' ? "notification-countdown-green" : type === 'error' ? "notification-countdown-red" : "notification-countdown"}>
                    <div className={type === 'success' ? "countdown-progress-green" : type === 'error' ? "countdown-progress-red" : "countdown-progress"} style={style}></div>
                </div>
            </div> 
        </div>
    )
}

export default Notification;