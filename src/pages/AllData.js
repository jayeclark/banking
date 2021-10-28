import React from 'react';
import { useContext, useState } from 'react';
import Card from '../components/Card';
import UserDBContext from '../helpers/UserDBContext';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/AllData.css';

function AllData() {

    // Get user database
    const { users } = useContext(UserDBContext);

    // Get language preference and import content data based on it
    const { language } = useContext(LanguageContext);
    const data = languages[language];

    // Load page content
    const { header, card: {cardCols}, id, valueIfNoData } = data.pages.allData;
    const chartHeader = <><div className="align-left"><b>{cardCols[0]}</b></div><div className="align-left"><b>{cardCols[1]}</b></div><div className="align-left"><b>{cardCols[2]}</b></div><div className="align-left"><b>{cardCols[3]}</b></div></>;

    const content = <div className="user-data-grid">{chartHeader}{users.map((user,i)=><UserChartRow key={i} data={user}></UserChartRow>)}</div>;
    let form = '';

    return (
        <>
        {users.length > 0 ? <Card id={ id } header={ header } content={ content } form={ form }></Card> :
                <Card id={ id } header={ header } content={ valueIfNoData || content } form={ form }></Card>}
        </>
    )

}

function UserChartRow({data}) {
    const txnDate = new Date(data.time);
    const [showPwd, setShowPwd] = useState(false);

    const togglePwd = () => {

        if (showPwd === false) {
            setShowPwd(true);
        }
        else if (showPwd === true) {
            setShowPwd(false);
        }

    }

    const maskPwd = (pwd) => pwd.substring(0,1) + '*'.repeat(pwd.length - 1);

    return (
        <>
            <div className="align-left">{ txnDate.toLocaleDateString() }</div>
            <div className="align-left">{ data.name }</div>
            <div className="align-left">{ data.email }</div>
            <div style={{position:"relative"}} className="align-left">
                <span style={{display:"inline-block",padding:"0px 3px 0px 0px"}}>{ showPwd ? data.password : maskPwd(data.password) }</span>
                <span onClick={ togglePwd } style={{ display: "inline-block", padding:"2px 8px", position: "absolute", right: "0px", textAlign:"center", margin:"2px", border:"1px solid #ddd", color:"#666", borderRadius:"7px", fontSize:"0.7em" }}>{ showPwd ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }</span>
            </div>
        </>
    )
}

export default AllData;