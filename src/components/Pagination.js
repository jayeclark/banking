import React from 'react';
import '../styles/Pagination.css';

export function paginate(data, itemsPerPage, currentPage) {
    return data.slice(currentPage, currentPage + itemsPerPage)
}

export function Pagination({ data,  itemsPerPage, maxPages, verbose, minimal, currentPage, onPageChange }) {

    if (data.length <= itemsPerPage) {return null;}
    const pageNum = Math.ceil(data.length / itemsPerPage);

    if (maxPages % 2 === 0 && maxPages + 1 <= pageNum) {
        maxPages++;
    }
    else if (maxPages > pageNum) {
        maxPages = pageNum;
    }

    console.log('v: ', verbose);
    console.log('pagnum: ' +pageNum);
    const startPage = maxPages < pageNum ? Math.max(currentPage - ((maxPages - 1) / 2), 0) : 0;
    const pageArray = [...Array(maxPages + 1).keys()].slice(1);

    return (
        <div className="page-button-container" style={minimal ? {width: '100%'} : null}>
            {pageNum > 5 ? <button id="first" disabled={currentPage === 0 ? true : false}>{verbose === "yes" ? "First Page" : "<<"}</button> : null}
            {pageNum > 1 ? <button id="previous" className={currentPage === startPage ? "page-button disabled" : "page-button"} type="button" onClick={onPageChange} disabled={currentPage === startPage ? true : false}>{verbose === "yes" ? "Previous Page" : "<"}</button> : null}
            {minimal === false ? pageArray.map((x,i)=><button className={currentPage === i ? "page-button disabled current-page" : "page-button"} key={i} onClick={onPageChange} disabled={currentPage === i ? true : false}>{i+1}</button>) : <div style={{minWidth: "40px", flexGrow: 1}}></div>}
            {pageNum > 1 ? <button id="previous" className={currentPage === startPage + maxPages - 1 ? "page-button disabled" : "page-button"} type="button" onClick={onPageChange} disabled={currentPage === startPage + maxPages - 1 ? true : false}>{verbose === "yes" ? "Next Page" : ">"}</button> : null}
            {pageNum > 3 ? <button id="last" className={currentPage === maxPages - 1 ? "page-button disabled" : "page-button"}>{verbose === "yes" ? "Last Page" : ">>"}</button> : null}
        </div>
    )

}
