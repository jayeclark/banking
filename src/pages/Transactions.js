import React from 'react';
import { useContext, useState } from 'react';
import { getUser } from '../helpers/library';
import Card from '../components/Card';
import { Pagination, paginate } from '../components/Pagination';
import UserDBContext from '../helpers/UserDBContext';
import UserContext from '../helpers/UserContext';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages.js';
import '../styles/Transactions.css';

function Transactions() {

    // Get user database
    const userDBcontext = useContext(UserDBContext);

    // Get logged in user number
    const {loggedInUser} = useContext(UserContext);

    // Get language preference and import content data based on it
    const {language} = useContext(LanguageContext);
    const data = languages[language];

    let transactions = getUser(userDBcontext,loggedInUser) ? getUser(userDBcontext,loggedInUser).transactions : [];
    transactions.sort((a,b) => b.time - a.time);

    // Load page content
    const {header, card: {cardCols}, id, valueIfNoData, valueIfNotLoggedIn} = data.pages.transactions;
    const chartHeader = <div className="data-grid-header-row"><div className="align-left"><b>{cardCols[0]}</b></div><div className="data-grid-description align-left"><b>{cardCols[1]}</b></div><div className="align-right"><b>{cardCols[2]}</b></div><div className="align-right"><b>{cardCols[3]}</b></div><div className="align-right"><b>{cardCols[4]}</b></div></div>;
    const itemsPerPage = 5;
    const [page, setPage] = useState(0);
    const handleSetPage = (e) => {
        const targetText = e.target.textContent;
        const pageNum = Math.ceil(transactions.length / itemsPerPage);
        if (targetText === "First Page" || targetText === "<<") { setPage(0) } 
        else if (targetText === "Previous Page" || targetText === "<") { setPage(page - 1) }
        else if (targetText === "Next Page" || targetText === ">") { setPage(page + 1) }
        else if (targetText === "Last Page" || targetText === ">>") { setPage(pageNum - 1) }
        else {setPage(Number(targetText) - 1)}
    };
    const filteredTransactions = paginate(transactions, itemsPerPage, page);

    const content = <div className="data-grid">
                        {chartHeader}
                        {filteredTransactions.map((txn,i)=><ChartRow key={i} data={txn}></ChartRow>)}
                        <Pagination data={transactions} maxPages={5} verbose="no" itemsPerPage={itemsPerPage} minimal={false} currentPage={page} onPageChange={handleSetPage} />
                    </div>;
    let form = '';


    return (
        <>
        {loggedInUser !== '' && transactions.length > 0 ? <Card id={id} header={header} content={content} form={form}></Card> :
                loggedInUser !== ''  ? <Card id={id} header={header} content={ valueIfNoData || content } form={form}></Card> : 
                <Card id={id} header={header} content={ valueIfNotLoggedIn || content } form={form}></Card>}
        </>
    )

}

function ChartRow({data}) {
    const txnDate = new Date(data.time);
    return (
        <div className="data-grid-row"><div className="align-left">{txnDate.toLocaleDateString()}</div><div className="data-grid-description align-left">{data.description}</div>{data.credit !== null ? <div className="align-right">${data.credit.toFixed(2)}</div> : <div></div>}{data.debit !== null ? <div className="align-right">-${data.debit.toFixed(2)}</div> : <div></div>}<div className="align-right">${data.newBalance.toFixed(2)}</div></div>
    )
}

export default Transactions;